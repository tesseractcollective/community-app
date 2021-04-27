/** @format */

import React, {PureComponent} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import {MAP_API} from '@ivy/env';
import GeoPlacesAutocomplete from '../searchUtils';
import SearchGoogleItem from './SearchGoogleItem';
import styles from './styles';

class GooglePlacesInput extends PureComponent {
  _onFilter = () => {};

  render() {
    const _updateMarkerAndRegion = (current = {}) => {
      if (current.address_lat !== 0 || current.address_long !== 0) {
        // this.props.fetchNearestLocations(
        //   true,
        //   current.address_lat,
        //   current.address_long
        // );
        // this.props.setRegionMap(current);
      }
    };
    const _onSelectPlace = (data, detail) => {
      const {geometry} = detail;
      const current = {
        address_lat: geometry && geometry.location && geometry.location.lat,
        address_long: geometry && geometry.location && geometry.location.lng,
      };
      console.log('CURRENT', current);
      _updateMarkerAndRegion(current);
    };
    const {onPress, style} = this.props;

    return (
      <GeoPlacesAutocomplete
        placeholder="Search..."
        minLength={2}
        keyboardAppearance={'light'}
        autoFocus={true}
        returnKeyType="search"
        listViewDisplayed={false}
        currentLocation={true}
        currentLocationLabel="Current location"
        fetchDetails
        onChangeText={() => console.log('changing')}
        renderRow={(row) => {
          console.log(row);
          return <SearchGoogleItem row={row} />;
        }}
        onPress={(data, details = null) => {
          _onSelectPlace(data, details);
        }}
        query={{
          key: MAP_API,
          language: 'en-Au',
          components: 'country:' + 'us',
        }}
        styles={{
          container: styles.container,
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listResult,
          description: styles.description,
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'cities',
          radius: 5000,
        }}
        debounce={500}
        enablePoweredByContainer={false}
        onNotFound={null}
      />
    );
  }
}

export default GooglePlacesInput;
