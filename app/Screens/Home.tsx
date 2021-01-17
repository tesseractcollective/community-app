import * as React from 'react';
import {Text, View} from 'react-native';
import {useQuery} from 'react-query';

import {fetchPokemon} from '../api/pokemonApi';
import { useTranslations } from '../components/TranslationProvider';

export default function () {
  const translations = useTranslations()
  const { isLoading, isError, data, error } = useQuery('pokemon', fetchPokemon);

  if (isError) {
    return (
      <View>
        <Text>{error as any}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>{translations.loading}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{JSON.stringify(data.results)}</Text>
    </View>
  );
}
