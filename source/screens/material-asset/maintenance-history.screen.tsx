import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {
  AssetDetailTabParamsList,
  MaterialAssetStackParamsList,
} from '@/routes/material-asset.stack';
import {StackScreenProps} from '@react-navigation/stack';
import {useMaintenanceHistory} from './hooks/hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import {TMaintenanceHistory} from './services/material-asset.model';
import HistoryItem from './components/history-item.component';
import BottomContainer from '@/components/bottom-container.component';
import AssetHistoryCreate from './components/asset-history-create.component';
// import Button from '@/components/button.component';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<AssetDetailTabParamsList, 'MAINTENANCE_HISTORY'>,
  CompositeScreenProps<
    StackScreenProps<MaterialAssetStackParamsList, 'DETAIL_TAB'>,
    StackScreenProps<AppStackParamsList, 'MATERIAL_ASSET_STACK'>
  >
>;

const MaintenanceHistoryScreen = ({route, navigation}: Props) => {
  const id = route.params.id;
  const {data, remove, refetch, status} = useMaintenanceHistory({assetId: id});
  const dataProvider = useMemo(
    () =>
      dataProviderMaker(
        data ? flatten(map(page => page.history, data.pages)) : [],
      ),
    [data],
  );

  const renderItem: ListRenderItem<TMaintenanceHistory> = ({item}) => {
    return <HistoryItem {...{item}} />;
  };
  const onRefresh = () => {
    remove();
    refetch();
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{paddingTop: 10}}
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Không có lịch sử</Text>}
        refreshControl={
          <RefreshControl
            refreshing={status === 'loading'}
            onRefresh={onRefresh}
          />
        }
      />
      <BottomContainer>
        <View>
          <AssetHistoryCreate assetId={id} />
          {/* <Button
            onPress={() => {
              navigation.navigate('WORK_MANAGEMENT', {
                screen: 'CREATE_WORK',
              });
            }}>
            Bảo trì
          </Button> */}
        </View>
      </BottomContainer>
    </View>
  );
};

export default MaintenanceHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
