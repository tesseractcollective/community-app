import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem, Image} from 'react-native-elements';
import {Post} from 'graphql-api';
import {StyleSheet, Text, View} from 'react-native';
import {useAuthToken} from '../UserContext';
import {urlForFile} from '../fileApi/fileApi';

interface PostListItemProps {
  post: Post;
}

export default function (props: PostListItemProps) {
  const {post} = props;

  const navigation = useNavigation();
  const authToken = useAuthToken();

  const onPress = () => {
    navigation.navigate('PostDetail', {post});
  };

  return (
    <ListItem onPress={onPress} containerStyle={{paddingHorizontal: 0}}>
      <ListItem.Content>
        <View style={{ paddingHorizontal: 14 }}>
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
          <View style={styles.postTextRow}>
            <Text style={styles.bodyText}>{post.body ?? 'John Doe'}</Text>
          </View>
        </View>

        {post.files.map((file) => (
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
  postTextRow: {
    marginTop: 8,
    marginBottom: 16,
    width: '100%'
    // flexDirection: 'row',
    // flexWrap:'wrap',
    // flex: 1,
    // alignItems: 'flex-start',    
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
    lineHeight: 14*1.4
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
