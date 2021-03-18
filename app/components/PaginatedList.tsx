import React, {useEffect, useState} from 'react';
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
} from '../graphql/HasuraConfigType';
import {print} from 'graphql';

const defaultPageSize = 50;

export interface PaginationListProps<T> {
  config: HasuraDataConfig;
  renderItem: ListRenderItem<T>;
  where?: {[key: string]: any};
  orderBy?: {[key: string]: any} | Array<{[key: string]: any}>;
  primaryKey?: string;
  pageSize?: number;
}

export default function <T extends {[key: string]: any}>(
  props: PaginationListProps<T> & ScrollViewProps,
) {
  const {config, renderItem, where, orderBy, pageSize, ...rest} = props;

  const {items, error, fetching, refresh, loadNextPage} = usePagination<T>(
    config,
    where,
    orderBy,
    pageSize,
  );

  return (
    <>
      {error ? (
        <Text>{error.message}</Text>
      ) : (
        <FlatList
          {...rest}
          refreshControl={
            <RefreshControl refreshing={fetching} onRefresh={refresh} />
          }
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => keyExtractor(config, item)}
          onEndReachedThreshold={1}
          onEndReached={loadNextPage}
        />
      )}
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
  const query = `query ${name}Query($where: ${name}_bool_exp, $orderBy: [${name}_order_by!]) {
    ${name}(${limitOffsetArgs}where:$where, order_by:$orderBy) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const [queryResult, reexecuteQuery] = useQuery<T>({
    query,
    variables: {where, orderBy},
  });

  const pageItems = queryResult.data
    ? ((queryResult.data as any)[name] as Array<T>)
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
