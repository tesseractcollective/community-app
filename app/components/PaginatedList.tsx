import React, {useEffect, useState} from 'react';
import {DocumentNode} from 'graphql';
import {useQuery} from 'urql';
import {FlatList} from 'react-native-gesture-handler';
import isEqual from 'lodash.isequal';
import {
  RefreshControl,
  ListRenderItem,
  Text,
  ScrollViewProps,
} from 'react-native';

const defaultPrimaryKey = 'id';
const defaultPageSize = 50;

export interface PaginationListProps<T> {
  document: DocumentNode;
  resultField: string;
  renderItem: ListRenderItem<T>;
  where?: {[key: string]: any};
  orderBy?: {[key: string]: any} | Array<{[key: string]: any}>;
  primaryKey?: string;
  pageSize?: number;
}

export default function <T extends {[key: string]: any}>(
  props: PaginationListProps<T> & ScrollViewProps,
) {
  const {
    document,
    resultField,
    renderItem,
    where,
    orderBy,
    primaryKey,
    pageSize,
    ...rest
  } = props;
  const keyExtractorKey = primaryKey || defaultPrimaryKey;

  const {items, error, fetching, refresh, loadNextPage} = usePagination<T>(
    document,
    resultField,
    where,
    orderBy,
    primaryKey,
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
          keyExtractor={(item) => item[keyExtractorKey]}
          onEndReachedThreshold={1}
          onEndReached={loadNextPage}
        />
      )}
    </>
  );
}

export function usePagination<T extends {[key: string]: any}>(
  document: DocumentNode,
  resultField: string,
  where?: {[key: string]: any},
  orderBy?: {[key: string]: any},
  primaryKey: string = defaultPrimaryKey,
  pageSize: number = defaultPageSize,
) {
  const limit = pageSize;
  const [offset, setOffset] = useState(0);
  const [itemsMap, setItemsMap] = useState<Map<string, T>>(new Map());
  const [items, setItems] = useState<Array<T>>([]);
  const [cachedWhere, setCachedWhere] = useState(where);

  const [queryResult, reexecuteQuery] = useQuery<T>({
    query: document,
    variables: {limit, offset, where, orderBy},
  });

  const pageItems = queryResult.data
    ? ((queryResult.data as any)[resultField] as Array<T>)
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
        newItemsMap.set(item[primaryKey], item);
      }
      setItems([...newItemsMap.values()]);
      setItemsMap(newItemsMap);
    }
  }, [pageItems, fetching, offset]);

  return {items, error, fetching, refresh, loadNextPage};
}
