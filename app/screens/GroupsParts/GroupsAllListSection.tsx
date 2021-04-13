import React, {FunctionComponent} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {Divider} from 'react-native-elements';
import PaginatedList from 'react-graphql/components/native/PaginatedList';
import HasuraConfig from 'graphql-api/HasuraConfig';
import GroupListItem from 'components/GroupListItem';
import {Group, Group_Bool_Exp, Group_Order_By} from 'graphql-api';

export interface IGroupsAllListSectionProps {
  groupFilter: Group_Bool_Exp;
  groupOrderBy: Group_Order_By;
}

const GroupsAllListSection: FunctionComponent<IGroupsAllListSectionProps> = function GroupsAllListSection({
  groupFilter,
  groupOrderBy,
  ...rest
}) {
  const renderGroup = ({item}: {item: Group}) => {
    return <GroupListItem group={item} />;
  };

  return (
    <Divider style={bs(`px-mxx py-s f-start-stretch f-1 bg-white`)}>
      <PaginatedList
        style={bs(`bg-white`)}
        contentContainerStyle={bs(`bg-white`)}
        config={HasuraConfig.groups}
        renderItem={renderGroup}
        where={groupFilter}
        orderBy={groupOrderBy}
        {...rest}
      />
    </Divider>
  );
};

export default GroupsAllListSection;
