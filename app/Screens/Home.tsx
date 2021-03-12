import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import GroupListItem from '../components/GroupListItem';
import PaginatedList from '../components/PaginatedList';
import PostListItem from '../components/PostListItem';
import {useTranslations} from '../components/TranslationProvider';
import {
  Groups,
  AllGroupsDocument,
  AllPostsDocument,
  Groups_Bool_Exp,
  Groups_Order_By,
  Order_By,
  Posts,
  Posts_Bool_Exp,
  Posts_Order_By,
} from '../graphql';
import {useUserId} from '../UserContext';

const styles = StyleSheet.create({
  posts: {
    height: '100%',
  },
  groups: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});

export default function () {
  const translations = useTranslations();
  const navigation = useNavigation();
  const userId = useUserId();

  const whereMyGroups: Groups_Bool_Exp = {
    userGroups: {userId: {_eq: userId}},
  };
  const orderByGroups: Groups_Order_By = {name: Order_By.Asc};
  const renderGroup = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  const whereMyPosts: Posts_Bool_Exp = {
    _or: [
      {userId: {_eq: userId}},
      {group: {userGroups: {userId: {_eq: userId}}}},
      {userId: {_is_null: true}},
    ],
  };
  const orderByPosts: Posts_Order_By = {createdAt: Order_By.Asc};
  const renderPost = ({item}: {item: Posts}) => {
    return <PostListItem post={item} />;
  };

  return (
    <View>
      <Text>{translations.myGroups}</Text>

      <PaginatedList
        style={styles.groups}
        horizontal={true}
        document={AllGroupsDocument}
        renderItem={renderGroup}
        where={whereMyGroups}
        orderBy={orderByGroups}
      />
      <Button
        title={translations.allGroups}
        onPress={() => {
          navigation.navigate('AllGroups');
        }}
      />

      <Text>{translations.activityFeed}</Text>
      <PaginatedList
        style={styles.posts}
        document={AllPostsDocument}
        renderItem={renderPost}
        where={whereMyPosts}
        orderBy={orderByPosts}
      />
    </View>
  );
}
