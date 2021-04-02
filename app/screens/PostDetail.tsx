import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

import {useMutator, MutatorDeleteButton} from '../components/Mutator';
import {Post} from '../graphql';
import HasuraConfig from '../graphql/HasuraConfig';
import {useUserId} from '../UserContext';

export interface PostDetailRouterProps {
  post: Post;
}

export default function (props: any) {
  const post = props.route.params.post;

  const userId = useUserId();
  const navigation = useNavigation();
  const {mutator, state} = useMutator<Post>({
    config: HasuraConfig.posts,
    item: post,
  });

  useEffect(() => {
    if (state.resultItem) {
      navigation.goBack();
    }
  }, [state.resultItem]);

  return (
    <View>      
      <Image source={{uri: post.photoUrl}} />
      <Text>{post.name}</Text>
      <Text>{post.body}</Text>
      {userId === post.user?.id ? (
    
        <MutatorDeleteButton mutator={mutator} />
      ) : null}
    </View>
  );
}
