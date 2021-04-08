import React, {FunctionComponent} from 'react';
import {bs} from 'react-graphql/support/styling/buildStyles';
import {Divider} from 'react-native-elements';
import PaginatedList from 'react-graphql/components/native/PaginatedList';
import HasuraConfig from 'graphql-api/HasuraConfig';
import GroupListItem from 'components/GroupListItem';
import {Group_Bool_Exp, Group_Order_By} from 'graphql-api';

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
    <Divider style={bs(`b-1 b-green px-mxx py-s f-sc f-1`)}>
      <PaginatedList
        style={bs(`h-99p`)}
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
