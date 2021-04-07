import React, {useEffect, useState, useCallback} from 'react';
import {useQuery} from 'urql';
import {FlatList} from 'react-native-gesture-handler';
import isEqual from 'lodash.isequal';
import {
  RefreshControl,
  ListRenderItem,
  Text,
  ScrollViewProps,
} from 'react-native';
import {
  getFieldFragmentInfo,
  HasuraDataConfig,
  keyExtractor,
} from 'graphql-api/HasuraConfigType';
import {print} from 'graphql';
import {useFocusedEffected, useFocusEffect} from '@react-navigation/core';
import useReactHasura from 'react-graphql/hooks/useReactHasura';

const defaultPageSize = 50;

export interface PaginationListProps<T> {
  config: HasuraDataConfig;
  renderItem: ListRenderItem<T>;
  where?: {[key: string]: any};
  orderBy?: {[key: string]: any} | Array<{[key: string]: any}>;
  primaryKey?: string;
  pageSize?: number;
  reloadOnFocus?: boolean;
}

export default function <T extends {[key: string]: any}>(
  props: PaginationListProps<T> & ScrollViewProps,
) {
  const {
    config,
    renderItem,
    where,
    orderBy,
    pageSize,
    reloadOnFocus,
    ...rest
  } = props;

  const {
    loadNextPage,
    results: items,
    resp: {fetching},
    // error: TODO
    refresh: resetPagination, //TODO make this be one call, not two
    reload,
    setObjectVariables,
  } = useReactHasura(config).useInfiniteQueryMany({
    initialVariables: {
      where,
      orderBy,
      pageSize,
    },
  });

  const [isManualRefresh, setIsManualRefresh] = useState(false);

  // const {items, error, fetching, refresh, loadNextPage} = usePagination<T>(
  //   config,
  //   where,
  //   orderBy,
  //   pageSize,
  // );

  useEffect(() => {
    setObjectVariables({
      where,
    });
  }, [where]);

  useEffect(() => {
    //Deep comparison
    setObjectVariables({
      orderBy,
    });
  }, [orderBy]);

  useFocusEffect(
    useCallback(() => {
      if (reloadOnFocus) {
        if (!fetching) {
          setIsManualRefresh(false);
          resetPagination();
          reload();
        }
      }
    }, [reloadOnFocus, fetching]),
  );

  const handleRefresh = () => {
    setIsManualRefresh(true);
    resetPagination();
    reload();
  };
  console.log('items.length', items.length);

  return (
    <>
      {/* {error ? (
        <Text>{error.message}</Text>
      ) : ( */}
      <FlatList
        {...rest}
        refreshControl={
          <RefreshControl
            refreshing={fetching && !isManualRefresh}
            onRefresh={handleRefresh}
          />
        }
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => keyExtractor(config, item)}
        onEndReachedThreshold={1}
        onEndReached={loadNextPage}
      />
      {/* )} */}
    </>
  );
}

export function usePagination<T extends {[key: string]: any}>(
  config: HasuraDataConfig,
  where?: {[key: string]: any},
  orderBy?: {[key: string]: any},
  pageSize: number = defaultPageSize,
) {
  const limit = pageSize;
  const [offset, setOffset] = useState(0);
  const [itemsMap, setItemsMap] = useState<Map<string, T>>(new Map());
  const [items, setItems] = useState<Array<T>>([]);
  const [cachedWhere, setCachedWhere] = useState(where);

  const name = config.typename;
  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.query_many,
  );

  const limitOffsetArgs =
    pageSize > 0 ? `limit:${limit}, offset:${offset}, ` : '';
  const operationName =
    config.overrides?.operationNames?.insert_core_one || name;
  const query = `query ${name}Query($where: ${name}_bool_exp, $orderBy: [${name}_order_by!]) {
    ${operationName}(${limitOffsetArgs}where:$where, order_by:$orderBy) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const [queryResult, reexecuteQuery] = useQuery<T>({
    query,
    variables: {where, orderBy},
  });

  const pageItems = queryResult.data
    ? ((queryResult.data as any)[operationName] as Array<T>)
    : undefined;
  const error = queryResult.error;
  const fetching = queryResult.fetching;

  const loadNextPage = () => {
    setOffset(offset + limit);
  };

  const refresh = () => {
    setOffset(0);
    reexecuteQuery({requestPolicy: 'network-only'});
  };

  useEffect(() => {
    if (!isEqual(where, cachedWhere)) {
      setOffset(0);
      setCachedWhere(where);
    }
  }, [where, cachedWhere]);

  useEffect(() => {
    if (pageItems && !fetching) {
      const newItemsMap = new Map<string, T>();

      if (offset !== 0) {
        for (const [key, item] of itemsMap.entries()) {
          newItemsMap.set(key, item);
        }
      }

      for (const item of pageItems) {
        newItemsMap.set(keyExtractor(config, item), item);
      }
      setItems([...newItemsMap.values()]);
      setItemsMap(newItemsMap);
    }
  }, [pageItems, fetching, offset]);

  return {items, error, fetching, refresh, loadNextPage};
}
