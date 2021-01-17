import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';

import Login, {User} from './screens/Login';
import Home from './screens/Home';
import {
  LocalizationProvider,
  useTranslations,
} from './components/TranslationProvider';
import {QueryClient, QueryClientProvider} from 'react-query';

interface UserContextType {
  user?: User;
  setUser: (user: User) => void;
}

const LoginStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const defaultUserContext = {user: undefined, setUser: (user: User) => {}};
export const UserContext = React.createContext<UserContextType>(
  defaultUserContext,
);

function HomeStackNavigator() {
  const translations = useTranslations();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{title: translations.homeTabTitle}}
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
        component={View}
        options={{title: translations.profileTabTitle}}
      />
    </ProfileStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const translations = useTranslations();
  const queryClient = new QueryClient();

  return (
    <LocalizationProvider>
      <UserContext.Provider value={{user, setUser}}>
        <QueryClientProvider client={queryClient} >
          <NavigationContainer>
            {user ? (
              <MainTabs.Navigator>
                <MainTabs.Screen
                  name="HomeStackNavigator"
                  component={HomeStackNavigator}
                  options={{
                    title: translations.homeTabTitle,
                    tabBarIcon: () => {
                      return <FeatherIcons name="home" />;
                    },
                  }}
                />
                <MainTabs.Screen
                  name="ProfileStackNavigator"
                  component={ProfileStackNavigator}
                  options={{
                    title: translations.profileTabTitle,
                    tabBarIcon: () => {
                      return <FeatherIcons name="user" />;
                    },
                  }}
                />
              </MainTabs.Navigator>
            ) : (
              <LoginStack.Navigator>
                <LoginStack.Screen name="Login" component={Login} />
                <LoginStack.Screen name="Register" component={View} />
              </LoginStack.Navigator>
            )}
          </NavigationContainer>
        </QueryClientProvider>
      </UserContext.Provider>
    </LocalizationProvider>
  );
}
