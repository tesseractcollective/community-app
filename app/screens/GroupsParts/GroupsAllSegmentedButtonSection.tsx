import React, { FunctionComponent } from 'react';
import { bs } from 'react-graphql/support/styling/buildStyles';
import { ButtonGroup } from 'react-native-elements';

export interface IGroupsAllSegmentedButtonSectionProps {
  selectedIndex: number;
  setSelectedIndex: (number) => void;
  buttons: string[];
}

const GroupsAllSegmentedButtonSection: FunctionComponent<IGroupsAllSegmentedButtonSectionProps> = function GroupsAllSegmentedButtonSection({
  selectedIndex,
  setSelectedIndex,
  buttons,
}) {
  return (
    <>
      <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        buttonContainerStyle={bs(`bg-gray-50`)}
      />
    </>
  );
};

export default GroupsAllSegmentedButtonSection;
