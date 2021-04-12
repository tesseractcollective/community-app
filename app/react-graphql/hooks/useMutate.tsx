import {useEffect, useState, useCallback, EffectCallback} from 'react';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {MutationMiddleware} from '../types/hookMiddleware';
import {OperationContext, useMutation, UseMutationState} from 'urql';
import {stateFromMutationMiddleware} from 'react-graphql/support/middlewareHelpers';
import {useMonitorResult} from './monitorResult';
import {mutationEventAtom} from './mutationEventAtom';
import {useAtom} from 'jotai';
import {findPkValueForItem} from './findDefaultPks';

interface IUseMutateProps {
  sharedConfig: HasuraDataConfig;
  middleware: MutationMiddleware[];
  initialVariables?: IJsonObject;
  operationEventType: 'insert' | 'update' | 'delete';
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
    initialVariables ?? {},
  );
  const [needsExecuteMutation, setNeedsExecuteMutation] = useState<boolean>();
  const [
    executeContext,
    setExecuteContext,
  ] = useState<Partial<OperationContext> | null>();

  const [mutationEvent, setMutationEvent] = useAtom(mutationEventAtom);

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }
  const computeConfig = () => {
    // console.log('computing config');
    // console.log('computeConfig -> objectVariables', objectVariables);
    const state = stateFromMutationMiddleware(
      {variables: objectVariables},
      middleware,
      sharedConfig,
    );
    // console.log('state', state.variables);
    return state;
  };

  const [mutationCfg, setMutationCfg] = useState(computeConfig);

  //Setup the initial mutation Config so it's for sure ready before we get to urql
  useEffect(() => {
    const newState = computeConfig();
    // console.log(
    //   'useInfiniteQueryMany-> useEffect -> computeConfig -> newState',
    //   newState,
    // );
    setMutationCfg(newState);
  }, [objectVariables]);

  //The mutation
  const [mutationResult, executeMutation] = useMutation(mutationCfg?.mutation);
  const resultItem = mutationResult.data?.[mutationCfg.operationName];

  useEffect(() => {
    (async () => {
      if (needsExecuteMutation && !executeContext) {
        console.log('💪 executingMutation', {
          executeContext,
          needsExecuteMutation,
          variables: mutationCfg?.variables,
        });
        setNeedsExecuteMutation(false);
        const resp = await executeMutation(mutationCfg?.variables);
        const successItem = resp?.data?.[mutationCfg.operationName];
        if (successItem) {
          const pkValue = findPkValueForItem(successItem, sharedConfig);
          console.log('setMutationEvent');

          setMutationEvent(() => ({
            listKey: listKey,
            type: props.operationEventType,
            pk: pkValue,
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
        console.log('🎁 wrappedExecuteMutation-> _variables', _variables);
        setObjectVariables((original) => ({
          ...original,
          ..._variables,
        }));
      }
    }
    console.log('setting setNeedsExecuteMutation');
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
