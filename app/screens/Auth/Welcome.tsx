import React, {useState} from 'react';
import {Image, Dimensions} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Box, Text, Button, useTheme} from 'components';
import type {AuthNavigationProps} from 'navTypes';
import {AppRoute} from 'navRoutes';
import {useUserUtils} from '../../UserContext';
import {useTranslations} from '../../components/TranslationProvider';
import Auth0 from 'react-native-auth0';
import constants from '../../config';

const {width} = Dimensions.get('window');

const Welcome = ({navigation}: AuthNavigationProps<AppRoute.WELCOME>) => {
  const theme = useTheme();
  console.log('THE NAVIGATION PROPS', useUserUtils);
  const {setToken} = useUserUtils();
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
        // console.log('THE CREDENTIALS', credentials.idToken);
        setToken(credentials.idToken || '');
        navigation.navigate(AppRoute.MAIN);
        // setToken(credentials.idToken);
      })
      .catch((error) => {
        console.warn(error);
        setLoginError(error);
      });
  };
  return (
    <Box flex={1} backgroundColor="background">
      <Box
        flex={1}
        backgroundColor="screenBackground"
        alignItems="center"
        justifyContent="center">
        <Image
          source={require('../../../assets/stacked_logo.png')}
          style={{
            width: 200,
            height: 300,
          }}
        />
      </Box>

      <Box flex={1}>
        <Box
          backgroundColor="background"
          justifyContent="flex-start"
          alignItems="center"
          flex={1}
          padding="m">
          <Text
            variant="title2"
            color={'titleText'}
            marginBottom={'m'}
            marginTop={'m'}>
            A Movement
          </Text>
          <Text
            variant="body"
            textAlign="center"
            marginBottom={'m'}
            paddingHorizontal={'m'}>
            ONLINE COLLECTIVE BUILT FOR LEGENDARY, MOTO-OBSESSED AND
            MOTO-CURIOUS WOMXN.
          </Text>
          <Button
            variant="primary"
            label={translations.loginButtonText}
            onPress={login}
          />
          <Button
            label="Join us"
            onPress={() => navigation.navigate(AppRoute.SIGN_UP)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
