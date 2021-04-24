import React, {useState, useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';

import {
  PartialState,
  NavigationState,
  NavigationContainerRef,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import {Text, useTheme} from 'components/Theme';
import {Value} from 'react-native-reanimated';

export const RootNavigation = {
  navigate(name: string) {
    name; // eslint-disable-line no-unused-expressions
  },
  goBack() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  resetRoot(state?: PartialState<NavigationState> | NavigationState) {}, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getRootState(): NavigationState {
    return {} as any;
  },
};

export const setRootNavigation = (
  ref: React.RefObject<NavigationContainerRef>,
) => {
  for (const method in RootNavigation) {
    RootNavigation[method] = (...args: any) => {
      if (ref.current) {
        // console.tron.log("THE REF CURRENT", ref.current)
        return ref.current[method](...args);
      }
    };
  }
};

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
) {
  const route = state.routes[state.index];

  // Found the active route -- return the name
  if (!route.state) return route.name;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}

export const defaultScreenOptions = ({route, props}) => ({
  screenOptions: {
    headerShown: true,
    gestureEnabled: false,
    stackPresentation: 'push',
    headerStyle: {backgroundColor: '#ccc'},
    headerHideShadow: false,
    headerTopInsetEnabled: false,
    headerTintColor: 'black',
    headerTitleStyle: () => (
      <Text color={'text'} variant={'header'}>
        {route.params.name}
      </Text>
    ),
  },
});

export const defaultNavigatorOptions = {
  headerShown: true,
  gestureEnabled: false,
  stackPresentation: 'push',
  headerStyle: {backgroundColor: '#ccc'},
  headerHideShadow: false,
  headerTopInsetEnabled: false,
  headerTintColor: 'purple',
};

const transitionPosition = new Value(0);

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(
  ref: React.RefObject<NavigationContainerRef>,
  canExit: (routeName: string) => boolean,
) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      const navigation = ref.current;

      if (navigation == null) {
        return false;
      }

      // grab the current route
      const routeName = getActiveRouteName(navigation.getRootState());

      // are we allowed to exit?
      if (canExitRef.current(routeName)) {
        // let the system know we've not handled this event
        return false;
      }

      // we can't exit, so let's turn this into a back action
      if (navigation.canGoBack()) {
        navigation.goBack();

        return true;
      }

      return false;
    };

    // Subscribe when we come to life
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Unsubscribe when we're done
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [ref]);
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(
    true,
  );

  const routeNameRef = useRef();
  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    console.log(
      'THE onNavigationStateChange -> ',
      previousRouteName,
      currentRouteName,
    );

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.tron.log(currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;

    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  // const restoreState = async () => {
  //   try {
  //     const state = await storage.load(persistenceKey)
  //     if (state) setInitialNavigationState(state)
  //   } finally {
  //     setIsRestoringNavigationState(false)
  //   }
  // }

  // useEffect(() => {
  //   if (isRestoringNavigationState) restoreState()
  // }, [isRestoringNavigationState])

  return {onNavigationStateChange, initialNavigationState};
}

// /**
//  * Handle a navigation action or queue the action if navigation actions have been paused.
//  * @param  {Object} action      The navigation action to run.
//  */
// function handleAction(name, params, replace = false) {
//   if (!TopLevelNavigationRef) return
//   const action = (replace ? StackActions.replace : CommonActions.navigate)(name, params)
//   TopLevelNavigationRef?.dispatch(action)
// }
// /**
//  * Set Top Level Navigator
//  */
// function setTopLevelNavigator(navigatorRef) {
//   TopLevelNavigationRef = navigatorRef
// }
// function getActiveOptions() {
//   return TopLevelNavigationRef?.getCurrentOptions()
// }

// Add route name wherein it is acceptable to exit the app
const exitRoutes = ['welcome'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);

export default {
  getActiveRouteName,
  defaultNavigatorOptions,
  defaultScreenOptions,
  transitionPosition,
  canExit,
};
