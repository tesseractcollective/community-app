import React, {useEffect, useState} from 'react';
import {DocumentNode} from 'graphql';
import {useQuery} from 'urql';
import {FlatList} from 'react-native-gesture-handler';
import {RefreshControl, ListRenderItem, Text, ScrollViewProps} from 'react-native';
import {Order_By} from '../graphql';

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
  const [itemsMap, setItemsMap] = useState<{[key: string]: T}>({});
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

  const sortItems = (a: T, b: T) => {
    if (!orderBy) {
      return 0;
    }

    if (Array.isArray(orderBy)) {
      for (let orderItem of orderBy) {
        for (let orderItemKey in orderItem) {
          const sortResult = sortByKeyAndOrderBy(
            a,
            b,
            orderItemKey,
            orderItem[orderItemKey],
          );
          if (sortResult !== 0) {
            return sortResult;
          }
        }
      }
    } else {
      for (let orderItemKey in orderBy) {
        const sortResult = sortByKeyAndOrderBy(
          a,
          b,
          orderItemKey,
          orderBy[orderItemKey],
        );
        if (sortResult !== 0) {
          return sortResult;
        }
      }
    }
    return 0;
  };

  useEffect(() => {
    if (!deepEqual(where, cachedWhere)) {
      setOffset(0);
      setCachedWhere(where);
    }
  }, [where, cachedWhere]);

  useEffect(() => {
    if (pageItems && !fetching) {
      const pageItemsMap = pageItems.reduce<{[key: string]: T}>(
        (previous, item) => {
          previous[item[primaryKey]] = item;
          return previous;
        },
        {},
      );

      let newItemsMap;
      if (offset === 0) {
        newItemsMap = pageItemsMap;
      } else {
        newItemsMap = {
          ...itemsMap,
          ...pageItemsMap,
        };
      }

      const sorted = [...Object.values(newItemsMap)].sort(sortItems);
      setItems(sorted);
      setItemsMap(newItemsMap);
    }
  }, [pageItems, fetching, offset]);

  return {items, error, fetching, refresh, loadNextPage};
}

export function sortByKeyAndOrderBy<T extends {[key: string]: any}>(
  a: T,
  b: T,
  key: string,
  order: Order_By,
) {
  const aValue = a[key];
  const bValue = b[key];
  if (aValue === bValue) {
    return 0;
  }
  if (typeof aValue === 'string') {
    switch (order) {
      case Order_By.Asc:
      case Order_By.AscNullsFirst:
      case Order_By.AscNullsLast:
        return aValue.localeCompare(bValue);
      case Order_By.Desc:
      case Order_By.DescNullsFirst:
      case Order_By.DescNullsLast:
        return bValue.localeCompare(aValue);
    }
  }
  if (typeof aValue === 'number') {
    switch (order) {
      case Order_By.Asc:
      case Order_By.AscNullsFirst:
      case Order_By.AscNullsLast:
        return aValue - bValue;
      case Order_By.Desc:
      case Order_By.DescNullsFirst:
      case Order_By.DescNullsLast:
        return bValue - aValue;
    }
  }
  if (typeof aValue === 'boolean') {
    switch (order) {
      case Order_By.Asc:
      case Order_By.AscNullsFirst:
      case Order_By.AscNullsLast:
        return aValue ? -1 : 1;
      case Order_By.Desc:
      case Order_By.DescNullsFirst:
      case Order_By.DescNullsLast:
        return bValue ? -1 : 1;
    }
  }
  if (typeof aValue === 'object') {
  }
  return 0;
}

export function deepEqual(a: any, b: any): boolean {
  function isObject(object: any) {
    return object != null && typeof object === 'object';
  }

  if (a === b) {
    return true;
  }

  if (!isObject(a) || !isObject(b)) {
    return false;
  }

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]).values();
  for (const key of keys) {
    const val1 = a[key];
    const val2 = b[key];
    if (!deepEqual(val1, val2)) {
      return false;
    }
  }

  return true;
}
