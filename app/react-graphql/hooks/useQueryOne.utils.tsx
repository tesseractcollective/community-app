import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getFieldFragmentInfo } from '../support/HasuraConfigUtils';
import { UseQueryResponse, useQuery, UseQueryArgs } from 'urql';
import { usePagination } from './useInfiniteQueryMany.utils';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { QueryMiddleware, QueryPostMiddlewareState, QueryPreMiddlewareState } from 'types/hookMiddleware';
import { HasuraDataConfig } from 'types/hasuraConfig';

interface IUseQueryOne {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  initialVariables?: IJsonObject;
}

export function createQueryOne<TData extends IJsonObject, TVariables extends IJsonObject>(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const operationName = config.overrides?.operationNames?.query_many ?? `delete_${name}_by_pk`;

  const { fragment, fragmentName } = getFieldFragmentInfo(config, config.overrides?.fieldFragments?.delete_by_pk);

  const variables = state.variables;

  const variablesStr = [
    variables['where'] ? `$where: ${name}_bool_exp` : null,
    variables['orderBy'] ? `$orderBy: ${name}_order_by!` : null,
  ]
    .filter((x) => !!x)
    .join(', ');

  const operationStr = [
    variables['where'] ? `where: $where` : null,
    variables['orderBy'] ? `order_by: $orderBy` : null,
    variables['limit'] ? `limit: ${variables.limit}` : null,
    variables['offset'] ? `offset: ${variables.offset}` : null,
  ]
    .filter((x) => !!x)
    .join(', ');

  const query = gql`query ${name}Query(${variablesStr}) {
      ${name}(${operationStr}) {
        ...${fragmentName}
      }
    }
    ${print(fragment)}`;

  const pkColumns: { [key: string]: any } = {};
  for (const key of config.primaryKey) {
    pkColumns[key] = state.variables?.[key];
  }

  return { query, operationName, variables: state.variables ?? {}, pkColumns };
}

// document: DocumentNode,
// where?: {[key: string]: any},
// orderBy?: {[key: string]: any},
// primaryKey: string = defaultPrimaryKey,
// pageSize: number = defaultPageSize,
