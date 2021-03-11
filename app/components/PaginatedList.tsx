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
import {hasVariableDefinition, isQuery} from '../graphql/graphqlHelpers';

const defaultPrimaryKey = 'id';
const defaultPageSize = 50;

export interface PaginationListProps<T> {
  document: DocumentNode;
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
  where?: {[key: string]: any},
  orderBy?: {[key: string]: any},
  primaryKey: string = defaultPrimaryKey,
  pageSize: number = defaultPageSize,
) {

  const limit = pageSize;
  const [resultField, setResultField] = useState("");
  const [offset, setOffset] = useState(0);
  const [itemsMap, setItemsMap] = useState<Map<string, T>>(new Map());
  const [items, setItems] = useState<Array<T>>([]);
  const [cachedWhere, setCachedWhere] = useState(where);

  useEffect(() => {
    // introspect GraphQL document for validation and resultField
    let isValidDocument = false;
    const queryOperation = document.definitions[0];
    if (
      isQuery(queryOperation) &&
      hasVariableDefinition(queryOperation.variableDefinitions, 'limit') &&
      hasVariableDefinition(queryOperation.variableDefinitions, 'offset') &&
      hasVariableDefinition(queryOperation.variableDefinitions, 'where') &&
      hasVariableDefinition(queryOperation.variableDefinitions, 'orderBy') &&
      queryOperation.selectionSet.selections.length > 0
    ) {
      const queryField = queryOperation.selectionSet.selections[0];
      if (queryField.kind === 'Field') {
        setResultField(queryField.name.value);
        isValidDocument = true;
      }
    }
    if (!isValidDocument) {
      throw new Error(
        'graphql document must be a query with the variables `limit`, `offset`, `where` and `orderBy`',
      );
    }
  }, [document]);

  const [queryResult, reexecuteQuery] = useQuery<T>({
    query: document,
    variables: {limit, offset, where, orderBy},
  });

  const pageItems = (queryResult.data && resultField)
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
