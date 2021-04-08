import React, {FunctionComponent} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';

export interface IGroupsAllMapSectionProps {}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const GroupsAllMapSection: FunctionComponent<IGroupsAllMapSectionProps> = function GroupsAllMapSection(
  props,
) {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomEnabled={false}
        zoomTapEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}>
        <UrlTile urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapView>
    </View>
  );
};

export default GroupsAllMapSection;

/*
  const groupFilter: Location_Bool_Exp = {
    _or: [
      {city: {_ilike: `%${searchText}%`}},
      {country: {_ilike: `%${searchText}%`}},
      {name: {_ilike: `%${searchText}%`}},
      {state: {_ilike: `%${searchText}%`}},
    ],
  };

query groupsMap($searchText: String!) {
  location(where: {_or: {city: {_ilike: $searchText}, country: {_ilike: $searchText}, name: {_ilike: $searchText}, state: {_ilike: $searchText}}}) {
    location
    latitude
    longitude
    name
    state
    city
    country
    countryCode
    formattedAddress
    id
    addressForLanguage
    groups {
      name
      id
    }
  }
}

*/

/*
  const groupFilter: Location_Bool_Exp = {
    location: {
      _st_d_within: {
        distance: 50 * 0.000621371, from: {
          type:"Point",
          coordinates: [
            -111.01251516136,
            40.160349634
        ]}
      }
    }
  };

*/
