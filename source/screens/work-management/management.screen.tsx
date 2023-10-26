import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import FilterWork from './components/filter';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import WorkItem from './components/work-item.component';
import {EWorkFormID, EWorkStatus, TWork} from './services/work.model';
import CreateWorkComponent from './components/create-work.component';
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';
import {useWorkQuery} from './services/hook';
import Icon from '@/components/icon.component';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackParamsList} from '@/routes/app.stack';
import MainHeader from '@/components/main-header.component';

type Props = CompositeScreenProps<
  StackScreenProps<WorkStackParamsList, 'MAIN_DRAWER'>,
  StackScreenProps<AppStackParamsList, 'WORK_MANAGEMENT'>
>;

const ManagementScreen = ({navigation}: Props) => {
  const renderHeaderRight = useCallback(
    () => (
      <Icon
        type="MaterialCommunityIcons"
        name="account-cog"
        size={30}
        color="#2B5783"
        style={{position: 'absolute', right: 0}}
        onPress={() => navigation.navigate('SETTING_SCREEN')}
      />
    ),
    [navigation],
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: !navigation.canGoBack() ? renderHeaderRight : undefined,
    });
  }, [navigation, renderHeaderRight]);

  const status = useMemo(
    () => [
      {id: undefined, label: 'All'},
      {id: EWorkStatus.TO_DO, label: 'Cần làm'},
      {id: EWorkStatus.DOING, label: 'Đang làm'},
      {id: EWorkStatus.COMPLETE, label: 'Đã hoàn thành'},
      {id: EWorkStatus.OVERDUE, label: 'Quá hạn'},
      {id: EWorkStatus.CANCELED, label: 'Đã hủy'},
    ],
    [],
  );

  const formId = useMemo(
    () => [
      {id: EWorkFormID.RECEIVED, label: 'Được giao'},
      {id: EWorkFormID.ASSIGNED, label: 'Đã giao'},
      {id: EWorkFormID.FOLLOW, label: 'Đang theo dõi'},
    ],
    [],
  );

  const [selectedStatus, selectStatus] = useState(status[0].id);

  const [selectedFormId, selectFormId] = useState(formId[0].id);

  const [keyword, setKeyword] = useState<string>();

  const {data, fetchNextPage, isLoading, remove, refetch} = useWorkQuery({
    selectedFormId: selectedFormId,
    selectedStatus: selectedStatus,
    keyword: keyword,
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
      onPress={() => {
        if (selectedFormId) {
          navigation.navigate('DETAIL_WORK', {
            id: item.id,
            formId: selectedFormId,
          });
        }
      }}
      {...{item, navigation}}
    />
  );

  const {grantedPermissions} = useAppSelector(state => state.config);

  const onRefresh = () => {
    remove();
    refetch();
  };

  const renderHeader = useCallback((props: StackHeaderProps) => {
    return <MainHeader onKeywordChange={kw => setKeyword(kw)} {...props} />;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: renderHeader,
    });
  }, [navigation, renderHeader]);

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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
      {checkPermission(grantedPermissions, [
        'Pages.Operations.TaskManagement.Create',
      ]) && (
        <CreateWorkComponent status={selectedStatus} formId={selectedFormId} />
      )}
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
