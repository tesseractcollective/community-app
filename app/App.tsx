import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Login, { User } from './Screens/Login/Login';

interface UserContextType {
  user?: User;
  setUser: (user: User) => void;
}

const LoginStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const defaultUserContext = { user: undefined, setUser: (user: User) => {} };
export const UserContext = React.createContext<UserContextType>(defaultUserContext);

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={View} />
    </HomeStack.Navigator>
  )
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={View} />
    </ProfileStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = React.useState<User|undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? (
          <MainTabs.Navigator>
            <MainTabs.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
            <MainTabs.Screen name="ProfileStackNavigator" component={ProfileStackNavigator} />
          </MainTabs.Navigator>
        )
        : (
          <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={Login} />
            <LoginStack.Screen name="Register" component={View} />
          </LoginStack.Navigator>
        )}
      </NavigationContainer>
    </UserContext.Provider>

  );
}
