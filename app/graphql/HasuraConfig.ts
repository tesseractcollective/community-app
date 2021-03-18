import HasuraConfigType from './HasuraConfigType';
import {
  GroupFieldsFragmentDoc,
  PostFieldsFragmentDoc,
  UserGroupFieldsFragmentDoc,
} from './generated/graphql';

const HasuraConfig: HasuraConfigType = {
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
