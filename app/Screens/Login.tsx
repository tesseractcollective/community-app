import * as React from 'react';
import { Button } from 'react-native';

import { UserContext } from '../../App';

export interface User {
  name: string;
}

export default function() {
  const { setUser } = React.useContext(UserContext)

  return (
    <Button onPress={() => { setUser({ name: 'test' })}} title="Login" />
  )
}