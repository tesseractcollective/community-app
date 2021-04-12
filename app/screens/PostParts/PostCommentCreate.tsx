import React, {FunctionComponent, useEffect} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {View} from 'react-native';
import {MutatorButton, MutatorTextInput} from 'react-graphql/components';
import HasuraConfig from 'graphql-api/HasuraConfig';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import {useTranslations} from 'components/TranslationProvider';
import {Text} from 'react-native-elements';
import useOperationStateHelper from 'react-graphql/hooks/useOperationStateHelper';

export interface IPostCommentCreateProps {
  postId: number;
}

const PostCommentCreate: FunctionComponent<IPostCommentCreateProps> = function PostCommentCreate(
  props,
) {
  const translations = useTranslations();
  const insert = useReactGraphql(HasuraConfig.postComments).useInsert({
    initialVariables: {postId: props.postId},
  });

  const {queryCompleted} = useOperationStateHelper(insert.mutationState, {
    successToastMessage: 'Comment added!',
    errorToastMessage: 'Sorry, We failed to save your post',
  });

  return (
    <View style={bs(`px-mxx py-s`)}>
      <Text>Add a comment</Text>
      <MutatorTextInput
        state={insert}
        input="body"
        clearState={queryCompleted}
      />
      <MutatorButton state={insert} title={translations.save} />
    </View>
  );
};

export default PostCommentCreate;
