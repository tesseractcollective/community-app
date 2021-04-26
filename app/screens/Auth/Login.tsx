import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Image, Text} from 'react-native-elements';
import Auth0 from 'react-native-auth0';

import {AppRoute} from 'navRoutes';
import {AuthNavigationProps} from 'navTypes';
import {useTranslations} from 'components/TranslationProvider';
import constants from '../../config';
import Footer from './components/Footer';
import {Box, Container} from 'components';
import {saveString, remove} from '../../utils';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

const LoginScreen = ({navigation}: AuthNavigationProps<AppRoute.LOGIN>) => {
  console.log('THE NAVIGATION PROPS', navigation);
  const [loginError, setLoginError] = useState<Error | undefined>(undefined);
  const translations = useTranslations();

  const auth0 = new Auth0({
    domain: constants.auth0.domain,
    clientId: constants.auth0.clientId,
  });

  const login = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then((credentials) => {
        saveString('USER_TOKEN', credentials.idToken || '');
        // setToken(credentials.idToken);
      })
      .catch((error) => {
        console.warn(error);
        setLoginError(error);
      });
  };

  const logout = () => {
    auth0.webAuth
      .clearSession({federated: true})
      .then(() => {
        remove('USER_TOKEN').then(() => navigation.navigate(AppRoute.LOGIN));
      })
      .catch(() => {
        console.log('Log out cancelled');
      });
  };

  const footer = (
    <Footer
      title="Don’t have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate(AppRoute.SIGN_UP)}
    />
  );

  return (
    <Container pattern={0} {...{footer}}>
      <Box style={styles.container}>
        {loginError ? <Text>{loginError.message}</Text> : null}
        <Image
          source={{uri: constants.logoUrl}}
          style={{
            width: '100%',
            aspectRatio: 1,
            resizeMode: 'contain',
            marginBottom: 20,
            marginTop: 100,
          }}
        />
        <Button onPress={login} title={translations.loginButtonText} />
        <Button onPress={logout} title={translations.logoutButtonText} />
      </Box>
    </Container>
  );
};

export default LoginScreen;
