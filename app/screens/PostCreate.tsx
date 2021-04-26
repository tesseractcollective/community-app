import React, {useCallback, useEffect, useState} from 'react';
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

import {MutatorButton, MutatorTextInput} from 'react-graphql/components';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {uploadImage} from '../fileApi/fileApi';
import {useAuthToken, useUserId} from '../UserContext';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import {useTranslations} from 'components/TranslationProvider';

export interface PostCreateRouterProps {
  userId: string;
  groupId?: string;
}

export default function (props: any) {
  const {groupId} = props.route.params;

  const navigation = useNavigation();
  const translations = useTranslations();
  const authToken = useAuthToken();
  const userId = useUserId();
  const [image, setImage] = useState<ImageOrVideo | undefined>();

  const insert = useReactGraphql(HasuraConfig.posts).useInsert({
    initialVariables: {groupId},
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
    if (image && insert.resultItem) {
      console.log('uploading image');
      uploadImage(image, authToken, {
        postId: insert.resultItem.id,
      })
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [image, insert.resultItem]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.row}>
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
              state={insert}
              input="body"
              defaultValue={'Jeremy Test'}
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        {insert.mutating ? (
          <ActivityIndicator style={styles.indicator} size="large" />
        ) : null}
        {insert.error ? <Text>{insert.error.message}</Text> : null}
      </View>

      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}></KeyboardAvoidingView>

      {image ? (
        <View style={styles.row}>
          <Image source={{uri: image.path}} style={styles.image} />
        </View>
      ) : null}

      <View style={styles.row}>
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
        <MutatorButton state={insert} title={translations.save} />
      </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textColumn: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
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
