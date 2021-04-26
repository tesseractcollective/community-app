import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AppRoute} from 'navRoutes';
import type {AuthenticationRoutes} from 'navTypes';
// import Onboarding, {assets as onBoardingAssets} from './Onboarding';
import Welcome from './Welcome';
import Login from './Login';
// import SignUp from './SignUp';
// import ForgotPassword from './ForgotPassword';
// import PasswordChanged from './PasswordChanged';
// import PhoneInput from './PhoneInput';
// import VerifyCode from './VerifyCode';
// import PasswordChange from './PasswordChanged';

// export const assets = [...onBoardingAssets, ...welcomeAssets];
export const assets = [];

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();
export const AuthenticationNavigator = () => {
  console.log('THE AUTH FLOW');
  return (
    <AuthenticationStack.Navigator screenOptions={{headerShown: false}}>
      <AuthenticationStack.Screen name={AppRoute.WELCOME} component={Welcome} />
      <AuthenticationStack.Screen name={AppRoute.LOGIN} component={Login} />
      {/*<AuthenticationStack.Screen name={AppRoute.SIGN_UP} component={SignUp} />*/}
      {/*<AuthenticationStack.Screen*/}
      {/*  name={AppRoute.FORGOT_PASSWORD}*/}
      {/*  component={ForgotPassword}*/}
      {/*/>*/}
      {/*<AuthenticationStack.Screen*/}
      {/*  name={AppRoute.CHANGE_PASSWORD}*/}
      {/*  component={PasswordChanged}*/}
      {/*/>*/}
      {/*<AuthenticationStack.Screen*/}
      {/*  name={AppRoute.PHONE_INPUT}*/}
      {/*  component={PhoneInput}*/}
      {/*/>*/}
      {/*<AuthenticationStack.Screen*/}
      {/*  name={AppRoute.SIGN_IN_CONFIRM_CODE}*/}
      {/*  component={VerifyCode}*/}
      {/*/>*/}
      {/*<AuthenticationStack.Screen*/}
      {/*  name={AppRoute.PASSWORD_CHANGED}*/}
      {/*  component={PasswordChange}*/}
      {/*/>*/}
    </AuthenticationStack.Navigator>
  );
};
