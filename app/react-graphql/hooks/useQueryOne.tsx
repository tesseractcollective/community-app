import {useState, useEffect} from 'react';
import {HasuraDataConfig} from 'react-graphql/types/hasuraConfig';
import {QueryMiddleware} from 'react-graphql/types/hookMiddleware';
import {OperationContext, useQuery} from 'urql';
import {stateFromQueryMiddleware} from 'react-graphql/support/middlewareHelpers';
import {keyExtractor} from 'react-graphql/support/HasuraConfigUtils';
import {useAtom} from 'jotai';
import {IMutationEvent, mutationEventAtom} from './mutationEventAtom';

interface IUseQueryOne {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  variables: IJsonObject;
}

export default function useQueryOne<
  TData extends IJsonObject,
  TVariables extends IJsonObject
>(props: IUseQueryOne) {
  const {sharedConfig, middleware, variables} = props;

  const [item, setItem] = useState<TData>();
  const [key, setKey] = useState<string>();
  const [objectVariables, setObjectVariables] = useState<{[key: string]: any}>(
    variables,
  );

  const [mutationEvent] = useAtom<IMutationEvent>(mutationEventAtom);

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }

  const [queryCfg, setQueryCfg] = useState(computeConfig);

  const [resp, reExecuteQuery] = useQuery<TData>({
    query: queryCfg?.document,
    variables: queryCfg.variables,
  });

  useEffect(() => {
    if (item) {
      setKey(keyExtractor(sharedConfig, item));
    }
  }, [item]);

  useEffect(() => {
    if (
      mutationEvent.listKey == sharedConfig.typename &&
      mutationEvent.key === key &&
      mutationEvent.type !== 'init'
    ) {
      if (mutationEvent.type === 'delete') {
        setItem(undefined);
      } else {
        setItem(mutationEvent.payload as TData);
      }
    }
  }, [mutationEvent]);

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
      setItem(resp.data[queryCfg.operationName]);
    }
  }, [resp.data]);

  return {
    item,
    localError: undefined,
    fetching: resp.fetching,
    error: resp.error,
    stale: resp.stale,
    refresh: reExecuteQuery,
    setVariables: setObjectVariables,
    variables: objectVariables,
  };

  function computeConfig() {
    return stateFromQueryMiddleware(
      {variables: objectVariables},
      middleware,
      sharedConfig,
    );
  }
}
