import {useEffect, useState, useCallback} from 'react';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {QueryMiddleware} from '../types/hookMiddleware';
import {OperationContext, useMutation, UseMutationState} from 'urql';
import {stateFromQueryMiddleware} from 'react-graphql/support/middlewareHelpers';
import {useMonitorResult} from './monitorResult';
import {mutationEventAtom} from './mutationEventAtom';
import {useAtom} from 'jotai';
import {keyExtractor} from 'react-graphql/support/HasuraConfigUtils';
import {print} from 'graphql';

interface IUseMutateProps {
  sharedConfig: HasuraDataConfig;
  middleware: QueryMiddleware[];
  initialVariables?: IJsonObject;
  operationEventType: 'insert-first' | 'insert-last' | 'update' | 'delete';
  listKey?: string;
}

export interface MutateState {
  resultItem?: any;
  mutating: boolean;
  error?: Error;
  mutationState: UseMutationState;
  executeMutation: (
    variables?: IJsonObject,
    context?: Partial<OperationContext>,
  ) => void;
  setVariable: (key: string, value: any) => void;
  setVariables: (variables: {[key: string]: any}) => void;
  objectVariables: {[key: string]: any};
}

export default function useMutate<T extends IJsonObject>(
  props: IUseMutateProps,
): MutateState {
  const {sharedConfig, middleware, initialVariables, listKey} = props;
  //MutationConfig is what we internally refer to the middlewareState as
  const [objectVariables, setObjectVariables] = useState<{[key: string]: any}>(
    initialVariables || {},
  );
  const [needsExecuteMutation, setNeedsExecuteMutation] = useState<boolean>();
  const [
    executeContext,
    setExecuteContext,
  ] = useState<Partial<OperationContext> | null>();

  const [_, setMutationEvent] = useAtom(mutationEventAtom);

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }
  const computeConfig = (variables: IJsonObject) => {
    const state = stateFromQueryMiddleware(
      {variables},
      middleware,
      sharedConfig,
    );
    return state;
  };

  const [mutationCfg, setMutationCfg] = useState(
    computeConfig(objectVariables),
  );

  //Setup the initial mutation Config so it's for sure ready before we get to urql
  useEffect(() => {
    const newState = computeConfig(objectVariables);
    setMutationCfg(newState);
  }, [objectVariables]);

  //The mutation
  const [mutationResult, executeMutation] = useMutation(mutationCfg.document);
  const resultItem = mutationResult.data?.[mutationCfg.operationName];

  useEffect(() => {
    (async () => {
      if (needsExecuteMutation && !executeContext) {
        console.log('💪 executingMutation');
        console.log(print(mutationCfg.document));
        console.log(JSON.stringify({variables: mutationCfg.variables}));
        setNeedsExecuteMutation(false);
        const resp = await executeMutation(mutationCfg.variables);
        const successItem = resp?.data?.[mutationCfg.operationName];
        if (successItem) {
          const key = keyExtractor(sharedConfig, successItem);
          console.log('setMutationEvent');

          setMutationEvent(() => ({
            listKey: listKey ?? sharedConfig.typename,
            type: props.operationEventType,
            key: key,
            payload: {
              ...successItem,
            },
          }));
        }
      }
    })();
  }, [needsExecuteMutation, executeContext, executeMutation, mutationCfg]);

  useMonitorResult('mutation', mutationResult, mutationCfg);

  //Handling variables
  const setVariable = useCallback((key: string, value: any) => {
    setObjectVariables((original) => ({
      ...original,
      [key]: value,
    }));
  }, []);

  const setVariables = useCallback((variables: {[key: string]: any}) => {
    setObjectVariables((original) => ({
      ...original,
      ...variables,
    }));
  }, []);

  const wrappedExecuteMutation = (
    _variables?: IJsonObject,
    context?: Partial<OperationContext>,
  ) => {
    if (_variables) {
      if (_variables._dispatchInstances) {
        console.log(
          '🎁 wrappedExecuteMutation-> _variables -> Found reactEvent Object.  Will not update variables',
        );
      } else {
        console.log(
          '🎁 wrappedExecuteMutation-> _variables',
          JSON.stringify(_variables),
        );

        const newVariables = {
          ...objectVariables,
          ..._variables,
        }

        // you need to both because setObjectVariables triggers the
        // effect too late
        setMutationCfg(computeConfig(newVariables));
        setObjectVariables(newVariables);
      }
    }
    if (context) {
      setExecuteContext(context);
    } else {
      setNeedsExecuteMutation(true);
    }
  };

  //Return values
  return {
    resultItem,
    mutating: mutationResult.fetching,
    error: mutationResult.error,
    mutationState: mutationResult,
    executeMutation: wrappedExecuteMutation,
    setVariable,
    setVariables,
    objectVariables,
  };
}
