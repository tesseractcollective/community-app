import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {ActivityIndicatorComponent, Text, View} from 'react-native';

import { MutatorSaveButton, MutatorTextInput, useMutator } from '../components/Mutator';
import { Posts } from '../graphql';
import HasuraConfig from '../graphql/HasuraConfig';

export interface PostCreateRouterProps {
  userId: string;
  groupId?: string;
}

export default function (props: any) {
  const { userId, groupId } = props.route.params;
  
  const navigation = useNavigation();
  
  const { mutator, state } = useMutator<Posts>({
    config: HasuraConfig.posts,
    variables: { userId, groupId }
  });

  if (state.resultItem) {
    // TODO: make sure new post loads 
    navigation.goBack();
  }

  return (
    <View>
      {/* { state.mutating ? <ActivityIndicatorComponent /> : null }
      { state.error ? <Text>{state.error.message}</Text> : null } */}
      <MutatorTextInput mutator={mutator} input="body" />
      <MutatorSaveButton mutator={mutator} />
    </View>
  );
}