import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem} from 'react-native-elements';
import { Group } from '../api/communityApi';

interface GroupListItemProps {
  group: Group
}

export default function (props: GroupListItemProps) {
  const navigation = useNavigation();
  const {group} = props;

  const onPress = () => {
    navigation.navigate('GroupDetail', {group});
  }

  return (
    <ListItem bottomDivider onPress={onPress}>
      <Avatar source={{uri: group.photoUrl}} />
      <ListItem.Content>
        <ListItem.Title>{group.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
