import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem} from 'react-native-elements';
import { Posts } from '../graphql';

interface PostListItemProps {
  post: Posts
}

export default function (props: PostListItemProps) {
  const navigation = useNavigation();
  const {post} = props;

  const onPress = () => {
    navigation.navigate('PostDetail', {post});
  }

  return (
    <ListItem bottomDivider onPress={onPress}>
      {/* <Avatar source={{uri: group.photoUrl}} /> */}
      <ListItem.Content>
        <ListItem.Title>{post.body}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
