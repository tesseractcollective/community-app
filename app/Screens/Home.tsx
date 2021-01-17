import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';

import {fetchPokemon} from '../api/pokemonApi';
import PokemonListItem from '../components/PokemonListItem';
import {useTranslations} from '../components/TranslationProvider';

export default function () {
  const translations = useTranslations();
  const {isLoading, isError, data, error} = useQuery('pokemon', fetchPokemon);

  return (
    <View>
      {isLoading ? (
        <Text>{translations.loading}</Text>
      ) : isError ? (
        <Text>{error as any}</Text>
      ) : data ? (
        <ScrollView>
          {data.results.map((item: any, index: number) => (
            <PokemonListItem key={item.name} {...item} />
          ))}
        </ScrollView>
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
}
