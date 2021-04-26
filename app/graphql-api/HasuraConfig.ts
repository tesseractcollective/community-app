import HasuraConfigType from '../react-graphql/support/HasuraConfigType';
import {
  GroupFieldsFragmentDoc,
  PostFieldsFragmentDoc,
  UserGroupFieldsFragmentDoc,
  UserPostReactionFieldsFragmentDoc,
  PostCommentFieldsFragmentDoc,
} from './generated/graphql';

const HasuraConfig: HasuraConfigType = {
  myProfile: {
    typename: 'user',
    primaryKey: ['id'],
    fieldFragment: GroupFieldsFragmentDoc,
  },
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
  postComments: {
    typename: 'postComment',
    primaryKey: ['id'],
    fieldFragment: PostCommentFieldsFragmentDoc,
  },
};

export default HasuraConfig;
