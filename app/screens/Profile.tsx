import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import FeatherIcons from 'react-native-vector-icons/Feather';

import {useTranslations} from '../components/TranslationProvider';
import {
    User
} from 'graphql-api';      
import HasuraConfig from 'graphql-api/HasuraConfig';
import {useUserId} from '../UserContext';

const gradient = ['#F44336', '#FF9800'];

const styles = StyleSheet.create({
  list: {
  },
});

export default function () {
  const translations = useTranslations();
  const navigation = useNavigation();
  const userId = useUserId();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props: any) => (
        <Button
          type="clear"
          onPress={() => navigation.navigate('PostCreate', {userId})}
          icon={<FeatherIcons name="plus" size={24} color={props.tintColor} />}
        />
      ),
    });
  }, [navigation, userId]);

  return (
    <View style={{backgroundColor: "red"}}>
      
    </View>
  );
}
