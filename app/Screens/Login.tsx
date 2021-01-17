import * as React from 'react';
import {Button} from 'react-native';

import {UserContext} from '../App';
import {useTranslations} from '../components/TranslationProvider';

export interface User {
  name: string;
}

export default function () {
  const {setUser} = React.useContext(UserContext);
  const translations = useTranslations();

  return (
    <Button
      onPress={() => {
        setUser({name: 'test'});
      }}
      title={translations.loginButtonText}
    />
  );
}
