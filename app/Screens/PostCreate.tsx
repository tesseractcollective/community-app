import React, { useEffect } from 'react';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import {
  MutatorSaveButton,
  MutatorTextInput,
  useMutator,
} from '../components/Mutator';
import {Posts} from '../graphql';
import HasuraConfig from '../graphql/HasuraConfig';

const styles = StyleSheet.create({
  indicator: {
    margin: 16,
  },
});

export interface PostCreateRouterProps {
  userId: string;
  groupId?: string;
}

export default function (props: any) {
  const {userId, groupId} = props.route.params;

  const navigation = useNavigation();

  const {mutator, state} = useMutator<Posts>({
    config: HasuraConfig.posts,
    variables: {userId, groupId},
  });

  useEffect(() => {
    if (state.resultItem) {
      navigation.goBack();
    }
  }, [state.resultItem])

  return (
    <View>
      {state.mutating ? (
        <ActivityIndicator style={styles.indicator} size="large" />
      ) : null}
      {state.error ? <Text>{state.error.message}</Text> : null}
      <MutatorTextInput mutator={mutator} input="body" />
      <MutatorSaveButton mutator={mutator} />
    </View>
  );
}
