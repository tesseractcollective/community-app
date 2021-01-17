import React from 'react';
import { Text, View } from 'react-native';

export default function(props: any) {
  const pokemon = props.route.params.pokemon;
  return (
    <View>
      <Text>{pokemon.name}</Text>
      <Text>{pokemon.id}</Text>
    </View>
  )
}