import {Group_Bool_Exp, Group_Order_By, Order_By} from 'graphql-api';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import GroupsAllListSection from './GroupsParts/GroupsAllListSection';
import GroupsAllMapSection from './GroupsParts/GroupsAllMapSection';
import GroupsAllSearchBoxSection from './GroupsParts/GroupsAllSearchBoxSection';
import GroupsAllSegmentedButtonSection from './GroupsParts/GroupsAllSegmentedButtonSection';

export default function () {
  const [searchText, setSearchText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(1);

  const groupFilter: Group_Bool_Exp = {
    _or: [
      {name: {_ilike: `%${searchText}%`}},
      {description: {_ilike: `%${searchText}%`}},
    ],
  };
  const groupOrderBy: Group_Order_By = {name: Order_By.Asc};

  return (
    <>
      <GroupsAllSegmentedButtonSection
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        buttons={['Interests', 'Locations', 'My Collectives']}
      />
      {selectedIndex === 0 && (
        <View>
          <Text>Interests</Text>
        </View>
      )}
      {selectedIndex === 1 && (
        <View>
          <GroupsAllSearchBoxSection
            setSearchText={setSearchText}
            searchText={searchText}
          />
          <GroupsAllMapSection />
        </View>
      )}
      {selectedIndex === 2 && (
        <View>
          <GroupsAllSearchBoxSection
            setSearchText={setSearchText}
            searchText={searchText}
          />
          <GroupsAllListSection
            groupFilter={groupFilter}
            groupOrderBy={groupOrderBy}
          />
        </View>
      )}
    </>
  );
}
