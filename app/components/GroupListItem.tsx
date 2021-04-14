import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import {Group, UserGroup} from 'graphql-api';
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

export interface UserGroupListItemProps {
  userGroup: UserGroup;
}

export function UserGroupListItemHome(props: UserGroupListItemProps) {
  const navigation = useNavigation();
  const {
    userGroup: {group},
  } = props;

  const onPress = () => {
    navigation.navigate('GroupDetail', {group});
  };

  if (!group?.name) {
    console.log('props', props);
  }

  // see https://reactnativeelements.com/docs/listitem#linear-gradient--scale-feedback
  return (
    <ListItem
      style={{
        height: 80,
        width: 100,
      }}
      containerStyle={styles.container}
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
        <ListItem.Title
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          style={styles.title}>
          {group.name}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    borderRadius: 10,
    height: '80%',
    elevation: 2,
  },
  title: {
    color: 'black',
    fontFamily: 'Montserrat-Semibold',
    fontSize: 11,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
  },
});
