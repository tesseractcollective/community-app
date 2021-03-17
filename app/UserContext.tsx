import React, {createContext, useContext, useEffect, useState} from 'react';
import {createClient, Provider as UrqlProvider, useQuery} from 'urql';
import jwtDecode from 'jwt-decode';

import Login from './screens/Login';
import constants from './config';

export interface UserContextType {
  userId: string;
  setToken: (token: string | undefined) => void;
}

export const UserContext = createContext<UserContextType>({ 
  userId: "",
  setToken: () => {},
});

export const useUserId = () => {
  return useContext(UserContext).userId;
}

export const UserProvider = ({children}: any) => {
  const [userId, setUserId] = useState<string>("");
  const [token, setToken] = useState<string | undefined>(undefined);

  const client = createClient({
    url: constants.graphqlUrl,
    fetchOptions: () => {
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
          "Content-Type": "application/json",
        },
      };
    },
  });

  useEffect(() => {
    if (token) {
      const jwtData = jwtDecode<{ [key: string] : any }>(token);
      const claims = jwtData[constants.jwtClaimsKey];
      setUserId(claims['x-hasura-user-id']);
    }
  }, [token]);

  const userContextValue = { userId, setToken };

  if (userId) {
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
        <Login />
      </UserContext.Provider>
    </UrqlProvider>
  );
}
