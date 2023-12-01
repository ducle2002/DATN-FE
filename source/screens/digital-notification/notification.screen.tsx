import {Dimensions, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import MainHeader from '../../components/main-header.component';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {useInfiniteQuery} from 'react-query';
import DigitalNotiApi from '@/screens/digital-notification/services/digital-noti.service';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import NotiItem from './components/noti-item.component';
import {useAppSelector} from '@/hooks/redux.hook';
import {SelectItemContext} from '../../contexts/select-item.context';
import MainBottom from './components/main-bottom.component';
const {width} = Dimensions.get('screen');

type Props = StackScreenProps<NotificationStackParamsList, 'MAIN_SCREEN'>;

const NotificationScreen = ({navigation}: Props) => {
  const [selectedNotis, setSelectedNotis] = useState<Array<number>>([]);

  const [paging, setPaging] = useState({
    maxResultCount: 10,
    type: 2,
    keyword: '',
  });

  const {data, fetchNextPage, isFetchingNextPage, isLoading, remove} =
    useInfiniteQuery({
      queryKey: ['list-noti', paging.keyword],
      queryFn: ({pageParam = {...paging, skipCount: 0}}) =>
        DigitalNotiApi.getRequest(pageParam),
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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderItem = (_: any, data: any) => {
    const department = listOrganizations.find(
      o => o.organizationUnitId === data.organizationUnitId,
    );
    return RowRender(data, department?.displayName, () => {
      navigation.navigate('DETAIL_SCREEN', {noti: data});
    });
  };

  const onEndReached = () => {
    if (
      !isFetchingNextPage &&
      data?.pages[0].totalCount > dataProvider.getSize()
    ) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    if (selectedNotis.length > 0) {
      return;
    }
    remove();
    setPaging({...paging});
  };

  const deselectAll = () => {
    setSelectedNotis([]);
  };
  const toggleItemSelected = (id: number) => {
    const index = selectedNotis.findIndex(i => i === id);
    if (index === -1) {
      setSelectedNotis([...selectedNotis, id]);
    } else {
      setSelectedNotis(selectedNotis.filter(i => i !== id));
    }
  };
  const renderHeader = useCallback(
    (props: StackHeaderProps) => {
      return (
        <MainHeader
          onKeywordChange={keyword => {
            setPaging(old => ({...old, keyword: keyword}));
            remove();
          }}
          {...props}
        />
      );
    },
    [remove],
  );

  useEffect(() => {
    navigation.setOptions({
      header: props => renderHeader(props),
      headerShown: true,
    });
  }, [navigation, renderHeader]);

  return (
    <View style={styles.container}>
      <SelectItemContext.Provider
        value={{
          selected: selectedNotis,
          select: toggleItemSelected,
          reset: deselectAll,
        }}>
        <RecyclerListView
          optimizeForInsertDeleteAnimations
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
          renderAheadOffset={1000}
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
  return <NotiItem item={data} department={department} onPress={onPress} />;
};
export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
