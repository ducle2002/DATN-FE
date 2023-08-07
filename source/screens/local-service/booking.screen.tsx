import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {LocalServiceStackParamsList} from '@/routes/local-service.stack';
import LocalServiceApi from '@/modules/local-service/local-service.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {
  EBookingFormId,
  TBooking,
} from '@/modules/local-service/local-service.model';
import BookingItem from './components/booking-item';
import FilterBooking from './components/booking-filter.component';

type Props = StackScreenProps<LocalServiceStackParamsList, 'BOOKING_SCREEN'>;

const BookingScreen = ({route}: Props) => {
  const {storeId} = route.params;

  const [state, setState] = useState<EBookingFormId>(1);

  const {data, refetch, remove, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['booking', storeId],
    queryFn: ({
      pageParam = {
        maxResultCount: 10,
      },
    }) =>
      LocalServiceApi.getAllBookingRequest({
        ...pageParam,
        storeId: storeId,
        formId: state,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.booking.length !==
        lastPage.totalCount
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
  });

  const dataProvider = useMemo(
    () => dataProviderMaker(data?.pages.map(page => page.booking).flat() ?? []),
    [data?.pages],
  );

  const renderItem = useCallback<ListRenderItem<TBooking>>(
    ({item}) => <BookingItem {...{item}} />,
    [],
  );

  const onChangeFormId = (a: EBookingFormId) => {
    setState(a);
  };

  useEffect(() => {
    remove();
    refetch();
  }, [refetch, remove, state]);

  const onEndReached = () => {
    fetchNextPage();
  };

  const onRefresh = () => {
    remove();
    refetch();
  };

  return (
    <View style={styles.container}>
      <FilterBooking selected={state ?? 0} onChange={onChangeFormId} />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        onEndReached={onEndReached}
        style={{paddingTop: 10}}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
