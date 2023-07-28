import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import MainHeader from '@/components/main-header.component';
import BottomButton from '../../components/bottom-button.component';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {useInfiniteQuery} from 'react-query';
import VoteApi from '@/modules/vote/vote.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {StackScreenProps} from '@react-navigation/stack';
import {VoteStackParamsList} from '@/routes/vote.stack';
import {RefreshControl} from 'react-native-gesture-handler';
import VoteItem from './components/vote-item.component';
import {TVote} from '@/modules/vote/vote.model';
import FilterVote from './components/filter.component';

type Props = StackScreenProps<VoteStackParamsList>;

const VoteScreen = ({navigation}: Props) => {
  const [paging, setPaging] = useState({
    maxResultCount: 10,
    type: 2,
    keyword: '',
  });

  const {data, fetchNextPage, isFetchingNextPage, isLoading, remove} =
    useInfiniteQuery({
      queryKey: ['list-vote', paging.keyword],
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

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
      headerShown: true,
    });
  }, [navigation, renderHeader]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached}
        contentContainerStyle={{paddingTop: 10}}
      />
      <FilterVote />
      <BottomButton
        onPress={() => {
          navigation.navigate('CREATE_SCREEN', {});
        }}>
        Tạo vote
      </BottomButton>
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

const styles = StyleSheet.create({});
