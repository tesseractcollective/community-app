import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {View, Pressable, TextInput} from 'react-native';
import {Text} from 'react-native-elements';
import {PostComment} from 'graphql-api';
import {useUserId} from '../../UserContext';
import {} from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {MutatorTextInput, MutatorButton} from 'react-graphql/components';
import useOperationStateHelper from 'react-graphql/hooks/useOperationStateHelper';
import {useTranslations} from 'components/TranslationProvider';

export interface IPostCommentItemProps {
  comment: PostComment;
}

const PostCommentItem: FunctionComponent<IPostCommentItemProps> = function PostCommentItem({
  comment,
}) {
  const userId = useUserId();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const translations = useTranslations();

  const postCommentApi = useReactGraphql(HasuraConfig.postComments);

  //update
  const update = postCommentApi.useUpdate({
    initialVariables: {
      id: comment.id,
    },
  });

  const {queryCompleted: updateCompleted} = useOperationStateHelper(
    update.mutationState,
    {
      successToastMessage: translations.postCommentUpdateSuccess,
      errorToastMessage: translations.postCommentUpdateError,
    },
  );
  //delete

  useEffect(() => {
    if (updateCompleted) {
      setIsEditing(false);
    }
  }, [updateCompleted]);

  const deleteState = postCommentApi.useDelete({
    initialVariables: {
      id: comment.id,
    },
  });

  useOperationStateHelper(deleteState.mutationState, {
    successToastMessage: translations.postCommentDeleteSuccess,
    errorToastMessage: translations.postCommentDeleteError,
  });

  return (
    <View style={bs(`bg-white px-mxx py-s mb-sxx`)}>
      <MutatorTextInput
        state={update}
        input="body"
        value={comment.body}
        defaultValue={'Jeremy Test'}
        style={
          isEditing
            ? bs(MutatorTextInput.defaultStyleStr)
            : bs(`p-sxx p-s mb-s`)
        }
        editable={isEditing}
      />
      {isEditing && <MutatorButton state={update} title={'save'} />}
      {userId === comment.userId && (
        <View style={bs(`f-columns`)}>
          <Pressable onPress={() => setIsEditing(!isEditing)}>
            <FeatherIcons name="edit" size={18} />
          </Pressable>
          <Pressable onPress={deleteState.executeMutation}>
            <FeatherIcons name="trash" size={18} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PostCommentItem;
