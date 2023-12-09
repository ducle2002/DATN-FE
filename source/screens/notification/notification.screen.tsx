import {RefreshControl, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {useListNotifications} from './services/hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {TNotification} from './services/notification';
import NotificationItem from './components/notification-item';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';

const NotificationScreen = () => {
  const {data, fetchNextPage, remove, refetch, status} = useListNotifications();

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(data?.pages.flatMap(page => page.notifications) ?? []),
    [data],
  );

  const renderItem = (_type: any, item: TNotification) => (
    <NotificationItem notification={item} />
  );

  const {width} = useWindowDimensions();
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

  return (
    <RecyclerListView
      dataProvider={dataProvider}
      layoutProvider={_layoutProvider}
      forceNonDeterministicRendering={true}
      rowRenderer={renderItem}
      contentContainerStyle={styles.contentContainer}
      onEndReached={() => fetchNextPage()}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            remove();
            refetch();
          }}
          refreshing={status === 'loading'}
        />
      }
    />
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
  },
});
