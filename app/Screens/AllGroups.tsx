import React, { useState } from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import { Input } from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

import GroupListItem from '../components/GroupListItem';
import {useTranslations} from '../components/TranslationProvider';
import {
  Groups,
  AllGroupsDocument,
  usePagination,
  Groups_Bool_Exp,
  Groups_Order_By,
  Order_By,
} from '../graphql';

const styles = StyleSheet.create({
  posts: {
    height: '100%',
  },
  groups: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});

function useGroupsPagination(
  where?: Groups_Bool_Exp,
  orderBy: Groups_Order_By = {name: Order_By.Asc},
) {
  return usePagination<Groups>(
    AllGroupsDocument,
    'groups',
    'name',
    where,
    orderBy,
    'id',
    100,
  );
}

export default function () {
  const translations = useTranslations();
  
  const [searchText, setSearchText] = useState("");

  const groupFilter: Groups_Bool_Exp | undefined = searchText ? {
    _or: [
      { name: { _ilike: `%${searchText}%` } },
      { description: { _ilike: `%${searchText}%` } },
    ]
  } : undefined;

  const {
    items: groups,
    error: groupError,
    fetching: groupFetching,
    refresh: groupRefresh,
    loadNextPage: groupLoadNextPage,
  } = useGroupsPagination(groupFilter);

  const renderGroup = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  return (
    <View>
      {groupError ? (
        <Text>{groupError.message}</Text>
      ) : (
        <>
          <Input 
            placeholder={translations.allGroups}
            onChangeText={setSearchText}
          />
          <FlatList
            style={styles.groups}
            refreshControl={
              <RefreshControl
                refreshing={groupFetching}
                onRefresh={groupRefresh}
              />
            }
            data={groups}
            renderItem={renderGroup}
            keyExtractor={(group) => group.id}
            onEndReachedThreshold={1}
            onEndReached={groupLoadNextPage}
          />
        </>
      )}
    </View>
  );
}
