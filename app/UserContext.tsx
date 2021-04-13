import React, {createContext, useContext, useEffect, useState} from 'react';
import {createClient, Provider as UrqlProvider} from 'urql';
import jwtDecode from 'jwt-decode';

import Login from './screens/Login';
import constants from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserContextType {
  userId: string;
  token: string;
  setToken: (token: string | undefined) => void;
}

export const UserContext = createContext<UserContextType>({
  userId: '',
  token: '',
  setToken: () => {},
});

export const useUserId = () => {
  return useContext(UserContext).userId;
};

export const useAuthToken = () => {
  return useContext(UserContext).token;
};

export const UserProvider = ({children}: any) => {
  const [userId, setUserId] = useState<string>('');
  const [token, _setToken] = useState<string | undefined>(undefined);

  console.log(`token`, token);

  const setToken = (newToken: string | undefined) => {
    AsyncStorage.setItem('user_token', newToken || '');
    _setToken(newToken);
  };

  useEffect(() => {
    (async () => {
      const tkn = await AsyncStorage.getItem('user_token');
      if (tkn) {
        _setToken(tkn);
      }
    })();
  }, []);

  const client = createClient({
    url: constants.graphqlUrl,
    fetchOptions: () => {
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
          'X-Hasura-Role': 'user',
        },
      };
    },
  });

  useEffect(() => {
    if (token) {
      const jwtData = jwtDecode<{[key: string]: any}>(token);
      const claims = jwtData[constants.jwtClaimsKey];
      setUserId(claims['x-hasura-user-id']);
    }
  }, [token]);

  const userContextValue = {userId, token: token || '', setToken};

  if (userId && token) {
    return (
      <UrqlProvider value={client}>
        <UserContext.Provider value={userContextValue}>
          {children}
        </UserContext.Provider>
      </UrqlProvider>
    );
  }

  return (
    <UrqlProvider value={client}>
      <UserContext.Provider value={userContextValue}>
        <Login setToken={setToken} />
      </UserContext.Provider>
    </UrqlProvider>
  );
};
