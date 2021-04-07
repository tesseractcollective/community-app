import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Avatar, Button, Icon, Image} from 'react-native-elements';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';

import {
  MutatorSaveButton,
  MutatorTextInput,
  useMutator,
} from 'react-graphql/components';
import {Post} from 'graphql-api';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {uploadImage} from '../fileApi/fileApi';
import {useAuthToken} from '../UserContext';

export interface PostCreateRouterProps {
  userId: string;
  groupId?: string;
}

export default function (props: any) {
  const {userId, groupId} = props.route.params;

  const navigation = useNavigation();
  const authToken = useAuthToken();

  const [image, setImage] = useState<ImageOrVideo | undefined>();

  const {mutator, state} = useMutator<Post>({
    config: HasuraConfig.posts,
    variables: {userId, groupId},
  });

  const pickImage = useCallback(() => {
    ImageCropPicker.openPicker({
      // compressImageMaxWidth: 1200,
    })
      .then((result) => {
        setImage(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (image && state.resultItem) {
      uploadImage(image, authToken, {
        postId: state.resultItem.id,
      })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [image, state.resultItem]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.authorRow}>
          <Avatar
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            title="JD"
            titleStyle={{fontFamily: 'Montserrat-Bold', fontSize: 11}}
            size="small"
            overlayContainerStyle={{backgroundColor: 'gray'}}
          />
          <View style={styles.textColumn}>
            <MutatorTextInput
              mutator={mutator}
              input="body"
              style={styles.textContainer}
            />
            {image ? (
              <Image source={{uri: image.path}} style={styles.image} />
            ) : null}
            <MutatorSaveButton mutator={mutator} style={styles.textContainer} />
          </View>
        </View>
      </View>
      {state.mutating ? (
        <ActivityIndicator style={styles.indicator} size="large" />
      ) : null}
      {state.error ? <Text>{state.error.message}</Text> : null}
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View style={styles.authorRow}>
          <Button
            type="clear"
            onPress={pickImage}
            icon={
              <Icon
                style={styles.icon}
                name="image"
                type="feather"
                color="#313643"
              />
            }
          />

          {/* <Icon
            style={styles.icon}
            name="camera"
            type="feather"
            color="#313643"
          /> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  indicator: {
    margin: 16,
  },
  authorRow: {
    // backgroundColor: '#F2F2F2',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textColumn: {
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 1.5,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});
