import React, {FunctionComponent} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {View, Text, TouchableOpacity} from 'react-native';
import FeatherIcons from 'react-native-vector-icons/Feather';

export interface IReactionProps {
  count: number;
  hasCurrentUserReacted: boolean;
  reactionType: string;
  toggleReaction: () => void;
}

const iconLookup = {
  LIKE: 'heart',
} as {
  [key: string]: string;
};

const Reaction: FunctionComponent<IReactionProps> = function Reaction(props) {
  return (
    <TouchableOpacity onPress={props.toggleReaction}>
      <View style={bs(`px-mxx py-s f-cc f-columns `)}>
        <FeatherIcons
          name={iconLookup[props.reactionType]}
          color={props.hasCurrentUserReacted ? 'red' : 'gray'}
        />
        <Text style={bs(`ml-sxx`)}>{props.count}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Reaction;
