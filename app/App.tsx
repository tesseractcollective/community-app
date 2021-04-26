import 'react-native-gesture-handler';
import React, {useMemo} from 'react';
import {enableScreens} from 'react-native-screens';
enableScreens();
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Appearance, AppearanceProvider} from 'react-native-appearance';

// Enable react navigation screens before rendering any react-navigation configurations
import {ThemeProvider as CAThemeProvider} from '@shopify/restyle';
import {LocalizationProvider} from './components/TranslationProvider';
import RootNavigator, {NAVIGATION_STATE_KEY} from './navigation/Navigation';
import {UserProvider} from './UserContext';
import {AppLoading, Task} from 'components/LoadApp';

import {load, getToken} from './utils';
import {StatusBar} from 'react-native';
import {theme as caTheme, darkTheme, Box, Text} from './components/Theme';

const loadingTasks: Task[] = [
  () => load(NAVIGATION_STATE_KEY).then((result) => ['navHistory', result]),
  () => getToken().then((result) => ['userToken', result]),
];

const defaultConfig: {
  navHistory: any;
  userToken: string;
} = {
  navHistory: {},
  userToken: '',
};

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

const defaultTheme = Appearance.getColorScheme() || 'light';

// We can probably pull out userToken because we are checking  for the token in the user provider, but
// it may also be helpful to get the token before loading the App
const App = ({navHistory, userToken}): React.ReactElement => {
  // console.log('THE USER TOKEN', userToken);
  // console.log('THE NAV HISTORY', navHistory);

  const [themeState, setThemeState] = React.useState(defaultTheme);

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      // console.tron.log("THE COLOR SCHEME", colorScheme)
      setThemeState(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const currentThemeState = useMemo(() => ({themeState}), [
    themeState,
    setThemeState,
  ]);
  StatusBar.setBarStyle(
    currentThemeState.themeState === 'dark' ? 'light-content' : 'dark-content',
    true,
  );
  return (
    <AppearanceProvider>
      <CAThemeProvider
        theme={currentThemeState.themeState === 'dark' ? darkTheme : caTheme}>
        <ThemeProvider>
          <LocalizationProvider>
            <UserProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                {/*<Box flex={1} backgroundColor={'primary'}>*/}
                {/*  <Text>HELLO APP</Text>*/}
                {/*</Box>*/}
                <RootNavigator
                  history={navHistory}
                  token={userToken}
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
    </AppearanceProvider>
  );
};

export default (): React.ReactElement => (
  <AppLoading tasks={loadingTasks} initialConfig={defaultConfig}>
    {(props) => <App {...props} />}
  </AppLoading>
);
