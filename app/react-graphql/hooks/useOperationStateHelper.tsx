import React, {useState, useEffect, ReactElement} from 'react';
import {Text} from 'react-native';
import {UseQueryState, CombinedError} from 'urql';
import Toast from 'react-native-toast-message';

interface IUseOperationStateHelperOptions {
  successToastMessage?: string;
  successString?: string;
  successRender?: (data: any) => ReactElement;
  onSuccess?: (data: any) => void;
  errorToastMessage?: string;
  errorString?: string;
  errorRender?: (error: CombinedError) => ReactElement;
  onError?: (error: CombinedError) => void;
}

export default function useOperationStateHelper(
  queryState: UseQueryState,
  options: IUseOperationStateHelperOptions,
) {
  const [Error, setError] = useState<ReactElement>();
  const [Success, setSuccess] = useState<ReactElement>();
  const [queryCompleted, setQueryCompleted] = useState(false);
  const [lastFetchingState, setLastFetchingState] = useState(
    queryState.fetching,
  );

  useEffect(() => {
    if (queryState.fetching !== lastFetchingState) {
      setLastFetchingState(queryState.fetching);
      if (!queryState.fetching) {
        setQueryCompleted(true);
      }
    }
  }, [queryState]);

  useEffect(() => {
    if (queryCompleted) {
      if (queryState.error) {
        //TODO: Show error
        if (options.errorToastMessage) {
          Toast.show({
            text2: options.errorToastMessage,
            type: 'error',
            position: 'bottom',
          });
        }
        if (options.errorString) {
          setError(<Text>errorString</Text>);
        }
        if (options.errorRender) {
          setError(options.errorRender(queryState.error));
        }
        if (options.onError) {
          options.onError(queryState.error);
        }
      } else if (queryState.data) {
        if (options.successToastMessage) {
          Toast.show({
            text2: options.successToastMessage,
            type: 'success',
            position: 'bottom',
          });
        }
        if (options.successString) {
          setSuccess(<Text>successString</Text>);
        }
        if (options.successRender) {
          setSuccess(options.successRender(queryState.data));
        }
        if (options.onSuccess) {
          options.onSuccess(queryState.data);
        }
      }
      setQueryCompleted(false);
    }
  }, [queryCompleted]);

  return {
    Error,
    Success,
    queryCompleted,
  };
}
