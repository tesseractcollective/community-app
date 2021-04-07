import React, { FunctionComponent } from 'react';
import { Client, Provider as UrqlProvider } from 'urql';

export interface IReactHasuraProviderProps {
  client: Client;
}

const ReactHasuraProvider: FunctionComponent<IReactHasuraProviderProps> = function ReactHasuraProvider(props) {
  return <UrqlProvider value={props.client}>{props.children}</UrqlProvider>;
};

export default ReactHasuraProvider;
