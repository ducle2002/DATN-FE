import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import FilterWork from './components/filter';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  WorkManagementDrawerParamsList,
  WorkStackParamsList,
} from '@/routes/work-management.stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useInfiniteQuery} from 'react-query';
import WorkManagementApi from './services/work-management.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import WorkItem from './components/work-item.component';
import CreateWork from './components/create-work.component';
import {EWorkFormID, EWorkStatus, TWork} from './services/work.model';
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';

type Props = CompositeScreenProps<
  DrawerScreenProps<WorkManagementDrawerParamsList, 'MANAGEMENT'>,
  StackScreenProps<WorkStackParamsList, 'MAIN_DRAWER'>
>;

const ManagementScreen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      title: 'My Work',
    });
  }, [navigation]);

  const status = useMemo(
    () => [
      {id: EWorkStatus.DOING, label: 'Đang làm'},
      {id: EWorkStatus.COMPLETE, label: 'Đã hoàn thành'},
      {id: EWorkStatus.OVERDUE, label: 'Quá hạn'},
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
        formId: EWorkFormID.ASSIGNED,
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

  const [activeIndex, setActiveIndex] = useState(-1);

  const onMorePress = useCallback(
    (id: number) => {
      if (id !== activeIndex) {
        setActiveIndex(id);
      } else {
        setActiveIndex(-1);
      }
    },
    [activeIndex],
  );

  const renderItem: ListRenderItem<TWork> = ({item}) => (
    <WorkItem
      onPress={() => navigation.navigate('DETAIL_WORK', {id: item.id})}
      {...{item}}
      isActive={activeIndex === item.id}
      onMorePress={() => onMorePress(item.id)}
    />
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
