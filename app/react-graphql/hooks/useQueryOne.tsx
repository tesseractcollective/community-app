import React, {useState, useEffect, useCallback} from 'react';
import {HasuraDataConfig} from 'types/hasuraConfig';
import {QueryMiddleware} from 'types/hookMiddleware';
import {useQuery} from 'urql';
import {stateFromQueryMiddleware} from 'react-graphql/support/middlewareHelpers';

interface IUseQueryOne {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  initialVariables?: IJsonObject;
}

export default function useQueryOne<
  TData extends IJsonObject,
  TVariables extends IJsonObject
>(props: IUseQueryOne) {
  const {sharedConfig, middleware, initialVariables} = props;

  const [meta, setMeta] = useState<{
    firstQueryCompleted: boolean;
    localError: string;
    detectedPks: Map<any, any>;
  }>({firstQueryCompleted: false, localError: '', detectedPks: new Map()});

  const [item, setItem] = useState<TData>();
  const [objectVariables, setObjectVariables] = useState<{[key: string]: any}>(
    initialVariables ?? {},
  );

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }

  const [queryCfg, setQueryCfg] = useState(computeConfig);

  const [resp, reExecuteQuery] = useQuery<TData>({
    query: queryCfg?.query,
    variables: queryCfg.variables,
  });

  useEffect(() => {
    reExecuteQuery();
  }, [queryCfg]);

  useEffect(() => {
    const newState = computeConfig();
    console.log(
      'useQueryOne -> useEffect -> computeConfig -> newState',
      newState,
    );
    setQueryCfg(newState);
  }, [objectVariables]);

  //Parse response
  useEffect(() => {
    if (resp.data) {
      console.log('⛱️ resp.data', resp.data);
      setItem(resp.data[queryCfg?.operationName]);
    } else {
      // console.log('❗ ⛱️ resp', resp);
    }
  }, [resp.fetching]);

  return {
    item,
    localError: meta.localError,
    refresh: reExecuteQuery,
    setObjectVariables,
    objectVariables,
  };

  function computeConfig() {
    return stateFromQueryMiddleware(
      {variables: objectVariables},
      middleware,
      sharedConfig,
    );
  }
}

// document: DocumentNode,
// where?: {[key: string]: any},
// orderBy?: {[key: string]: any},
// primaryKey: string = defaultPrimaryKey,
// pageSize: number = defaultPageSize,
