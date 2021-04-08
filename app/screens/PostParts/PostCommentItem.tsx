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

export interface IPostCommentItemProps {
  comment: PostComment;
}

const PostCommentItem: FunctionComponent<IPostCommentItemProps> = function PostCommentItem({
  comment,
}) {
  const userId = useUserId();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const postCommentApi = useReactGraphql(HasuraConfig.postComments);

  //update
  const update = postCommentApi.useUpdate({
    initialVariables: {
      id: comment.id,
    },
  });

  const successCB = useCallback(() => {
    console.log('successCB');
    setIsEditing(false);
    //How to update master list?
    //Best/only idea is to pass something through PaginatedList.renderItem
  }, [isEditing]);

  const {error: UpdateError, success: UpdateSuccess} = useOperationStateHelper(
    update.mutationState,
    {
      successToastMessage: 'Comment updated!',
      errorToastMessage: 'Sorry, We failed to save your changes',
      onSuccess: successCB,
    },
  );
  //delete

  const deleteState = postCommentApi.useDelete({
    initialVariables: {
      id: comment.id,
    },
  });

  const deleteSuccessCB = useCallback((data) => {
    console.log('deleteSuccessCB -> ', data);
    //How to update master list?
  }, []);

  useOperationStateHelper(deleteState.mutationState, {
    successToastMessage: 'Comment removed!',
    errorToastMessage: 'Sorry, We failed to save your changes',
    onSuccess: deleteSuccessCB,
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
