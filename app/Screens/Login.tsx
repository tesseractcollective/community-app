import React, {useContext} from 'react';
import {Button} from 'react-native-elements';

import {UserContext} from '../App';
import {useTranslations} from '../components/TranslationProvider';

export interface User {
  name: string;
}

export default function () {
  const {setUser} = useContext(UserContext);
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
