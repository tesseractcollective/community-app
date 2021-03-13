import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';

import GroupListItem from '../components/GroupListItem';
import { MutatorInput, MutatorSaveButton, useMutator } from '../components/Mutator';
import PaginatedList from '../components/PaginatedList';
import {useTranslations} from '../components/TranslationProvider';
import {
  Groups,
  AllGroupsDocument,
  Groups_Bool_Exp,
  Groups_Order_By,
  Order_By,
  CreatePostDocument,
  useCreatePostMutation,
  Posts,
} from '../graphql';

const styles = StyleSheet.create({
  groups: {
    height: '100%',
  },
});

export default function () {
  const translations = useTranslations();

  const [searchText, setSearchText] = useState('');

  const groupFilter: Groups_Bool_Exp = {
    _or: [
      {name: {_ilike: `%${searchText}%`}},
      {description: {_ilike: `%${searchText}%`}},
    ],
  };
  const groupOrderBy: Groups_Order_By = {name: Order_By.Asc};
  const renderGroup = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  const { mutator, state } = useMutator<Posts>({ document: CreatePostDocument });
  const [postMutationState, executeMutation] = useCreatePostMutation();
  // executeMutation({});

  mutator.setVariable("body", "my post body");
  mutator.save();
 
  return (
    <>
      <Input
        placeholder={translations.allGroups}
        onChangeText={setSearchText}
      />

      <MutatorInput mutator={mutator} input="body" />
      <MutatorSaveButton mutator={mutator} />

      <PaginatedList
        style={styles.groups}
        document={AllGroupsDocument}
        renderItem={renderGroup}
        where={groupFilter}
        orderBy={groupOrderBy}
      />
    </>
  );
}
