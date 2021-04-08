import React from 'react';
import {Button, ButtonProps} from 'react-native-elements';
import {MutateState} from 'react-graphql/hooks/useMutate';

export interface MutatorButtonProps {
  state: MutateState;
}

export default function MutatorButton(props: MutatorButtonProps & ButtonProps) {
  const {state, ...rest} = props;
  return <Button {...rest} onPress={()=> state.executeMutation()} />;
}
