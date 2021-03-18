import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import Auth0 from 'react-native-auth0';

import { useTranslations } from '../components/TranslationProvider';
import constants from '../config';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export interface LoginProps {
  setToken: (token?: string) => void
}

export default function (props: LoginProps) {
  const { setToken } = props;
  const [loginError, setLoginError] = useState<Error | undefined>(undefined);
  const translations = useTranslations();

  const auth0 = new Auth0({
    domain: constants.auth0.domain,
    clientId: constants.auth0.clientId
  });

  const login = () => {
    auth0.webAuth
      .authorize({ scope: 'openid profile email' })
      .then(credentials => {
        setToken(credentials.idToken);
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
        setToken(undefined);
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
