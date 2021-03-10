import {useEffect, useState} from 'react';
import {DocumentNode} from 'graphql';
import {useQuery} from 'urql';

export function usePagination<T extends {[key: string]: any}>(
  document: DocumentNode,
  resultField: string,
  sortKey: string,
  where?: { [key: string]: any },
  orderBy?: { [key: string]: any },
  primaryKey: string = 'id',
  pageSize: number = 20,
) {
  const limit = pageSize;
  const [offset, setOffset] = useState(0);
  const [itemsMap, setItemsMap] = useState<{[key: string]: T}>({});
  const [items, setItems] = useState<Array<T>>([]);

  const [queryResult, reexecuteQuery] = useQuery<T>({
    query: document,
    variables: {limit, offset, where, order_by: orderBy},
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
    if (pageItems && !fetching) {
      console.log('useEffect offset:', offset);
      console.log(pageItems.map((item: any) => item.name));
      const pageItemsMap = pageItems.reduce<{[key: string]: T}>(
        (previous, item) => {
          previous[primaryKey] = item;
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
