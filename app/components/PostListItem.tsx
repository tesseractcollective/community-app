import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem, Image} from 'react-native-elements';
import {Post} from '../graphql';
import {StyleSheet, Text, View} from 'react-native';

interface PostListItemProps {
  post: Post;
}

export default function (props: PostListItemProps) {
  const navigation = useNavigation();
  const {post} = props;

  const onPress = () => {
    navigation.navigate('PostDetail', {post});
  };

  const fileUrls = post.files?.map((file) => {
    return `https://${file.domain}/?id=${file.id}`;
  }) || [];
  console.log(fileUrls);

  return (
    <ListItem onPress={onPress}>
      {/* {<Avatar source={{uri: post.user.}} />} */}
      <ListItem.Content>
        <View style={styles.authorRow}>
          <Avatar
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            title="JD"
            titleStyle={{fontFamily: 'Montserrat-Bold', fontSize: 11}}
            size="small"
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

        {fileUrls.length > 0 ? (
          <Image
            resizeMode='contain'
            style={styles.image}
            source={{
              uri: fileUrls[0],
            }}
          />
        ) : null}

        
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
    flex: 1,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
    marginStart: 16,
    marginEnd: 16,
  },
  image: {
    flex: 1,
    height: 400,
    width: 400,
    // backgroundColor: 'rgba(0,0,0,0.02)',
  },
});
