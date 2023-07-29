import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import MainHeader from '@/components/main-header.component';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {useInfiniteQuery} from 'react-query';
import VoteApi from '@/modules/vote/vote.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {StackScreenProps} from '@react-navigation/stack';
import {VoteStackParamsList} from '@/routes/vote.stack';
import {RefreshControl} from 'react-native-gesture-handler';
import VoteItem from './components/vote-item.component';
import {EVoteState, TVote, votesFilter} from '@/modules/vote/vote.model';
import FilterVote from './components/filter.component';
import MainBottom from './components/main-bottom.component';
import {SelectItemContext} from '../../contexts/select-item.context';

type Props = StackScreenProps<VoteStackParamsList>;

const VoteScreen = ({navigation}: Props) => {
  const [paging, setPaging] = useState({
    maxResultCount: 10,
    keyword: '',
    state: votesFilter[0].state,
  });

  const [selectedVotes, setSelectedVote] = useState<Array<number>>([]);

  const {data, fetchNextPage, isFetchingNextPage, isLoading, remove} =
    useInfiniteQuery({
      queryKey: ['list-vote', paging.keyword, paging.state],
      queryFn: ({pageParam = {...paging, skipCount: 0}}) =>
        VoteApi.getRequest(pageParam),
      getNextPageParam: (_, allPages) => {
        const skipCount = allPages.length * paging.maxResultCount;
        return {
          ...paging,
          skipCount: skipCount,
        };
      },
    });

  const dataProvider = useMemo(() => {
    return dataProviderMaker(data?.pages.map(page => page.data).flat() ?? []);
  }, [data?.pages]);

  const {listOrganizations} = useAppSelector(state => state.organizationUnit);

  const renderItem = useCallback<ListRenderItem<TVote>>(
    ({item}) => {
      const department = listOrganizations.find(
        o => o.organizationUnitId === item.organizationUnitId,
      );
      return RowRender(item, department?.displayName, () => {
        navigation.navigate('CREATE_SCREEN', {vote: item});
      });
    },
    [listOrganizations, navigation],
  );

  const onEndReached = () => {
    if (
      !isFetchingNextPage &&
      data?.pages[0].totalCount > dataProvider.getSize()
    ) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    remove();
    setPaging({...paging});
  };

  const onKeywordChange = useCallback(
    (value: string) => {
      setPaging({...paging, keyword: value});
      remove();
    },
    [paging, remove],
  );

  const renderHeader = useCallback(
    () => <MainHeader keywordChange={onKeywordChange} />,
    [onKeywordChange],
  );

  const onFilterChange = (filter: EVoteState) => {
    setPaging({...paging, state: filter});
    remove();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
      headerShown: true,
    });
  }, [navigation, renderHeader]);

  const deselectAll = () => {
    setSelectedVote([]);
  };
  const toggleItemSelected = (id: number) => {
    const index = selectedVotes.findIndex(i => i === id);
    if (index === -1) {
      setSelectedVote([...selectedVotes, id]);
    } else {
      setSelectedVote(selectedVotes.filter(i => i !== id));
    }
  };

  return (
    <View style={styles.container}>
      <FilterVote selected={paging.state} onChange={onFilterChange} />
      <SelectItemContext.Provider
        value={{
          selected: selectedVotes,
          select: toggleItemSelected,
          reset: deselectAll,
        }}>
        <FlatList
          data={dataProvider.getAllData()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          onEndReached={onEndReached}
          contentContainerStyle={{paddingTop: 10}}
        />
        <MainBottom />
      </SelectItemContext.Provider>
    </View>
  );
};

const RowRender = (
  data: any,
  department: string | undefined,
  onPress: Function = () => {},
) => {
  return <VoteItem item={data} onPress={onPress} />;
};
export default VoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
