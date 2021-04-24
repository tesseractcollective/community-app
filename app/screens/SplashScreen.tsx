import React from 'react';
import {ImageProps} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export interface LoadingAnimationProps extends ImageProps {
  loading: boolean;
}

export const SplashImage = (
  props: LoadingAnimationProps,
): React.ReactElement | undefined => {
  if (!props.loading) {
    console.log('hiding splash screen');
    SplashScreen.hide();
    // NativeModules.SplashScreen.close({
    //   animationType: 2,
    //   duration: 500,
    // })
  }

  return null;
};
