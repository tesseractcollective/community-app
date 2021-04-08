import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {View} from 'react-native';

import Home from './screens/Home';
import GroupDetail, {GroupDetailRouterProps} from './screens/GroupDetail';
import {useTranslations} from './components/TranslationProvider';
import GroupsAll from './screens/GroupsAll';
import PostCreate, {PostCreateRouterProps} from './screens/PostCreate';
import PostDetail, {PostDetailRouterProps} from './screens/PostDetail';
import Profile from 'screens/Profile';

type HomeStackParams = {
  Home: undefined;
  GroupDetail: GroupDetailRouterProps;
  GroupsAll: undefined;
  PostCreate: PostCreateRouterProps;
  PostDetail: PostDetailRouterProps;
};

const MainTabs = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator<HomeStackParams>();

function HomeStackNavigator() {
  const translations = useTranslations();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{title: translations.homeTabTitle}}
      />
      <HomeStack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={({route}) => ({title: route.params.group.name})}
      />
      <HomeStack.Screen
        name="GroupsAll"
        component={GroupsAll}
        options={{title: translations.groupsAll}}
      />
      <HomeStack.Screen name="PostDetail" component={PostDetail} />
      <HomeStack.Screen
        name="PostCreate"
        component={PostCreate}
        options={{title: translations.postCreate}}
      />
    </HomeStack.Navigator>
  );
}

function ProfileStackNavigator() {
  const translations = useTranslations();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{title: translations.profileTabTitle}}
      />
    </ProfileStack.Navigator>
  );
}

export default () => {
  const translations = useTranslations();

  return (
    <NavigationContainer>
      <MainTabs.Navigator>
        <MainTabs.Screen
          name="HomeStackNavigator"
          component={HomeStackNavigator}
          options={{
            title: translations.homeTabTitle,
            tabBarIcon: (props) => {
              return <FeatherIcons name="home" {...props} />;
            },
          }}
        />
        <MainTabs.Screen
          name="ProfileStackNavigator"
          component={ProfileStackNavigator}
          options={{
            title: translations.profileTabTitle,
            tabBarIcon: (props) => {
              return <FeatherIcons name="user" {...props} />;
            },
          }}
        />
      </MainTabs.Navigator>
    </NavigationContainer>
  );
};
