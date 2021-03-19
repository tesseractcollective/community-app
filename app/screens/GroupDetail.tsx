import React from 'react';
import {Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {
  MutatorDeleteButton,
  MutatorSaveButton,
  useMutator,
} from '../components/Mutator';
import {usePagination} from '../components/PaginatedList';
import {useTranslations} from '../components/TranslationProvider';
import {Groups, UserGroups, UserGroups_Bool_Exp} from '../graphql';
import HasuraConfig from '../graphql/HasuraConfig';
import {useUserId} from '../UserContext';

export interface GroupDetailRouterProps {
  group: Groups;
}

export default function (props: any) {
  const {group} = props.route.params;

  const translations = useTranslations();
  const where: UserGroups_Bool_Exp = {groupId: {_eq: group.id}};
  const pagination = usePagination<UserGroups>(HasuraConfig.userGroups, where);
  const userId = useUserId();
  
  const myUserGroup = pagination.items?.find((item) => item.userId === userId);

  const {mutator, state} = useMutator<UserGroups>({
    config: HasuraConfig.userGroups,
    variables: {userId, groupId: group.id, id: myUserGroup?.id},
    item: myUserGroup,
    afterMutationCallback: () => { pagination.refresh() },
  });

  return (
    <View>
      <Image source={{uri: group.photoUrl}} />
      <Text>{group.name}</Text>
      <Text>{group.description}</Text>
      {myUserGroup ? (
        <MutatorDeleteButton
          mutator={mutator}
          title={translations.groupsRemoveMe}
        />
      ) : (
        <MutatorSaveButton mutator={mutator} title={translations.groupsAddMe} />
      )}
    </View>
  );
}
