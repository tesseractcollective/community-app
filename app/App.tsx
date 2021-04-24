import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {ThemeProvider} from 'react-native-elements';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  NavigationContainerRef,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {Appearance, AppearanceProvider} from 'react-native-appearance';
import VersionNumber from 'react-native-version-number';

// Enable react navigation screens before rendering any react-navigation configurations
enableScreens();
import {ThemeProvider as CAThemeProvider} from 'components/theme';
import {LocalizationProvider} from './components/TranslationProvider';
import {RootNavigator} from './Navigation';
import {UserProvider} from './UserContext';
import Toast from 'react-native-toast-message';
import {
  canExit,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from './navUtilities';
import * as storage from './utils';

const defaultTheme = Appearance.getColorScheme() || 'light';
const NAVIGATION_PERSISTENCE_KEY = `NAVIGATION_STATE_KEY-${VersionNumber}`;

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigationRef = React.useRef<NavigationContainerRef>();
  const [themeState, setThemeState] = React.useState(defaultTheme);

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      // console.tron.log("THE COLOR SCHEME", colorScheme)
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);
  const currentThemeState = React.useMemo(() => ({themeState}), [
    themeState,
    setThemeState,
  ]);
  StatusBar.setBarStyle(
    currentThemeState.themeState === 'dark' ? 'light-content' : 'dark-content',
    true,
  );

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);

  const {onNavigationStateChange} = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  );

  const navigatorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // prevent layout blinking when performing navigation
      background: 'white',
      border: 'transparent',
      card: 'white',
    },
  };
  return (
    <CAThemeProvider>
      <ThemeProvider>
        <LocalizationProvider>
          <UserProvider>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <StatusBar />
              <RootNavigator
                ref={navigationRef}
                initialState={navHistory}
                onStateChange={onNavigationStateChange}
                theme={
                  currentThemeState.themeState === 'dark'
                    ? DarkTheme
                    : navigatorTheme
                }
              />
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </SafeAreaProvider>
          </UserProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CAThemeProvider>
  );
}
