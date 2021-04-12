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
import PostComments from './PostParts/PostComments';
import PostCommentCreate from './PostParts/PostCommentCreate';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {useTranslations} from 'components/TranslationProvider';

export interface PostDetailRouterProps {
  post: Post;
}

export default function (props: any) {
  const post = props.route.params.post;

  const translations = useTranslations();

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
    <View style={bs(`f-1`)}>
      <Image source={{uri: post.photoUrl}} />
      <Text>{post.name}</Text>
      <Text>{post.body}</Text>

      <PostCommentCreate postId={post.id} />
      <View style={bs('f-1')}>
        <PostComments postId={post.id} />
      </View>

      {userId === post.user?.id ? (
        <MutatorButton state={deleteState} title={translations.delete} />
      ) : null}
    </View>
  );
}
