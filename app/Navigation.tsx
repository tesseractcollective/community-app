import React, {
  ReactElement,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
  InitialState,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomNavigatorProps} from '@ca/navTypes';
import {AuthenticationNavigator} from '@ca/screens/auth';

import FeatherIcons from 'react-native-vector-icons/Feather';
import {Appearance} from 'react-native-appearance';
import {StatusBar, View} from 'react-native';

import {Box, Text} from 'components/Theme';
import Home from 'screens/Home';
import GroupDetail, {GroupDetailRouterProps} from 'screens/GroupDetail';
import {useTranslations} from 'components/TranslationProvider';
import GroupsAll from 'screens/GroupsAll';
import PostCreate, {PostCreateRouterProps} from 'screens/PostCreate';
import PostDetail, {PostDetailRouterProps} from 'screens/PostDetail';
import Profile from 'screens/Profile';

import {load, save} from './utils';
import {AppRoute} from '@ca/routes';

export const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY`;
const defaultTheme = Appearance.getColorScheme() || 'light';

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
  token: string;
  history?: any;
}

const RootNavigator: React.FC<RootNavParams> = ({
  token,
  history,
}: RootNavParams) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [themeState, setThemeState] = React.useState(defaultTheme);

  const [initialState, setInitialState] = useState<InitialState | undefined>();

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      // console.tron.log("THE COLOR SCHEME", colorScheme)
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await load(NAVIGATION_STATE_KEY);
        const state = savedStateString ? savedStateString : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  const currentThemeState = useMemo(() => ({themeState}), [
    themeState,
    setThemeState,
  ]);
  StatusBar.setBarStyle(
    currentThemeState.themeState === 'dark' ? 'light-content' : 'dark-content',
    true,
  );
  const onStateChange = useCallback(
    (state) => save(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );
  if (!isNavigationReady) {
    return <Box />;
  }
  const screenOptions = useMemo<StackNavigationOptions>(
    () => ({
      headerShown: false,
      safeAreaInsets: {top: 0},
      gestureEnabled: true,
      stackPresentation: 'modal',
    }),
    [],
  );

  return (
    <NavigationContainer {...{onStateChange, initialState}}>
      <StatusBar />
      <Stack.Navigator screenOptions={screenOptions}>
        {token ? (
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
