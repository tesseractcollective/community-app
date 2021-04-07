import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {GroupListItemHome} from '../components/GroupListItem';
import {PaginatedList} from 'react-graphql/components';
import PostListItem from '../components/PostListItem';
import {useTranslations} from '../components/TranslationProvider';
import {
  Group,
  Group_Bool_Exp,
  Group_Order_By,
  Order_By,
  Post,
  Post_Bool_Exp,
  Post_Order_By,
} from 'graphql-api';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {useUserId} from '../UserContext';

const seeAllButtonGradient = ['#F44336', '#FF9800'];

export default function () {
  const translations = useTranslations();
  const navigation = useNavigation();
  const userId = useUserId();
  const bottomTabBarHeight = useBottomTabBarHeight();

  console.log('bottomTabBarHeight', bottomTabBarHeight);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props: any) => (
        <Button
          type="clear"
          onPress={() => navigation.navigate('PostCreate', {userId})}
          icon={<FeatherIcons name="plus" size={24} color={props.tintColor} />}
        />
      ),
    });
  }, [navigation, userId]);

  const whereMyGroups: Group_Bool_Exp = {
    userGroup: {userId: {_eq: userId}},
  };
  const orderByGroups: Group_Order_By = {name: Order_By.Asc};
  const renderGroup = ({item}: {item: Group}) => {
    return <GroupListItemHome group={item} />;
  };

  const whereMyPosts: Post_Bool_Exp = {
    _or: [
      {userId: {_eq: userId}},
      {group: {userGroup: {userId: {_eq: userId}}}},
      {userId: {_is_null: true}},
    ],
  };
  const orderByPosts: Post_Order_By = {createdAt: Order_By.Desc};
  const renderPost = ({item}: {item: Post}) => {
    return <PostListItem post={item} />;
  };

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{translations.groupsMyGroups}</Text>
        <Button
          type="clear"
          buttonStyle={styles.listButton}
          titleStyle={styles.listButtonTitle}
          title={translations.seeAll.toUpperCase()}
          iconRight
          icon={<Icon name="chevron-right" size={18} color="black" />}
          onPress={() => {
            navigation.navigate('GroupsAll');
          }}
        />
      </View>

      <PaginatedList
        style={styles.groups}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        config={HasuraConfig.groups}
        renderItem={renderGroup}
        where={whereMyGroups}
        orderBy={orderByGroups}
        reloadOnFocus
      />

      <PaginatedList
        style={styles.posts}
        config={HasuraConfig.posts}
        renderItem={renderPost}
        where={whereMyPosts}
        orderBy={orderByPosts}
        reloadOnFocus
        contentInset={{
          top: 0,
          left: 0,
          bottom: bottomTabBarHeight * 2,
          right: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#F2F2F2',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
    marginStart: 16,
    marginEnd: 16,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Medium',
    color: '#444444',
    fontSize: 12,
    textTransform: 'uppercase',
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
    borderRadius: 22,
  },
  listButtonTitle: {
    textTransform: 'uppercase',
    paddingStart: 8,
    color: '#000000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
  },
  listButtonContainer: {
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 12,
  },
});
