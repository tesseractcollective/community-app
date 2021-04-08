import {HasuraDataConfig} from 'graphql-api/HasuraConfigType';
import {
  MutationMiddleware,
  MutationPostMiddlewareState,
  MutationPreMiddlewareState,
  QueryMiddleware,
  QueryPostMiddlewareState,
  QueryPreMiddlewareState,
} from 'react-graphql/types/hookMiddleware';

function stateFromMiddleWare(
  preState: any,
  middleware: any[] ,
  config: HasuraDataConfig,
  index = 0,
): any {
  console.log('stateFromMiddleware');
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
  return stateFromMiddleWare(
    {variables: combinedState.variables},
    middleware,
    config,
    index + 1,
  );
}

export function stateFromQueryMiddleware(
  preState: QueryPreMiddlewareState,
  middleware: QueryMiddleware[] ,
  config: HasuraDataConfig,
): QueryPostMiddlewareState {
  return stateFromMiddleWare(preState, middleware, config);
}

export function stateFromMutationMiddleware(
  preState: MutationPreMiddlewareState,
  middleware: MutationMiddleware[],
  config: HasuraDataConfig,
): MutationPostMiddlewareState {
  return stateFromMiddleWare(preState, middleware, config);
}
