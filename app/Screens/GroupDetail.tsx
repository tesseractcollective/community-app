import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';

// id: string;
// name: string;
// description: string;
// photoUrl?: string;
// location?: Location;
// createdAt: string;
// updatedAt: string;

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
