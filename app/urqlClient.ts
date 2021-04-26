import {
  createClient,
  dedupExchange,
  subscriptionExchange,
  cacheExchange,
  fetchExchange,
  Client,
} from 'urql';
import {devtoolsExchange} from '@urql/devtools';
import {makeOperation} from '@urql/core';
import {authExchange} from '@urql/exchange-auth';
// import {multipartFetchExchange} from '@urql/exchange-multipart-fetch';
// import {SubscriptionClient} from 'subscriptions-transport-ws';
import {getToken, saveString, getRefreshToken} from './utils/storage';
import constants from './config';

const clientCache: {[index: string]: Client} = {};

export default function userClient(): Client {
  if (!clientCache[0]) {
    console.log('NO CLIENT CACHE FOUND SO SETTING UP URQL');
    const client = createClient({
      url: constants.graphqlUrl,
      requestPolicy: 'network-only',
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange,
        authExchange({
          addAuthToOperation: ({authState, operation}) => {
            // the token isn't in the auth state, return the operation without changes
            // console.log("THE AUTH STATE", authState)

            // @ts-ignore
            if (!authState || !authState.token) {
              // console.log("NO AUTH STATE OR TOKEN FOUND RETURNING OPERATION", operation)
              return operation;
            }

            // fetchOptions can be a function (See Client API) but you can simplify this based on usage
            const fetchOptions =
              typeof operation.context.fetchOptions === 'function'
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: authState.token
                    ? `Bearer ${authState.token}`
                    : '',
                },
              },
            });
          },
          willAuthError: ({authState}) => {
            if (!authState) return true;
            // e.g. check for expiration, existence of auth etc
            return false;
          },
          didAuthError: ({error}) => {
            // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
            return error.graphQLErrors.some(
              (e) => e.extensions?.code === 'FORBIDDEN',
            );
          },
          getAuth: async ({authState, mutate}) => {
            // for initial launch, fetch the auth state from storage (local storage, async storage etc)

            if (!authState) {
              const token = plainObjectRootStore[0].userStore.jwt
                ? plainObjectRootStore[0].userStore.jwt
                : await getToken();
              const refreshToken = plainObjectRootStore[0].userStore.jwt
                ? plainObjectRootStore[0].userStore.jwt
                : await getRefreshToken();
              // console.tron.log("NO AUTH STATE SO LOOKING FOR TOKEN IN STORAGE")

              if (token && refreshToken) {
                // console.tron.log("FOUND AUTH AND REFRESH TOKEN", token, refreshToken)
                // authStore.setUserIsAuthenticated(true)
                // globalStore.setAppLoaded(true)

                return {token, refreshToken};
              }
              if (!token && refreshToken) {
                console.tron.log('NO TOKEN FOUND ATTEMPTING REFRESH');
                /**
                 * If no auth token is found
                 * we should refresh the token if possible and return a new auth state
                 * If refresh fails, we should log out
                 **/

                const refreshMutation = '';
                //TODO: Jeremy enaable refresh logic on auth server and add mutation here
                // if your refresh logic is in graphQL, you must use this mutate function to call it

                const result = await mutate(refreshMutation, {
                  token: authState!.refreshToken,
                });

                if (result.data?.refreshLogin) {
                  // save the new tokens in storage for next restart
                  console.tron.log('SAVING AUTH AND REFRESH TOKEN');

                  saveString('JWT', result.data.refreshLogin.token);
                  saveString(
                    'REFRESH_TOKEN',
                    result.data.refreshLogin.refreshToken,
                  );
                  // return the new tokens
                  return {
                    token: result.data.refreshLogin.token,
                    refreshToken: result.data.refreshLogin.refreshToken,
                  };
                }
              } else if (!token && !refreshToken) {
                console.tron.log(
                  'EVERYTHING FAILED BURNING DOWN THE HOUSE AND LOGGING OUT',
                  plainObjectRootStore[0],
                );
                // authStore.setUserIsAuthenticated(false)
                // globalStore.setAppLoaded(true)

                // otherwise, if refresh fails, log clear storage and log out
                // clear();

                // your app logout logic should trigger here
                logOut();
                return null;
              }
            }

            return authState;
          },
        }),
        subscriptionExchange({
          forwardSubscription(operation) {
            return subscriptionClient.request(operation);
          },
        }),

        // persistedFetchExchange({
        //   generateHash: async query => {
        //     return sha256.update(query).digest()
        //   },
        //   preferGetForPersistedQueries: true,
        // }),
        multipartFetchExchange,
        fetchExchange,
      ],
    });
    clientCache[0] = client;
  }

  return clientCache[0];
}
