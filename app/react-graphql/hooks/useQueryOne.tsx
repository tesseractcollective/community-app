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

  const [item, setItem] = useState<TData | null>();
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
    updateItemKey();
  }, [item, objectVariables]);

  useEffect(() => {
    if (mutationEvent.type === 'init') {
      return;
    }

    logMutationEvent();

    if (
      mutationEvent.listKey === sharedConfig.typename &&
      (mutationEvent.key === key || !key)
    ) {
      if (mutationEvent.type === 'delete') {
        setItem(null);
      } else {
        setItem(mutationEvent.payload as TData);
      }
    } else if (
      mutationEvent.listKey &&
      sharedConfig.typename &&
      mutationEvent.listKey !== sharedConfig.typename
    ) {
      logMismatchedMutationEvent();
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

  function logMismatchedMutationEvent() {
    console.log(
      `❗ <- mismatched model types <- mutationEvent recieved <- useQueryOne
               ${mutationEvent.listKey} !== ${sharedConfig.typename}
               Recieved a mutationEvent with a key of ${mutationEvent.listKey}
               This instance of the useQueryOne hook was given a config for ${sharedConfig.typename}
        `,
    );
  }

  function logMutationEvent() {
    console.log(
      'mutationEvent recieved <- Before check <- useQueryOne',
      JSON.stringify(
        {
          c1: mutationEvent.listKey == sharedConfig.typename,
          'me:listKey': mutationEvent.listKey,
          typename: sharedConfig.typename,
          c2: mutationEvent.key === key || !key,
          'me:key': mutationEvent.key,
          key: key ?? 'NO KEY',
          mutationEvent,
        },
        null,
        2,
      ),
    );
  }

  function updateItemKey() {
    if (!sharedConfig || (!item && !objectVariables)) {
      return;
    }
    let newKey = item
      ? keyExtractor(sharedConfig, item)
      : keyExtractor(sharedConfig, objectVariables);
    if (newKey) {
      if (newKey !== key) {
        setKey(newKey);
      }
    } else if (item.typename !== sharedConfig.typename) {
      console.log(
        `❗ useQueryOne -> item -> keyExtractor failed',
                   ${item.typename} !== ${sharedConfig.typename}
                   Recieved a item with a key of ${item.listKey}
                   This instance of the useQueryOne hook was given a config for ${sharedConfig.typename}
            `,
      );
    } else {
      console.log(
        `❗ useQueryOne -> item -> keyExtractor failed for unknown reasons'`,
        JSON.stringify(
          {
            item,
            'sharedConfig.typename': sharedConfig.typename,
          },
          null,
          2,
        ),
      );
    }
  }

  function computeConfig() {
    return stateFromQueryMiddleware(
      {variables: objectVariables},
      middleware,
      sharedConfig,
    );
  }
}
