import React, {useState, useEffect} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {MutateState} from 'react-graphql/hooks/useMutate';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {isDefined} from 'react-graphql/support/javaScriptHelpers';

export interface MutatorInputProps {
  state: MutateState;
  input: string;
  defaultValue?: string;
  value?: string;
  clearState?: boolean;
}

const defaultStyleStr = `b-0 bb-1 p-sxx p-s mb-s`;

export default function MutatorTextInput(
  props: MutatorInputProps & TextInputProps,
) {
  const {state, input, defaultValue, ...rest} = props;
  const [value, setValue] = useState<string>(props.value || defaultValue || '');
  useEffect(() => {
    if (
      isDefined(state?.resultItem?.[input]) &&
      state?.resultItem?.[input] !== value
    ) {
      setValue(state.resultItem[input]);
    }
  }, [state?.resultItem?.[input]]);

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || '');
    }
  }, [props.value]);

  useEffect(() => {
    if (
      isDefined(state?.objectVariables?.[input]) &&
      state?.objectVariables?.[input] !== value
    ) {
      setValue(state.objectVariables[input]);
    }
  }, [state.objectVariables]);

  useEffect(() => {
    if (props.clearState) {
      setValue('');
    }
  }, [props.clearState]);

  return (
    <TextInput
      {...rest}
      style={rest.style || bs(defaultStyleStr)}
      value={value}
      onChangeText={(text) => state.setVariable(input, text)}
    />
  );
}

MutatorTextInput.defaultStyleStr = defaultStyleStr;
