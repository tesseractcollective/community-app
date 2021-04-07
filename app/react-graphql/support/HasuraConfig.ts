import { HasuraConfigsMapType } from 'types/hasuraConfig';
import { GroupFieldsFragmentDoc, PostFieldsFragmentDoc, UserGroupFieldsFragmentDoc } from './generated/graphql';

const HasuraConfig: HasuraConfigsMapType = {
  groups: {
    typename: 'groups',
    primaryKey: ['id'],
    fieldFragment: GroupFieldsFragmentDoc,
  },
  userGroups: {
    typename: 'userGroups',
    primaryKey: ['id'],
    fieldFragment: UserGroupFieldsFragmentDoc,
  },
  posts: {
    typename: 'posts',
    primaryKey: ['id'],
    fieldFragment: PostFieldsFragmentDoc,
  },
};

export default HasuraConfig;
