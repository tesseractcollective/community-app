import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';

import {fetchGroups} from '../api/communityApi';
import GroupListItem from '../components/GroupListItem';
import {useTranslations} from '../components/TranslationProvider';

export default function () {
  const translations = useTranslations();
  const {isLoading, isError, data: groups, error} = useQuery('groups', fetchGroups);
  

  return (
    <View>
      {isLoading ? (
        <Text>{translations.loading}</Text>
      ) : isError ? (
        <Text>{error as any}</Text>
      ) : groups ? (
        <ScrollView>
          {groups.map((group: any) => (
            <GroupListItem key={group.id} group={group} />
          ))}
        </ScrollView>
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
}
