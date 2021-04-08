import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem} from 'react-native-elements';
import {Group} from 'graphql-api';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

const gradient = ['#FF9800', '#F44336'];
const whiteColor = 'white';

export interface GroupListItemProps {
  group: Group;
}

export default function (props: GroupListItemProps) {
  const navigation = useNavigation();
  const {group} = props;

  const onPress = () => {
    navigation.navigate('GroupDetail', {group});
  };

  return (
    <ListItem bottomDivider onPress={onPress}>
      {/* <Avatar source={{uri: group.photoUrl}} /> */}
      <ListItem.Content>
        <ListItem.Title>{group.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

export function GroupListItemHome(props: GroupListItemProps) {
  const navigation = useNavigation();
  const {group} = props;

  const onPress = () => {
    navigation.navigate('GroupDetail', {group});
  };

  // see https://reactnativeelements.com/docs/listitem#linear-gradient--scale-feedback
  return (
    <ListItem
      style={{ 
        height: 100
      }}
      containerStyle={{ 
        marginHorizontal: 8, 
        borderRadius: 10, 
        height: '80%', 
        elevation: 2
      }}
      onPress={onPress}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      linearGradientProps={{
        colors: gradient,
        start: {x: 1, y: 0},
        end: {x: 0.2, y: 0},
      }}
      ViewComponent={LinearGradient} // TODO: figure out how to remove linting error
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: 'black', fontFamily: "Montserrat-Semibold", fontSize: 14, textTransform: 'uppercase' }}>
          {group.name}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
