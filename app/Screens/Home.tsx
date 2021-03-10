import React from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import GroupListItem from '../components/GroupListItem';
import {useTranslations} from '../components/TranslationProvider';
import {Groups, AllGroupsDocument, usePagination, Groups_Bool_Exp, Groups_Order_By, Order_By, Posts, Posts_Bool_Exp, Posts_Order_By} from '../graphql';
import { useUserId } from '../UserContext';

const styles = StyleSheet.create({
  posts: {
    height: '100%',
  },
  groups: {
    paddingTop:10,
    paddingBottom: 20,
  }
});

function useGroupsPagination(where?: Groups_Bool_Exp, orderBy: Groups_Order_By = { name: Order_By.Asc }) {
  return usePagination<Groups>(AllGroupsDocument, 'groups', 'name', where, orderBy, 'id', 100);
}

function usePostPagination(where?: Posts_Bool_Exp, orderBy: Posts_Order_By = { createdAt: Order_By.Asc }) {
  return usePagination<Posts>(AllGroupsDocument, 'posts', 'name', where, orderBy);
}

export default function () {
  const translations = useTranslations();
  const userId = useUserId();
  const whereMyGroups: Groups_Bool_Exp = {
    userGroups: { userId: { _eq: userId } }
  }
  const { 
    items: groups, 
    error: groupError, 
    fetching: groupFetching, 
    refresh: groupRefresh, 
    loadNextPage: groupLoadNextPage
  } = useGroupsPagination(whereMyGroups);

  const whereMyPosts: Posts_Bool_Exp = {
    _or: [
      { userId: { _eq: userId } },
      { userId: { _is_null: true } }
    ]
  }
  const { 
    items: posts, 
    error: postError, 
    fetching: postFetching, 
    refresh: postRefresh, 
    loadNextPage: postLoadNextPage
  } = usePostPagination(whereMyPosts);
  
  const renderGroup = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  const renderPost = ({item}: {item: Posts}) => {
    return <GroupListItem group={item} />;
  };

  return (
    <View>
      {groupError ? (
        <Text>{groupError as any}</Text>
      ) : postError ? (
        <Text>{postError as any}</Text>
      ) : ( 
        <>
          <Text>{translations.groupsMyGroups}</Text>
          <FlatList
            style={styles.groups}
            horizontal={true}
            refreshControl={
              <RefreshControl refreshing={groupFetching} onRefresh={groupRefresh} />
            }
            data={groups}
            renderItem={renderGroup}
            keyExtractor={(group) => group.id}
            onEndReachedThreshold={1}
            onEndReached={groupLoadNextPage}
          />
          <FlatList
            style={styles.posts}
            refreshControl={
              <RefreshControl refreshing={postFetching} onRefresh={postRefresh} />
            }
            data={posts}
            renderItem={renderPost}
            keyExtractor={(post) => post.id}
            onEndReachedThreshold={1}
            onEndReached={postLoadNextPage}
          />
        </>
      )}
    </View>
  );
}
