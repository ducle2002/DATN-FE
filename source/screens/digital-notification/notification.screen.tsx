/* eslint-disable @typescript-eslint/no-shadow */
import {Dimensions, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import MainHeader from './components/main-header.component';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {useInfiniteQuery} from 'react-query';
import DigitalNotiApi from '@/modules/digital-notification/digital-noti.service';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import NotiItem from './components/noti-item.component';
import {useAppSelector} from '@/hooks/redux.hook';
import BottomButton from './components/bottom-button.component';
import language, {languageKeys} from '@/config/language/language';
const {width} = Dimensions.get('screen');

type Props = StackScreenProps<NotificationStackParamsList, 'MAIN_SCREEN'>;

const NotificationScreen = ({navigation}: Props) => {
  const [paging, setPaging] = useState({
    maxResultCount: 10,
    type: 2,
  });

  const {data, fetchNextPage, isFetchingNextPage, isLoading, remove} =
    useInfiniteQuery({
      queryKey: ['list-noti'],
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

  const renderItem = useCallback(
    (_: any, data: any) => {
      const department = listOrganizations.find(
        o => o.organizationUnitId === data.organizationUnitId,
      );
      return RowRender(data, department?.displayName, () => {
        navigation.navigate('DETAIL_SCREEN', {noti: data});
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

  return (
    <View style={styles.container}>
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
        }}
      />
      <BottomButton
        onPress={() => {
          navigation.navigate('CREATE_SCREEN', {});
        }}>
        {language.t(languageKeys.digitalNoti.create.create)}
      </BottomButton>
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
