import { getFieldFragmentInfo } from '../support/HasuraConfigUtils';
import { print } from 'graphql';
import gql from 'graphql-tag';
import React, { useCallback, useState } from 'react';
import { map } from 'lodash';
import { QueryPostMiddlewareState, QueryPreMiddlewareState } from 'types/hookMiddleware';
import { HasuraDataConfig } from 'types/hasuraConfig';

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
    (state: QueryPreMiddlewareState, config: HasuraDataConfig): QueryPostMiddlewareState => {
      let newState = { ...state } as QueryPostMiddlewareState;
      if (offset) {
        newState.variables.offset = offset;
      }
      if (limit) {
        newState.variables.limit = limit;
      }
      newState.operationName = '';

      return newState;
    },
    [offset, limit],
  );

  return { refresh, loadNextPage, middleware };
}

const querySupportedVariables = { where: true, orderBy: true, limit: true, offset: true };

export function createInfiniteQueryMany(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const operationName = config.overrides?.operationNames?.query_many ?? `delete_${name}_by_pk`;

  const { fragment, fragmentName } = getFieldFragmentInfo(config, config.overrides?.fieldFragments?.delete_by_pk);

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

  // console.log('queryStr', queryStr);

  const query = gql(queryStr);

  const pkColumns: { [key: string]: any } = {};
  for (const key of config.primaryKey) {
    pkColumns[key] = state.variables?.[key];
  }

  return { query, operationName, variables: state.variables ?? {}, pkColumns };
}
