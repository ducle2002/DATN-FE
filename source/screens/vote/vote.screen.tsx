/* eslint-disable @typescript-eslint/no-shadow */
import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import MainHeader from '@/components/main-header.component';
import BottomButton from '../../components/bottom-button.component';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {useInfiniteQuery} from 'react-query';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import VoteApi from '@/modules/vote/vote.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {StackScreenProps} from '@react-navigation/stack';
import {VoteStackParamsList} from '@/routes/vote.stack';
import {RefreshControl} from 'react-native-gesture-handler';
import VoteItem from './components/vote-item.component';
const {width} = Dimensions.get('screen');

type Props = StackScreenProps<VoteStackParamsList>;

const VoteScreen = ({navigation}: Props) => {
  const [paging, setPaging] = useState({
    maxResultCount: 10,
    type: 2,
    keyword: '',
  });

  const {data, fetchNextPage, isFetchingNextPage, isLoading, remove} =
    useInfiniteQuery({
      queryKey: ['list-noti', paging.keyword],
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

  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
      },
    ),
  ).current;
  const {listOrganizations} = useAppSelector(state => state.organizationUnit);

  const renderItem = useCallback(
    (_: any, data: any) => {
      const department = listOrganizations.find(
        o => o.organizationUnitId === data.organizationUnitId,
      );
      return RowRender(data, department?.displayName, () => {
        navigation.navigate('CREATE_SCREEN', {vote: data});
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
    // if (selectedNotis.length > 0) {
    //   return;
    // }
    remove();
    setPaging({...paging});
  };

  const onKeywordChange = (value: string) => {
    setPaging({...paging, keyword: value});
    remove();
  };

  return (
    <View style={{flex: 1}}>
      <MainHeader />
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        rowRenderer={renderItem}
        forceNonDeterministicRendering
        onEndReached={onEndReached}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          ),
          contentContainerStyle: {
            paddingTop: 10,
          },
        }}
      />
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
