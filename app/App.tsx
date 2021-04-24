import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {ThemeProvider} from 'react-native-elements';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {Appearance, AppearanceProvider} from 'react-native-appearance';
import VersionNumber from 'react-native-version-number';

// Enable react navigation screens before rendering any react-navigation configurations
enableScreens();
import {ThemeProvider as CAThemeProvider, theme} from 'components/theme';
import {LocalizationProvider} from './components/TranslationProvider';
import {RootNavigator} from './Navigation';
import {UserProvider} from './UserContext';
import Toast from 'react-native-toast-message';

const defaultTheme = Appearance.getColorScheme() || 'light';

export default function App() {
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

  return (
    <AppearanceProvider>
      <CAThemeProvider>
        <ThemeProvider>
          <LocalizationProvider>
            <UserProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <StatusBar />
                <RootNavigator theme={currentThemeState} />
                <Toast ref={(ref) => Toast.setRef(ref)} />
              </SafeAreaProvider>
            </UserProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CAThemeProvider>
    </AppearanceProvider>
  );
}
