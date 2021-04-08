import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

import GroupListItem from '../components/GroupListItem';
import PaginatedList from '../react-graphql/components/native/PaginatedList';
import {useTranslations} from '../components/TranslationProvider';
import {
  Group,
  Group_Bool_Exp,
  Group_Order_By,
  Order_By,
} from 'graphql-api';
import HasuraConfig from 'graphql-api/HasuraConfig';

const styles = StyleSheet.create({
  groups: {
    height: '100%',
  },
});

export default function () {
  const translations = useTranslations();

  const [searchText, setSearchText] = useState('');

  const groupFilter: Group_Bool_Exp = {
    _or: [
      {name: {_ilike: `%${searchText}%`}},
      {description: {_ilike: `%${searchText}%`}},
    ],
  };
  const groupOrderBy: Group_Order_By = {name: Order_By.Asc};
  const renderGroup = ({item}: {item: Group}) => {
    return <GroupListItem group={item} />;
  };
 
  return (
    <>
      <Input
        placeholder={translations.groupsAll}
        onChangeText={setSearchText}
      />
      <PaginatedList
        style={styles.groups}
        config={HasuraConfig.groups}
        renderItem={renderGroup}
        where={groupFilter}
        orderBy={groupOrderBy}
      />
    </>
  );
}
