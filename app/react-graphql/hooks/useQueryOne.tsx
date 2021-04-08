import { useState, useEffect, useMemo } from 'react';
import { HasuraDataConfig } from '../types/hasuraConfig';
import { QueryMiddleware, QueryPostMiddlewareState, QueryPreMiddlewareState } from '../types/hookMiddleware';
import { useQuery } from 'urql';
import { stateFromQueryMiddleware } from 'react-graphql/support/middlewareHelpers';
import { print } from 'graphql';

interface IUseQueryOne {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  initialVariables?: IJsonObject;
}

export default function useQueryOne<TData extends IJsonObject, TVariables extends IJsonObject>(props: IUseQueryOne) {
  const { sharedConfig, middleware, initialVariables } = props;

  const [meta, setMeta] = useState<{
    firstQueryCompleted: boolean;
    localError: string;
    detectedPks: Map<any, any>;
  }>({ firstQueryCompleted: false, localError: '', detectedPks: new Map() });
  const [item, setItem] = useState<TData>();
  const [objectVariables, setObjectVariables] = useState<{ [key: string]: any }>(initialVariables ?? {});

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }

  //Setup the initial query Config so it's for sure ready before we get to urql
  const queryCfg: QueryPostMiddlewareState = useMemo(() => {
    return stateFromQueryMiddleware({ variables: objectVariables }, middleware, sharedConfig);
  }, [sharedConfig, middleware, objectVariables]);

  const [resp, reExecuteQuery] = useQuery<TData>({
    query: queryCfg?.query,
    variables: objectVariables,
  });

  useEffect(() => {
    reExecuteQuery();
  }, [queryCfg]);

  //Parse response
  useEffect(() => {
    if (resp.data) {
      setItem(resp.data);
    }
  }, [resp.data]);

  return {
    item,
    localError: meta.localError,
    refresh: reExecuteQuery,
    setObjectVariables,
    objectVariables,
  };
}

// document: DocumentNode,
// where?: {[key: string]: any},
// orderBy?: {[key: string]: any},
// primaryKey: string = defaultPrimaryKey,
// pageSize: number = defaultPageSize,
