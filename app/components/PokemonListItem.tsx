import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {Avatar, ListItem} from 'react-native-elements';
import { useQuery } from 'react-query';
import { fetchSinglePokemon } from '../api/pokemonApi';

interface PokemonListItemProps {
  name: string;
  url: string;
}

export default function (props: PokemonListItemProps) {
  const navigation = useNavigation();
  const { isLoading, isError, data, error } = useQuery(props.url, fetchSinglePokemon(props.url));

  const onPress = useCallback(() => {
    if (data) {
      navigation.navigate("PokemonDetail", { pokemon: data })
    }
  }, [data])

  return (
    <ListItem bottomDivider onPress={onPress}>
      <Avatar source={{uri: data?.sprites?.front_default}} />
      <ListItem.Content>
        <ListItem.Title>{props.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
