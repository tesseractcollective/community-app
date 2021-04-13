import {QueryMiddleware} from 'react-graphql/types/hookMiddleware';
export function addUserIdToVariables(userId: string): QueryMiddleware {
  return (state: any) => {
    return {...state, variables: {...state.variables, userId}};
  };
}
