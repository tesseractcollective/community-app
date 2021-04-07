import { useQuery, UseQueryResponse } from 'urql';

export function useUrqlQuery<TData extends IJsonMapOfArraysObject>(
  queryCfg: any,
  objectVariables: { [key: string]: any },
): [any, any] {
  let resp: UseQueryResponse = useQuery<TData>({
    query: queryCfg?.query,
    variables: objectVariables,
  });

  return resp;
}
