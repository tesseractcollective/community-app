import React from 'react';
import {Input, InputProps} from 'react-native-elements';
import {MutateState} from 'react-graphql/hooks/useMutate';

export interface MutatorInputProps {
  state: MutateState;
  input: string;
}

export default function MutatorTextInput(
  props: MutatorInputProps & InputProps,
) {
  const {state, input, ...rest} = props;

  const value = state.resultItem ? state.resultItem[input] : undefined;

  return (
    <Input
      {...rest}
      value={value}
      onChangeText={(text) => state.setVariable(input, text)}
    />
  );
}
