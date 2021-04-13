import 'react-native-gesture-handler';
import React from 'react';
import {ThemeProvider} from 'react-native-elements';

import {LocalizationProvider} from './components/TranslationProvider';
import Navigation from './Navigation';
import {UserProvider} from './UserContext';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <UserProvider>
          <Navigation />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
