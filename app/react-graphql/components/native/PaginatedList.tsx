import React, {useEffect, useState, ReactElement} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  RefreshControl,
  ListRenderItem,
  Text,
  ScrollViewProps,
} from 'react-native';
import {HasuraDataConfig, keyExtractor} from 'graphql-api/HasuraConfigType';
import {useIsFocused} from '@react-navigation/core';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import {QueryMiddleware} from 'react-graphql/types/hookMiddleware';

const defaultPageSize = 50;

export interface PaginationListProps<T> {
  config: HasuraDataConfig;
  renderItem: ListRenderItem<T> & {refresh: () => void};
  where?: {[key: string]: any};
  orderBy?: {[key: string]: any} | Array<{[key: string]: any}>;
  pageSize?: number;
  primaryKey?: string;
  reloadOnFocus?: boolean;
  pullToRefresh?: boolean;
  middleware?: QueryMiddleware[];
  renderEmpty?: () => ReactElement;
  listKey?: string;
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
    pullToRefresh = true,
    middleware,
    listKey,
    ...rest
  } = props;

  const {loadNextPage, items, queryState, refresh} = useReactGraphql(
    config,
  ).useInfiniteQueryMany({
    where,
    orderBy,
    pageSize,
    middleware: middleware || undefined,
    listKey,
  });
  const {fetching, error} = queryState;

  const isFocused = useIsFocused();
  const [isManualRefresh, setIsManualRefresh] = useState(false);
  const [hasLostFocus, setHasLostFocus] = useState(false);

  useEffect(() => {
    if (reloadOnFocus) {
      if (isFocused && hasLostFocus) {
        setIsManualRefresh(false);
        console.log('🥝 refresh');
        refresh();
      }
      setHasLostFocus(!isFocused);
    }
  }, [isFocused, hasLostFocus, reloadOnFocus]);

  const handleRefresh = () => {
    setIsManualRefresh(true);
    refresh();
  };

  if (items && items.length === 0 && props.renderEmpty) {
    return props.renderEmpty();
  }

  return (
    <>
      {error ? (
        <Text>{error.message}</Text>
      ) : (
        <FlatList
          {...rest}
          refreshControl={
            pullToRefresh ? (
              <RefreshControl
                refreshing={fetching && !isManualRefresh}
                onRefresh={handleRefresh}
              />
            ) : undefined
          }
          data={items}
          renderItem={(params) => renderItem({...params, refresh})}
          keyExtractor={(item) => keyExtractor(config, item)}
          onEndReachedThreshold={1}
          onEndReached={loadNextPage}
        />
      )}
    </>
  );
}
