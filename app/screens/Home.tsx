import {useNavigation} from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { color } from 'react-native-reanimated';
import { Button, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import GroupListItem from '../components/GroupListItem';
import PaginatedList from '../components/PaginatedList';
import PostListItem from '../components/PostListItem';
import {useTranslations} from '../components/TranslationProvider';
import {
  Groups,
  Groups_Bool_Exp,
  Groups_Order_By,
  Order_By,
  Posts,
  Posts_Bool_Exp,
  Posts_Order_By,
} from '../graphql';
import HasuraConfig from '../graphql/HasuraConfig';
import {useUserId} from '../UserContext';

const styles = StyleSheet.create({
  list: {
    backgroundColor:"#F2F2F2"
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 38,
    marginStart: 29,
    marginEnd: 18,
  },
  sectionTitle: {

    // fontFamily: "Montserrat-Medium",
    color: "#222222",    
    fontSize: 32,
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 12,    
  },
  posts: {
    height: '100%',
  },
  groups: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  listButton: {
    textTransform: "uppercase",
    borderRadius: 22, 
  },
  listButtonContainer: {
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 12,    
  }
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
  const orderByPosts: Posts_Order_By = {createdAt: Order_By.Desc};
  const renderPost = ({item}: {item: Posts}) => {
    return <PostListItem post={item} />;
  };

  return (
    <View style={styles.list}>
      <View style={styles.sectionHeader}>
        <Text
          style={styles.sectionTitle}>
          {translations.myGroups}
        </Text>
        <Button        
          buttonStyle={styles.listButton}
          title={translations.seeAll.toUpperCase()}
          iconRight
          icon={
            <Icon
              name="chevron-right"
              size={18}
              color="white"
            />
          }
          onPress={() => {
            navigation.navigate('AllGroups');            
          }}
      />   
      </View>
     
      <PaginatedList
        style={styles.groups}
        horizontal={true}
        config={HasuraConfig.groups}
        renderItem={renderGroup}
        where={whereMyGroups}
        orderBy={orderByGroups}
      />
      <PaginatedList
        style={styles.posts}
        config={HasuraConfig.posts}
        renderItem={renderPost}
        where={whereMyPosts}
        orderBy={orderByPosts}
      />
    </View>
  );
}
