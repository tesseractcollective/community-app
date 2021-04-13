import React from 'react';
import {getFieldFragmentInfo} from '../support/HasuraConfigUtils';
import {print} from 'graphql';
import gql from 'graphql-tag';
import {
  QueryMiddleware,
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from '../types/hookMiddleware';
import {HasuraDataConfig} from '../types/hasuraConfig';

interface IUseQueryOne {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  initialVariables?: IJsonObject;
}

export function createQueryOne<
  TData extends IJsonObject,
  TVariables extends IJsonObject
>(
  state: QueryPreMiddlewareState,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  const name = config.typename;
  const operationName =
    config.overrides?.operationNames?.query_by_pk ?? `${name}_by_pk`;

  const {fragment, fragmentName} = getFieldFragmentInfo(
    config,
    config.overrides?.fieldFragments?.query_by_pk,
  );

  const variables = state.variables;

  const operationStr = config.primaryKey
    .map((key) => {
      return variables[key] ? `${key}: "${variables[key]}"` : null;
    })
    .filter((x) => !!x)
    .join(', ');
  const queryString = `query ${name}Query {
    ${operationName}(${operationStr}) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;
  console.log('queryString <- createQueryOne', queryString);

  const document = gql(queryString);
  return {document, operationName, variables: {} ?? {}};
}
