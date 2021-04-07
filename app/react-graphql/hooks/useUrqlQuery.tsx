import {print} from 'graphql';
import { useQuery, UseQueryResponse } from 'urql';

export function useUrqlQuery<TData extends IJsonMapOfArraysObject>(
  queryCfg: any,
  objectVariables: { [key: string]: any },
): UseQueryResponse {
  const response: UseQueryResponse = useQuery<TData>({
    query: queryCfg?.query,
    variables: objectVariables,
  });

  return response;
}
