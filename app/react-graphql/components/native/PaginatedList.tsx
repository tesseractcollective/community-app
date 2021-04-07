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
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
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
  pullToRefresh?: boolean;
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
    ...rest
  } = props;

  const [variables, setVariables] = useState<IJsonObject>({});
  useEffect(() => {
    setVariables({
      where,
      orderBy,
      pageSize,
    });
  }, [where, orderBy, pageSize]);

  const {
    loadNextPage,
    items,
    queryState: {fetching, error},
    refresh,
  } = useReactHasura(config).useInfiniteQueryMany({variables});

  const isFocused = useIsFocused();
  const [isManualRefresh, setIsManualRefresh] = useState(false);
  const [hasLostFocus, setHasLostFocus] = useState(false);

  useEffect(() => {
    if (reloadOnFocus) {
      setHasLostFocus(!isFocused);
      if (isFocused && hasLostFocus) {
        setIsManualRefresh(false);
        console.log('refresh');
        refresh();
      }
    }

  }, [isFocused, hasLostFocus, reloadOnFocus]);

  const handleRefresh = () => {
    setIsManualRefresh(true);
    refresh();
  };

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
          renderItem={renderItem}
          keyExtractor={(item) => keyExtractor(config, item)}
          onEndReachedThreshold={1}
          onEndReached={loadNextPage}
        />
      )}
    </>
  );
}
