import React, {useRef, useEffect, useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {MutatorTextInput, MutatorButton} from 'react-graphql/components';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Text, Button} from 'components';
import Geolocation from 'react-native-geolocation-service';
import type {AuthNavigationProps} from 'navTypes';
import {AppRoute} from 'navRoutes';
import TextInput from 'components/form/TextInput';
import constants from '../config';
import {hasLocationPermission} from 'utils';

const EnterLocation = ({
  navigation,
}: AuthNavigationProps<AppRoute.ENTER_LOCATION>) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const locationRef = useRef<RNTextInput>(null);

  // useEffect(() => {
  //   if (!mapStore.locationPermission) {
  //     (async () => {
  //       await requestLocationPermission().then((res) => {
  //         console.log('THE PERMISSIONS RESPONSE', res);
  //         if (res === 'granted') {
  //           mapStore.setMapPermission(true);
  //           mapStore.currentLocation;
  //         }
  //       });
  //     })();
  //   }
  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log(position);
  //       },
  //       (error) => {
  //         console.warn('Geolocation Error', error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 20000},
  //     );
  //   }
  // }, []);

  return <TextInput icon="location" ref={locationRef} />;
};

export default EnterLocation;
