import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FilterWork from './components/filter';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {WorkManagementDrawerParamsList} from '@/routes/work-management.stack';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import {useInfiniteQuery} from 'react-query';
import WorkManagementApi from './services/work-management.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import WorkItem from './components/work-item.component';
import WorkDetail from './components/work-detail.component';

type Props = CompositeScreenProps<
  DrawerScreenProps<WorkManagementDrawerParamsList, 'MANAGEMENT'>,
  StackScreenProps<AppStackParamsList, 'WORK_MANAGEMENT'>
>;

const ManagementScreen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      title: 'My Work',
    });
  }, [navigation]);

  const status = useMemo(
    () => [
      {id: 1, label: 'Đang làm'},
      {id: 2, label: 'Đã hoàn thành'},
      {id: 3, label: 'Qúa hạn'},
    ],
    [],
  );

  const [selectedStatus, selectStatus] = useState(status[0].id);

  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['my-work', selectedStatus],
    queryFn: ({pageParam}) =>
      WorkManagementApi.getAll({
        ...pageParam,
        maxResultCount: 10,
        status: selectedStatus,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.works.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
  });

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(
        data ? flatten(map(page => page.works, data.pages)) : [],
      ),
    [data],
  );

  const [selectedWork, selectWork] = useState(undefined);

  const renderItem: ListRenderItem<any> = ({item}) => (
    <WorkItem onPress={() => selectWork(item)} {...{item}} />
  );

  return (
    <View style={styles.container}>
      <FilterWork {...{status, selectedStatus, selectStatus}} />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage()}
        contentContainerStyle={{paddingTop: 10}}
      />
      <WorkDetail
        isVisible={!!selectedWork}
        onBackdropPress={() => selectWork(undefined)}
        work={selectedWork}
      />
    </View>
  );
};

export default ManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
