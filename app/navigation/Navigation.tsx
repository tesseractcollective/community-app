import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  InitialState,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomNavigatorProps} from 'navTypes';
import {AppRoute} from 'navRoutes';

import FeatherIcons from 'react-native-vector-icons/Feather';
import {StatusBar} from 'react-native';
import {useUserUtils} from '../UserContext';

import {Box, Text} from 'components/Theme';
import Home from 'screens/Home';
import GroupDetail, {GroupDetailRouterProps} from 'screens/GroupDetail';
import {useTranslations} from 'components/TranslationProvider';
import GroupsAll from 'screens/GroupsAll';
import PostCreate, {PostCreateRouterProps} from 'screens/PostCreate';
import PostDetail, {PostDetailRouterProps} from 'screens/PostDetail';
import Profile from 'screens/Profile';

import {load, save} from '../utils';
import {AuthenticationNavigator} from 'screens/Auth';
import {Appearance} from 'react-native-appearance';
export const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY`;

type HomeStackParams = {
  Home: undefined;
  GroupDetail: GroupDetailRouterProps;
  GroupsAll: undefined;
  PostCreate: PostCreateRouterProps;
  PostDetail: PostDetailRouterProps;
};

export type RootParamList = {
  [AppRoute.MAIN]: undefined;
  [AppRoute.AUTH_FLOW]: undefined;
};
const Stack = createStackNavigator<RootParamList>();
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

const BottomTabNav: React.FC<MainBottomNavigatorProps<AppRoute.HOME>> = (
  props,
) => {
  const translations = useTranslations();

  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name={AppRoute.HOME_STACK_NAVIGATOR}
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
  );
};

interface RootNavParams {
  topLevelToken: string;
  history?: any;
  theme: Theme;
}

const RootNavigator: React.FC<RootNavParams> = (
  {topLevelToken}: RootNavParams,
  props,
) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);

  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const {userId, token} = useUserUtils();

  React.useEffect(() => {
    console.log('THE USER ID IN NAVIGATION', userId);
    console.log('THE USER TOKEN IN NAVIGATION', token);
  }, [userId, token]);

  const onStateChange = useCallback(
    (state) => save(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );

  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      headerShown: false,
      safeAreaInsets: {top: 0},
      gestureEnabled: true,
      stackPresentation: 'modal',
    }),
    [],
  );

  // if (!isNavigationReady) {
  //   return <Box />;
  // }
  return (
    <NavigationContainer {...{onStateChange, initialState, props}}>
      <StatusBar />
      <Stack.Navigator screenOptions={screenOptions}>
        {token || topLevelToken ? (
          <Stack.Screen name={AppRoute.MAIN} component={BottomTabNav} />
        ) : (
          <Stack.Screen
            name={AppRoute.AUTH_FLOW}
            component={AuthenticationNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
