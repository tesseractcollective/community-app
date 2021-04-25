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
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {StatusBar, View} from 'react-native';

import {Text} from 'components/Theme';
import Home from 'screens/Home';
import GroupDetail, {GroupDetailRouterProps} from 'screens/GroupDetail';
import {useTranslations} from 'components/TranslationProvider';
import GroupsAll from 'screens/GroupsAll';
import PostCreate, {PostCreateRouterProps} from 'screens/PostCreate';
import PostDetail, {PostDetailRouterProps} from 'screens/PostDetail';
import Profile from 'screens/Profile';

import {Appearance} from 'react-native-appearance';

import {load, save} from './utils';

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY`;
const defaultTheme = Appearance.getColorScheme() || 'light';

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

// export const RootNavigator = React.forwardRef<
//   NavProps,
//   Partial<React.ComponentProps<typeof NavigationContainer>>
// >((props, ref) => {
//   const translations = useTranslations();
//   const navigationRef = React.useRef<NavigationContainerRef>();
//
//   setRootNavigation(navigationRef);
//   useBackButtonHandler(navigationRef, canExit);
//
//   const {onNavigationStateChange} = useNavigationPersistence(
//     storage,
//     NAVIGATION_PERSISTENCE_KEY,
//   );
//
//   const navigatorTheme = {
//     ...DefaultTheme,
//     colors: {
//       ...DefaultTheme.colors,
//       // prevent layout blinking when performing navigation
//       background: 'white',
//       border: 'transparent',
//       card: 'white',
//     },
//   };
//
//   return (
//     <NavigationContainer
//       theme={props.theme.themeState === 'dark' ? DarkTheme : navigatorTheme}
//       ref={ref}>
//       <MainTabs.Navigator>
//         <MainTabs.Screen
//           name="HomeStackNavigator"
//           component={HomeStackNavigator}
//           options={{
//             title: translations.homeTabTitle,
//             tabBarIcon: (props) => {
//               return <FeatherIcons name="home" {...props} />;
//             },
//           }}
//         />
//         <MainTabs.Screen
//           name="ProfileStackNavigator"
//           component={ProfileStackNavigator}
//           options={{
//             title: translations.profileTabTitle,
//             tabBarIcon: (props) => {
//               return <FeatherIcons name="user" {...props} />;
//             },
//           }}
//         />
//       </MainTabs.Navigator>
//     </NavigationContainer>
//   );
// });

const RootNavigator = () => {
  const translations = useTranslations();
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
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer {...{onStateChange, initialState}}>
      <StatusBar />
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

export default RootNavigator;
