import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';
enableScreens();
import {ThemeProvider} from 'react-native-elements';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import {AppearanceProvider} from 'react-native-appearance';

// Enable react navigation screens before rendering any react-navigation configurations
import {ThemeProvider as CAThemeProvider} from 'components/Theme';
import {LocalizationProvider} from './components/TranslationProvider';
import RootNavigator from './Navigation';
import {UserProvider} from './UserContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <AppearanceProvider>
      <CAThemeProvider>
        <ThemeProvider>
          <LocalizationProvider>
            <UserProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <RootNavigator />
                <Toast ref={(ref) => Toast.setRef(ref)} />
              </SafeAreaProvider>
            </UserProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CAThemeProvider>
    </AppearanceProvider>
  );
}
