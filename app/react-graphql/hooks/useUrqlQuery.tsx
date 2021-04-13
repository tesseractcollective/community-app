import { QueryPostMiddlewareState } from 'react-graphql/types/hookMiddleware';
import { useQuery, UseQueryResponse } from 'urql';

export function useUrqlQuery<TData extends IJsonMapOfArraysObject>(
  queryCfg: QueryPostMiddlewareState,
  objectVariables?: { [key: string]: any },
): UseQueryResponse {
  const response: UseQueryResponse = useQuery<TData>({
    query: queryCfg?.document,
    variables: objectVariables || queryCfg.variables,
  });

  return response;
}
