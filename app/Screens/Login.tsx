import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import Auth0 from 'react-native-auth0';

import { UserContext } from '../App';
import { useTranslations } from '../components/TranslationProvider';
import constants from '../constants';

export interface User {
  name: string;
  accessToken?: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default function () {
  const [loginError, setLoginError] = useState<Error | undefined>(undefined);
  const { setUser } = useContext(UserContext);
  const translations = useTranslations();

  const auth0 = new Auth0({
    domain: constants.auth0.domain,
    clientId: constants.auth0.clientId
  });

  const login = () => {
    auth0.webAuth
      .authorize({ scope: 'openid profile email' })
      .then(credentials => {
        setUser({
          name: 'test',
          accessToken: credentials.accessToken
        });
      })
      .catch(error => {
        console.log(error);
        setLoginError(error);
      });
  }

  const logout = () => {
    auth0.webAuth
      .clearSession({ federated: true })
      .then(success => {
        setUser(undefined);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  }

  return (
    <View style={styles.container}>
      {loginError ? (
        <Text>{loginError.message}</Text>
      ) : null}
      <Image source={{ uri: constants.logoUrl }} style={{ width: 300, height: 450, marginBottom: 20 }} />
      <Button
        onPress={login}
        title={translations.loginButtonText}
      />
      <Button
        onPress={logout}
        title={translations.logoutButtonText}
      />
    </View>

  );
}
