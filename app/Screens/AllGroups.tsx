import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

import GroupListItem from '../components/GroupListItem';
import PaginatedList from '../components/PaginatedList';
import {useTranslations} from '../components/TranslationProvider';
import {
  Groups,
  AllGroupsDocument,
  Groups_Bool_Exp,
  Groups_Order_By,
  Order_By,
} from '../graphql';

const styles = StyleSheet.create({
  groups: {
    height: '100%',
  },
});

export default function () {
  const translations = useTranslations();

  const [searchText, setSearchText] = useState('');

  const groupFilter: Groups_Bool_Exp = {
    _or: [
      {name: {_ilike: `%${searchText}%`}},
      {description: {_ilike: `%${searchText}%`}},
    ],
  };
  const groupOrderBy: Groups_Order_By = {name: Order_By.Asc};
  const renderGroup = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  return (
    <>
      <Input
        placeholder={translations.allGroups}
        onChangeText={setSearchText}
      />
      <PaginatedList
        style={styles.groups}
        document={AllGroupsDocument}
        resultField="groups"
        renderItem={renderGroup}
        where={groupFilter}
        orderBy={groupOrderBy}
      />
    </>
  );
}