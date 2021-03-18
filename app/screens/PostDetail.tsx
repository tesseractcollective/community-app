
import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

export default function (props: any) {
  const post = props.route.params.post;
  return (
    <View>
      <Image
        source={{ uri: post.photoUrl }}
      /> 
      <Text>{post.name}</Text>
      <Text>{post.description}</Text>
    </View>
  );
}
