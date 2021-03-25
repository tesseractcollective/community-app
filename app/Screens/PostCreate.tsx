import React, { useEffect } from 'react';
import {useNavigation} from '@react-navigation/core';
import {ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';

import {
  MutatorSaveButton,
  MutatorTextInput,
  useMutator,
} from '../components/Mutator';
import {Posts} from '../graphql';
import HasuraConfig from '../graphql/HasuraConfig';
import { Avatar, Icon } from 'react-native-elements';

export interface PostCreateRouterProps {
  userId: string;
  groupId?: string;
}

export default function (props: any) {
  const {userId, groupId} = props.route.params;

  const navigation = useNavigation();

  const {mutator, state} = useMutator<Posts>({
    config: HasuraConfig.posts,
    variables: {userId, groupId},
  });

  useEffect(() => {
    if (state.resultItem) {
      navigation.goBack();
    }
  }, [state.resultItem]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.authorRow}>
            <Avatar
              rounded
              icon={{name: 'user', type: 'font-awesome'}}
              title="JD"
              titleStyle={{fontFamily: "Montserrat-Bold", fontSize: 11}}
              size="small"
              overlayContainerStyle={{backgroundColor: 'gray'}}
              />
            <View style={styles.textColumn}>
              <MutatorTextInput mutator={mutator} input="body" style={styles.textContainer} />
              <MutatorSaveButton mutator={mutator} style={styles.textContainer} />
            </View>           
          </View> 
      </View>
      {state.mutating ? (<ActivityIndicator style={styles.indicator} size="large" />) : null}
      {state.error ? <Text>{state.error.message}</Text> : null}
      <KeyboardAvoidingView
        behavior='padding'
        style={{ flex: 1}}>
        <View style={styles.authorRow}>
          <Icon style={styles.icon}
            name='image'
            type='feather'
            color='#313643'            
          />     
          <Icon style={styles.icon}
            name='camera'
            type='feather'
            color='#313643'
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16
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
    flex: 1
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,  
  },
  icon: {
    marginRight: 15
  }
})