import React, { useEffect, useState } from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import GroupListItem from '../components/GroupListItem';
import {useTranslations} from '../components/TranslationProvider';
import {Groups, useAllGroupsQuery} from '../graphql';

const styles = StyleSheet.create({
  posts: {
    height: '100%',
  },
  groups: {
    paddingTop:10,
    paddingBottom: 20,
  }
});

function useGroupsPagination(pageSize: number = 20) {
  const limit = pageSize;
  const [offset, setOffset] = useState(0);
  const [itemsByOffset, setItemsByOffset] = useState<{[key: number]: Groups[]}>({});
  const [items, setItems] = useState<Groups[]>([]);
  const [queryResult, reexecuteQuery] = useAllGroupsQuery({ variables: { limit, offset }});
  
  const pageItems = queryResult.data?.groups as Groups[];
  const error = queryResult.error;
  const fetching = queryResult.fetching;

  const loadNextPage = () => {
    setOffset(offset+limit)
  };

  const refresh = () => {
    setOffset(0);
    reexecuteQuery({requestPolicy: 'network-only'});
  };

  useEffect(() => {
    if (pageItems && !fetching) {
      console.log('useEffect offset:', offset);
      console.log(pageItems.map((item: any) => item.name));
      if (offset === 0) {
        setItems(pageItems);
        setItemsByOffset({
          [offset]: pageItems,
        });
      } else {
        const newItemsByOffset = {
          ...itemsByOffset,
          [offset]: pageItems,
        }
        setItemsByOffset(newItemsByOffset);
        const newItems = Object.values(newItemsByOffset).reduce((previous, current) => {
          return previous.concat(current);
        }, []);
        setItems(newItems);
      }
    }
  }, [pageItems, fetching, offset])

  return { items, error, fetching, refresh, loadNextPage };
}

export default function () {
  const translations = useTranslations();
  
  const { items: groups, error, fetching, refresh, loadNextPage } = useGroupsPagination();
  
  const renderGroup = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  const renderPost = ({item}: {item: Groups}) => {
    return <GroupListItem group={item} />;
  };

  const loadMorePosts = () => {

  };

  return (
    <View>
      {error ? (
        <Text>{error as any}</Text>
      ) : (
        <>
          <Text>{translations.groupsMyGroups}</Text>
          {/* <FlatList
            style={styles.groups}
            horizontal={true}
            data={groups}
            renderItem={renderGroup}
            keyExtractor={(group) => group.id}
            onEndReachedThreshold={1}
            onEndReached={loadMoreGroups}
          /> */}
          <FlatList
            style={styles.posts}
            refreshControl={
              <RefreshControl refreshing={fetching} onRefresh={refresh} />
            }
            data={groups}
            renderItem={renderPost}
            keyExtractor={(group) => group.id}
            onEndReachedThreshold={1}
            onEndReached={loadNextPage}
          />
        </>
      )}
    </View>
  );
}
