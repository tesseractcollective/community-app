import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

export default function (props: any) {
  const group = props.route.params.group;
  return (
    <View>
      <Image
        source={{ uri: group.photoUrl }}
      /> 
      <Text>{group.name}</Text>
      <Text>{group.description}</Text>
    </View>
  );
}
