import {useEffect, useMemo, useState, useCallback} from 'react';
import {HasuraDataConfig} from '../types/hasuraConfig';
import {MutationMiddleware} from '../types/hookMiddleware';
import {OperationContext, useMutation} from 'urql';
import {stateFromMutationMiddleware} from 'react-graphql/support/middlewareHelpers';
import isEqual from 'lodash.isequal';

interface IUseMutateProps {
  sharedConfig: HasuraDataConfig;
  middleware: MutationMiddleware[];
  initialVariables?: IJsonObject;
}

export interface MutateState {
  resultItem?: any;
  mutating: boolean;
  error?: Error;
  executeMutation: () => void;
  setVariable: (key: string, value: any) => void;
  setVariables: (variables: {[key: string]: any}) => void;
}

export default function useMutate<T extends IJsonObject>(
  props: IUseMutateProps,
): MutateState {
  const {sharedConfig, middleware, initialVariables} = props;
  //MutationConfig is what we internally refer to the middlewareState as
  const [objectVariables, setObjectVariables] = useState<{[key: string]: any}>(
    initialVariables ?? {},
  );
  const [needsExecuteMutation, setNeedsExecuteMutation] = useState<boolean>();
  const [
    executeContext,
    setExecuteContext,
  ] = useState<Partial<OperationContext> | null>();

  //Guards
  if (!sharedConfig || !middleware?.length) {
    throw new Error('sharedConfig and at least one middleware required');
  }
  const computeConfig = () => {
    console.log('computing config');
    console.log('computeConfig -> objectVariables', objectVariables);
    const state = stateFromMutationMiddleware(
      {variables: objectVariables},
      middleware,
      sharedConfig,
    );
    console.log('state', state.variables);
    return state;
  };

  const [mutationCfg, setMutationCfg] = useState(computeConfig);

  //Setup the initial mutation Config so it's for sure ready before we get to urql
  useEffect(() => {
    const newState = computeConfig();
    console.log('useEffect -> computeConfig -> newState', newState);
    setMutationCfg(newState);
  }, [objectVariables]);

  //The mutation
  const [mutationResult, executeMutation] = useMutation(mutationCfg?.mutation);
  console.log('mutationResult', mutationResult);
  const resultItem = mutationResult.data?.[mutationCfg.operationName];

  useEffect(() => {
    console.log('mutation useEffect');
    if (needsExecuteMutation && !executeContext) {
      console.log('💪 executingMutation', {
        executeContext,
        needsExecuteMutation,
        variables: mutationCfg?.variables,
      });
      setNeedsExecuteMutation(false);
      executeMutation(mutationCfg?.variables);
    }

    // setNeedsExecuteMutation(false);
    // setExecuteContext(null);
    // if (needsExecuteMutation) {
    //   setNeedsExecuteMutation(false);
    //   console.log('executingMutation');
    //   executeMutation(mutationCfg.variables);
    // } else if (executeContext) {
    //   setExecuteContext(null);
    //   executeMutation(mutationCfg.variables, executeContext);
    // }
  }, [needsExecuteMutation, executeContext, executeMutation, mutationCfg]);

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
      console.log('🎁 wrappedExecuteMutation-> _variables', _variables);
      setObjectVariables((original) => ({
        ...original,
        ..._variables,
      }));
    }
    console.log('setting setNeedsExecuteMutation');
    if (context) {
      setExecuteContext(context);
    } else {
      setNeedsExecuteMutation(true);
    }
  };

  // const wrappedExecuteMutation = (_variables?: IJsonObject, context?: Partial<OperationContext>) => {
  //   console.log('mocked wrappedExecuteMutation');
  // }

  //Return values
  return {
    resultItem,
    mutating: mutationResult.fetching,
    error: mutationResult.error,
    executeMutation: wrappedExecuteMutation,
    setVariable,
    setVariables,
  };
}
