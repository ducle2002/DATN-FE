import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {useInfiniteQuery} from 'react-query';
import LocalServiceApi from '@/screens/local-service/services/local-service.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {TLocalService} from '@/screens/local-service/services/local-service.model';
import ServiceItem from './components/local-service-item';
import FilterService from './components/service-filter.component';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {LocalServiceStackParamsList} from '@/routes/local-service.stack';
import MainHeader from '@/components/main-header.component';

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

  const renderHeader = (props: StackHeaderProps) => <MainHeader {...props} />;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
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
