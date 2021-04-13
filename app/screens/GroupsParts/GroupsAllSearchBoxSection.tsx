import React, {FunctionComponent} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {useTranslations} from 'components/TranslationProvider';
import {Input, Divider, Text} from 'react-native-elements';
import {View} from 'react-native';

export interface IGroupsAllSearchBoxSectionProps {
  setSearchText: (string) => void;
}

const GroupsAllSearchBoxSection: FunctionComponent<IGroupsAllSearchBoxSectionProps> = function GroupsAllSearchBoxSection({
  setSearchText,
  ...rest
}) {
  const translations = useTranslations();

  return (
    <View style={bs(``)}>
      <Text>{translations.filter}:</Text>
      <Input
        placeholder={translations.groupsAll}
        onChangeText={setSearchText}
        {...rest}
      />
    </View>
  );
};

export default GroupsAllSearchBoxSection;
