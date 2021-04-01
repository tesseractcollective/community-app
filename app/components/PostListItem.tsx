import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem, Image} from 'react-native-elements';
import { Posts } from '../graphql';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

interface PostListItemProps {
  post: Posts
}

export default function (props: PostListItemProps) {
  const navigation = useNavigation();
  const {post} = props;

  const onPress = () => {
    navigation.navigate('PostDetail', {post});
  }

  return (
    <ListItem onPress={onPress} >
      {/* {<Avatar source={{uri: post.user.}} />} */}
      <ListItem.Content>
        <View style={styles.authorRow}>
          <Avatar
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            title="JD"
            titleStyle={{fontFamily: "Montserrat-Bold", fontSize: 14}}
            size="medium"
            overlayContainerStyle={{backgroundColor: 'gray'}}
            />
            <View style={styles.textContainer}>
              <Text style = {styles.authorNameText} >
                {post.user?.name ?? "John Doe"} 
              </Text>
              <Text style = {styles.groupNameText} >
                {post.group?.name ?? "Apache Junction"} 
              </Text>
            </View>
        </View> 
        <View style={styles.authorRow}>
          <Text style = {styles.bodyText} >
            {post.body ?? "John Doe"} 
          </Text>
        </View>
        <View style={styles.image}>
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: "https://images.unsplash.com/photo-1588627541420-fce3f661b779?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80" }}
          />
        </View> 


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
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
  },
  bodyText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
  },
  groupNameText: {
    fontFamily: "Montserrat-Regular",
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
    aspectRatio: 1,
    height: 400,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
})