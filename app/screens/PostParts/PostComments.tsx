import React, {FunctionComponent} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {View} from 'react-native';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {
  PostComment_Bool_Exp,
  PostComment_Order_By,
  Order_By,
  PostComment,
} from 'graphql-api';
import {PaginatedList} from 'react-graphql/components';
import PostCommentItem from './PostCommentItem';

export interface IPostCommentsProps {
  postId: number;
}

const PostComments: FunctionComponent<IPostCommentsProps> = function PostComments({
  postId,
}) {
  return (
    <View style={bs(`px-mxx py-s f-1`)}>
      <PaginatedList
        style={bs(``)}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        pullToRefresh={false}
        config={HasuraConfig.postComments}
        renderItem={({item}) => <PostCommentItem comment={item} />}
        where={
          {
            postId: {
              _eq: postId,
            },
          } as PostComment_Bool_Exp
        }
        orderBy={[
          {
            createdAt: Order_By.DescNullsLast,
          } as PostComment_Order_By,
        ]}
        reloadOnFocus
      />
    </View>
  );
};

export default PostComments;
