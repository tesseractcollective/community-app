import 'react-native-gesture-handler';
import React from 'react';
import {enableScreens} from 'react-native-screens';
enableScreens();
import {ThemeProvider} from 'react-native-elements';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {AppearanceProvider} from 'react-native-appearance';

// Enable react navigation screens before rendering any react-navigation configurations
import {ThemeProvider as CAThemeProvider} from 'components/Theme';
import {LocalizationProvider} from './components/TranslationProvider';
import RootNavigator, {NAVIGATION_STATE_KEY} from './Navigation';
import {UserProvider} from './UserContext';
import {AppLoading, Task} from 'components/LoadApp';

import {load, getToken} from './utils';

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

// We can probably pull out userToken because we are checking  for the token in the user provider, but
// it may also be helpful to get the token before loading the App
const App = ({navHistory, userToken}): React.ReactElement => {
  // console.log('THE USER TOKEN', userToken);
  // console.log('THE NAV HISTORY', navHistory);
  return (
    <AppearanceProvider>
      <CAThemeProvider>
        <ThemeProvider>
          <LocalizationProvider>
            <UserProvider>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <RootNavigator history={navHistory} />
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
