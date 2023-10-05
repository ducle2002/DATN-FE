import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FilterWork from './components/filter';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useInfiniteQuery} from 'react-query';
import WorkManagementApi from './services/work-management.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import WorkItem from './components/work-item.component';
import {EWorkFormID, EWorkStatus, TWork} from './services/work.model';
import CreateWorkComponent from './components/create-work.component';
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';

type Props = StackScreenProps<WorkStackParamsList, 'MAIN_DRAWER'>;

const ManagementScreen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      title: 'My Work',
    });
  }, [navigation]);

  const status = useMemo(
    () => [
      {id: undefined, label: 'All'},
      {id: EWorkStatus.DOING, label: 'Đang làm'},
      {id: EWorkStatus.COMPLETE, label: 'Đã hoàn thành'},
      {id: EWorkStatus.OVERDUE, label: 'Quá hạn'},
    ],
    [],
  );

  const formId = useMemo(
    () => [
      {id: undefined, label: 'All'},
      {id: EWorkFormID.ASSIGNED, label: 'Đã giao'},
      {id: EWorkFormID.RECEIVED, label: 'Được giao'},
      {id: EWorkFormID.FOLLOW, label: 'Đang theo dõi'},
    ],
    [],
  );

  const [selectedStatus, selectStatus] = useState(status[0].id);

  const [selectedFormId, selectFormId] = useState(formId[0].id);

  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['my-work', selectedStatus, selectedFormId],
    queryFn: ({pageParam}) =>
      WorkManagementApi.getAll({
        ...pageParam,
        maxResultCount: 10,
        status: selectedStatus,
        formId: selectedFormId,
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

  const renderItem: ListRenderItem<TWork> = ({item}) => (
    <WorkItem
      onPress={() => navigation.navigate('DETAIL_WORK', {id: item.id})}
      {...{item}}
    />
  );

  const {grantedPermissions} = useAppSelector(state => state.config);

  return (
    <View style={styles.container}>
      <FilterWork
        {...{
          status,
          selectedStatus,
          selectStatus,
          formId,
          selectedFormId,
          selectFormId,
        }}
      />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage()}
        contentContainerStyle={{paddingTop: 10}}
      />
      {checkPermission(grantedPermissions, [
        'Pages.Operations.TaskManagement.Create',
      ]) && <CreateWorkComponent />}
    </View>
  );
};

export default ManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F7',
  },
});
