import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem, Image} from 'react-native-elements';
import {Post, Reaction_Enum} from 'graphql-api';
import {StyleSheet, Text, View} from 'react-native';
import {useAuthToken, useUserId} from '../UserContext';
import {urlForFile} from '../fileApi/fileApi';
import Reaction from './Reaction';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {useTranslations} from './TranslationProvider';

interface PostListItemProps {
  post: Post;
}

export default function (props: PostListItemProps) {
  const {post} = props;

  const userId = useUserId();
  const translations = useTranslations();
  const navigation = useNavigation();
  const authToken = useAuthToken();
  const [reactionToggle, setReactionToggle] = useState(post.userPostReactions.length > 0);
  const [reactionCount, setReactionCount] = useState(post.userPostReactions_aggregate.aggregate?.count || 0);

  const reactGraphql = useReactGraphql(HasuraConfig.userPostReactions);

  const {
    executeMutation: insertReaction,
  } = reactGraphql.useInsert({ initialVariables: { postId: post.id }});

  const {executeMutation: deleteReaction} = reactGraphql.useDelete({
    variables: {
      postId: post.id,
      userId,
    },
  });

  const onPress = () => {
    navigation.navigate('PostDetail', {post});
  };



  if (!post) {
    return (
      <View>
        <Text>{translations.postInvalid}</Text>
      </View>
    );
  }

  return (
    <ListItem onPress={onPress} containerStyle={{paddingHorizontal: 0}}>
      <ListItem.Content>
        <View style={{paddingHorizontal: 14}}>
          <View style={styles.authorRow}>
            <Avatar
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              title="JD"
              titleStyle={{fontFamily: 'Montserrat-Bold', fontSize: 14}}
              size="medium"
              overlayContainerStyle={{backgroundColor: 'gray'}}
            />
            <View style={styles.textContainer}>
              <Text style={styles.authorNameText}>
                {post.user?.name ?? 'John Doe'}
              </Text>
              <Text style={styles.groupNameText}>
                {post.group?.name ?? 'The Litas'}
              </Text>
            </View>
          </View>

          <View style={styles.authorRow}>
            <Text style={styles.bodyText}>{post.body ?? 'John Doe'}</Text>
          </View>
        </View>

        {post.files?.map((file) => (
          <Image
            key={file.id}
            style={{
              ...styles.image,
              aspectRatio: file.meta?.image?.aspectRatio || 1,
            }}
            source={{
              uri: urlForFile(file, authToken),
            }}
          />
        ))}
        <Reaction
          count={reactionCount}
          hasCurrentUserReacted={reactionToggle}
          reactionType={Reaction_Enum.Like}
          toggleReaction={() => {
            if (reactionToggle) {
              deleteReaction();
              setReactionCount(reactionCount - 1);
            } else {
              insertReaction({reaction: Reaction_Enum.Like});
              setReactionCount(reactionCount + 1);
            }
            setReactionToggle(!reactionToggle);
          }}
        />
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  authorRow: {
    // backgroundColor: '#F2F2F2',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  textContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  authorNameText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  bodyText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  groupNameText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
