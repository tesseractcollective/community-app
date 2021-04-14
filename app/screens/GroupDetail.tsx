import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import PostListItem from '../components/PostListItem';
import {useTranslations} from '../components/TranslationProvider';
import {
  Group,
  Post,
  Post_Order_By,
  Order_By,
  UserGroup_Bool_Exp,
} from 'graphql-api';
import HasuraConfig from 'graphql-api/HasuraConfig';
import {useUserId} from '../UserContext';
import useReactGraphql from 'react-graphql/hooks/useReactGraphql';
import {MutatorButton, PaginatedList} from 'react-graphql/components';
import {addUserIdToVariables} from 'graphql-api/utils/addUserIdToVariables';
import {createInfiniteQueryMany} from 'react-graphql/hooks/useInfiniteQueryMany.utils';

export interface GroupDetailRouterProps {
  group: Group;
}

const gradient = ['#FF9800', '#F44336'];

export default function (props: any) {
  const {group} = props.route.params;

  const translations = useTranslations();
  const userId = useUserId();

  const reactGraphql = useReactGraphql(HasuraConfig.userGroups);
  const variables = {userId, groupId: group.id};

  const insertState = reactGraphql.useInsert({initialVariables: variables});
  const deleteState = reactGraphql.useDelete({variables});
  const queryOneState = reactGraphql.useQueryOne({variables});

  useEffect(() => {
    console.log('queryOneState.refresh()');
    queryOneState.refresh();
  }, [insertState.resultItem, deleteState.resultItem]);

  const where: UserGroup_Bool_Exp = {groupId: {_eq: group.id}};
  const orderByPosts: Post_Order_By = {createdAt: Order_By.Desc};

  const renderPost = ({item}: {item: Post}) => {
    return <PostListItem post={item} />;
  };

  return (
    <View>
      <ListItem
        style={{
          height: '20%',
          flexDirection: 'column',
        }}
        linearGradientProps={{
          colors: gradient,
          start: {x: 1, y: 0},
          end: {x: 0.2, y: 0},
        }}
        ViewComponent={LinearGradient} // TODO: figure out how to remove linting error
      >
        <ImageBackground
          source={{uri: group.photoUrl}}
          style={{height: '100%', backgroundColor: 'clear'}}>
          <Text style={styles.groupNameText}>{group.name}</Text>
          <Text style={styles.groupLocationText}>{group.description}</Text>
        </ImageBackground>
      </ListItem>
      {queryOneState.item ? (
        <MutatorButton
          state={deleteState}
          title={translations.groupsRemoveMe}
        />
      ) : (
        <MutatorButton state={insertState} title={translations.groupsAddMe} />
      )}
      <PaginatedList
        style={styles.posts}
        config={HasuraConfig.posts}
        renderItem={renderPost}
        where={where}
        middleware={[addUserIdToVariables(userId), createInfiniteQueryMany]}
        orderBy={orderByPosts}
        reloadOnFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#F2F2F2',
  },
  groupNameText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    color: '#F2F2F2',
  },
  groupLocationText: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 12,
    color: '#F2F2F2',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
    marginStart: 16,
    marginEnd: 16,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Medium',
    color: '#222222',
    fontSize: 24,
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 12,
  },
  posts: {
    height: '80%',
  },
  groups: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  listButton: {
    borderRadius: 22,
  },
  listButtonTitle: {
    textTransform: 'uppercase',
    paddingStart: 8,
    fontFamily: 'Montserrat-Bold',
    fontSize: 11,
  },
  listButtonContainer: {
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 12,
  },
});
