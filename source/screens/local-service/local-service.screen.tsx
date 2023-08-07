import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import LocalServiceApi from '@/modules/local-service/local-service.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {TLocalService} from '@/modules/local-service/local-service.model';
import ServiceItem from './components/local-service-item';
import FilterService from './components/service-filter.component';
import {StackScreenProps} from '@react-navigation/stack';
import {LocalServiceStackParamsList} from '@/routes/local-service.stack';

type Props = StackScreenProps<LocalServiceStackParamsList, 'MAIN_SCREEN'>;

const LocalServiceScreen = ({navigation}: Props) => {
  const [type, setType] = useState<number | undefined>(undefined);
  const {data, fetchNextPage, isLoading, refetch, remove} = useInfiniteQuery({
    queryKey: ['local-service'],
    queryFn: ({pageParam = {maxResultCount: 10}}) =>
      LocalServiceApi.getAllServiceRequest({...pageParam, type: type}),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.services.length !==
        lastPage.totalCount
        ? {
            maxResultCount: 10,
            skipCount: skipCount,
          }
        : undefined;
    },
  });

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(data?.pages.map(page => page.services).flat() ?? []),
    [data?.pages],
  );

  const renderItem = useCallback<ListRenderItem<TLocalService>>(
    ({item}) => (
      <ServiceItem
        onPress={() =>
          navigation.navigate('BOOKING_SCREEN', {storeId: item.id})
        }
        {...{item}}
      />
    ),
    [navigation],
  );

  const onEndReached = () => {
    fetchNextPage();
  };

  const onRefresh = () => {
    remove();
    refetch();
  };
  useEffect(() => {
    remove();
    refetch();
  }, [refetch, remove, type]);

  return (
    <View style={styles.container}>
      <FilterService
        selected={type}
        onChange={(t: number | undefined) => setType(t)}
      />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        style={{paddingTop: 10}}
      />
    </View>
  );
};

export default LocalServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});