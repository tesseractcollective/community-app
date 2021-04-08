import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

import {
  useMutator,
  MutatorDeleteButton,
  MutatorButton,
} from 'react-graphql/components';
import {Post} from 'graphql-api';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {useUserId} from '../UserContext';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';

export interface PostDetailRouterProps {
  post: Post;
}

export default function (props: any) {
  const post = props.route.params.post;

  const userId = useUserId();
  const navigation = useNavigation();
  const deleteState = useReactGraphql(HasuraConfig.posts).useDelete({
    initialVariables: {id: post.id},
  });

  useEffect(() => {
    if (deleteState.resultItem) {
      navigation.goBack();
    }
  }, [deleteState.resultItem]);

  return (
    <View>
      <Image source={{uri: post.photoUrl}} />
      <Text>{post.name}</Text>
      <Text>{post.body}</Text>
      {userId === post.user?.id ? (
        <MutatorButton state={deleteState} title={'delete'} />
      ) : null}
    </View>
  );
}
