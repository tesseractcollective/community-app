import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon} from 'react-native-elements';
import FeatherIcons from 'react-native-vector-icons/Feather';

import {useTranslations} from '../components/TranslationProvider';
import {User} from 'graphql-api';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {useUserId} from '../UserContext';
import {bs} from 'react-graphql/support/styling/buildStyles';
import VersionInfo from 'react-native-version-info';
import {remove} from '../utils';
import {AppRoute} from 'navRoutes';
import Auth0 from 'react-native-auth0';
import constants from '../config';
import {useUserUtils} from '../UserContext';
const gradient = ['#F44336', '#FF9800'];

const styles = StyleSheet.create({
  list: {},
});

export default function () {
  const translations = useTranslations();
  const navigation = useNavigation();
  const userId = useUserId();
  const {setToken} = useUserUtils();

  const auth0 = new Auth0({
    domain: constants.auth0.domain,
    clientId: constants.auth0.clientId,
  });

  const logout = () => {
    setToken('');
    remove('USER_TOKEN').then(() => console.log('USER TOKEN CLEARED'));
  };
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

  // const logout = () => {
  //   AsyncStorage.removeItem('user_token');
  // };

  return (
    <View style={bs(`f-1`)}>
      <View style={bs(`f-cc f-1`)}>
        <Button onPress={logout} title={'Logout'} />
      </View>
      <View style={bs(`f-ee`)}>
        <Text>
          Version: {VersionInfo.appVersion} ( {VersionInfo.buildVersion} )
        </Text>
      </View>
    </View>
  );
}
