import {useEffect, useState} from 'react';
import {DocumentNode} from 'graphql';
import {useQuery} from 'urql';

export default function deepEqual(a: any, b: any): boolean {
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

function isObject(object: any) {
  return object != null && typeof object === 'object';
}

export function usePagination<T extends {[key: string]: any}>(
  document: DocumentNode,
  resultField: string,
  sortKey: string,
  where?: { [key: string]: any },
  orderBy?: { [key: string]: any },
  primaryKey: string = 'id',
  pageSize: number = 50,
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

  // TODO: have this work off of orderBy instead
  const sortItems = (a: T, b: T) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === 'string') {
      return aValue.localeCompare(bValue);
    }
    if (typeof aValue === 'number') {
      return aValue - bValue;
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
