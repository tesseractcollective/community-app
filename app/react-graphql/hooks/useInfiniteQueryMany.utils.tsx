import React, {useCallback, useState} from 'react';
import {print} from 'graphql';
import gql from 'graphql-tag';

import {
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from '../types/hookMiddleware';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {getFieldFragmentInfo} from '../support/HasuraConfigUtils';

const defaultPageSize = 50;

export function usePagination(pageSize: number) {
  if (!pageSize) pageSize = defaultPageSize;
  const limit = pageSize;
  const [offset, setOffset] = useState(0);

  const loadNextPage = () => {
    setOffset(offset + limit);
  };

  const refresh = () => {
    setOffset(0);
  };

  const middleware = useCallback(
    (
      state: QueryPreMiddlewareState,
      config: HasuraDataConfig,
    ): QueryPostMiddlewareState => {
      return {
        ...state,
        variables: {
          ...state.variables,
          offset,
          limit,
        },
        operationName: '',
      } as QueryPostMiddlewareState;
    },
    [offset, limit],
  );

  return {refresh, loadNextPage, middleware};
}

export function createInfiniteQueryMany(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const operationName = config.overrides?.operationNames?.query_many ?? name;

  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.query_many,
  );

  const variables = state.variables;

  const variablesStrInner = [
    variables['where'] ? `$where: ${name}_bool_exp` : null,
    variables['orderBy'] ? `$orderBy: [${name}_order_by!]` : null,
    variables['limit'] ? `$limit: Int` : null,
    variables['offset'] ? `$offset: Int` : null,
  ]
    .filter((x) => !!x)
    .join(', ');
  const variablesStr = variablesStrInner ? `(${variablesStrInner})` : '';
  console.log('variablesStr', variablesStr);

  const operationStr = [
    variables['where'] ? `where: $where` : null,
    variables['orderBy'] ? `order_by: $orderBy` : null,
    variables['limit'] ? `limit: $limit` : null,
    variables['offset'] ? `offset: $offset` : null,
  ]
    .filter((x) => !!x)
    .join(', ');

  const queryStr = `query ${name}Query${variablesStr} {
    ${name}(${operationStr}) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const query = gql(queryStr);
  return {query, operationName, variables: state.variables ?? {}};
}
