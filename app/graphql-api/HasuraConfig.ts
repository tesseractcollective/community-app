import HasuraConfigType from './HasuraConfigType';
import {
  GroupFieldsFragmentDoc,
  PostFieldsFragmentDoc,
  UserGroupFieldsFragmentDoc,
  UserPostReactionFieldsFragmentDoc,
} from './generated/graphql';

const HasuraConfig: HasuraConfigType = {
  groups: {
    typename: 'group',
    primaryKey: ['id'],
    fieldFragment: GroupFieldsFragmentDoc,
  },
  userGroups: {
    typename: 'userGroup',
    primaryKey: ['userId', 'groupId'],
    fieldFragment: UserGroupFieldsFragmentDoc,
  },
  posts: {
    typename: 'post',
    primaryKey: ['id'],
    fieldFragment: PostFieldsFragmentDoc,
  },
  userPostReactions: {
    typename: 'userPostReaction',
    primaryKey: ['userId', 'postId'],
    fieldFragment: UserPostReactionFieldsFragmentDoc,
  },
};

export default HasuraConfig;
