import React, {useRef, useEffect, useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {MutatorTextInput, MutatorButton} from 'react-graphql/components';
import {BorderlessButton} from 'react-native-gesture-handler';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Box, Text, Button} from 'components';
import Geolocation from 'react-native-geolocation-service';
import type {AuthNavigationProps} from 'navTypes';
import {AppRoute} from 'navRoutes';
import constants from '../../config';
import {hasLocationPermission} from '../../utils';

interface LocationShape {
  timestamp: number;
  coords: {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
}

const EnterLocation = ({
  navigation,
}: AuthNavigationProps<AppRoute.ENTER_LOCATION>) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationShape>();
  const [currentAddress, setCurrentAddress] = useState();
  const [listViewDisplayed, setListViewDisplayed] = useState(false);
  const locationRef = useRef<RNTextInput>(null);
  const checkLocationPermission = async () => {
    const weHaveLocationPermission = await hasLocationPermission();
    if (weHaveLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.warn('Geolocation Error', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 20000},
      );
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return (
    <Box flex={1} justifyContent="center" paddingHorizontal={'m'}>
      <Text marginBottom={'m'} variant={'title2'}>
        Where do you live
      </Text>
      <GooglePlacesAutocomplete
        currentLocation={false}
        enableHighAccuracyLocation={true}
        placeholder="Enter your location"
        minLength={2}
        listViewDisplayed={'auto'}
        fetchDetails={true}
        enablePoweredByContainer={false}
        listUnderlayColor={'#ccc'}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log('THE DATA', data);
          console.log('THE DETAILS', details);
        }}
        textInputProps={{
          onChangeText: (text) => {
            console.log(text);
            setListViewDisplayed(true);
          },
        }}
        query={{
          key: constants.locationApiKey,
          language: 'en', // language of the results
          components: 'country:' + 'us',
        }}
        styles={{
          description: {
            color: 'black',
            fontSize: 12,
          },
          predefinedPlacesDescription: {
            color: 'black',
          },
          listView: {
            position: 'absolute',
            marginTop: 44,
            backgroundColor: '#000',
            borderBottomEndRadius: 15,
            elevation: 2,
          },
        }}
        renderRow={(row) => {
          console.log(row);
          return (
            <Box>
              <Text>{row.place_id}</Text>
            </Box>
          );
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          radius: 5000,
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]}
        debounce={200}
      />
      {/*<TextInput*/}
      {/*  onFocus={() => checkLocationPermission()}*/}
      {/*  icon="navigation"*/}
      {/*  ref={locationRef}*/}
      {/*  placeholder={'Enter location'}*/}
      {/*/>*/}
      <Box
        alignItems="center"
        marginTop="l"
        flexDirection={'row'}
        justifyContent={'center'}>
        <BorderlessButton
          onPress={() => navigation.goBack()}
          style={{width: 150}}>
          <Text variant="button" color="text">
            Back
          </Text>
        </BorderlessButton>
        <Button
          style={{width: 150}}
          variant={'primary'}
          onPress={() => console.log('SUBMIT LOCATION AND INCREASE STEP')}
          label="Next"
        />
      </Box>
    </Box>
  );
};

export default EnterLocation;
