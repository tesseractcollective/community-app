import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {View} from 'react-native';

import Home from './screens/Home';
import GroupDetail from './screens/GroupDetail';
import {Groups} from './graphql';
import {useTranslations} from './components/TranslationProvider';

type HomeStackParams = {
  Home: undefined;
  GroupDetail: {
    group: Groups;
  };
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
    </HomeStack.Navigator>
  );
}

function ProfileStackNavigator() {
  const translations = useTranslations();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={View}
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
              tabBarIcon: () => {
                return <FeatherIcons name="home" />;
              },
            }}
          />
          <MainTabs.Screen
            name="ProfileStackNavigator"
            component={ProfileStackNavigator}
            options={{
              title: translations.profileTabTitle,
              tabBarIcon: () => {
                return <FeatherIcons name="user" />;
              },
            }}
          />
        </MainTabs.Navigator>
    </NavigationContainer>
  );
};