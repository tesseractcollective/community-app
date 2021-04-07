import {HasuraDataConfig} from 'graphql-api/HasuraConfigType';
import {
  QueryMiddleware,
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from 'react-graphql/types/hookMiddleware';

export function stateFromMiddleware(
  preState: QueryPreMiddlewareState,
  middleware: QueryMiddleware[],
  config: HasuraDataConfig,
  index = 0,
): QueryPostMiddlewareState {
  if (middleware.length === 0) {
    throw new Error('no middleware');
  }
  const postState = middleware[index](preState, config);
  const combinedState = {
    ...postState,
    variables: {
      ...preState.variables,
      ...postState.variables,
    },
  };
  if (index === middleware.length - 1) {
    return combinedState;
  }
  return stateFromMiddleware(
    {variables: combinedState.variables},
    middleware,
    config,
    index + 1,
  );
}
