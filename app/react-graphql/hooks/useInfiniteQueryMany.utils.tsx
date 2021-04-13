import {print} from 'graphql';
import gql from 'graphql-tag';

import {
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from '../types/hookMiddleware';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {getFieldFragmentInfo} from '../support/HasuraConfigUtils';
import {isDefined} from 'react-graphql/support/javaScriptHelpers';

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
    isDefined(variables['limit']) ? `$limit: Int` : null,
    isDefined(variables['offset']) ? `$offset: Int` : null,
    isDefined(variables['userId']) ? `$userId: uuid` : null,
  ]
    .filter((x) => !!x)
    .join(', ');
  const variablesStr = variablesStrInner ? `(${variablesStrInner})` : '';

  const operationStr = [
    variables['where'] ? `where: $where` : null,
    variables['orderBy'] ? `order_by: $orderBy` : null,
    isDefined(variables['limit']) ? `limit: $limit` : null,
    isDefined(variables['offset']) ? `offset: $offset` : null,
  ]
    .filter((x) => !!x)
    .join(', ');

  const queryStr = `query ${name}Query${variablesStr} {
    ${name}(${operationStr}) {
      ...${fragmentName}
    }
  }
  ${print(fragment)}`;

  const document = gql(queryStr);

  return {document, operationName, variables: state.variables ?? {}};
}
