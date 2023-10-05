import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import MaterialAssetApi from '@/screens/material-asset/services/material-asset.service';
import {TInventory} from '@/screens/material-asset/services/material-asset.model';
import InventoryCard from './components/inventory-card';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
const {width, height} = Dimensions.get('screen');
import {flatten, map} from 'ramda';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import InventoryDetail from './components/inventory-detail';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {MaterialTabParamsList} from './main.screen';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import language, {languageKeys} from '@/config/language/language';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialTabParamsList, 'INVENTORY'>,
  StackScreenProps<MaterialAssetStackParamsList, 'MAIN_SCREEN'>
>;

const InventoryTab = ({navigation}: Props) => {
  const [selectedInventory, selectInventory] = useState<
    TInventory | undefined
  >();

  const {data} = useInfiniteQuery({
    queryKey: ['inventory'],
    queryFn: () => MaterialAssetApi.getAllInventory(),
  });

  const renderItem = (_: any, item: TInventory) => (
    <InventoryCard inventory={item} onPress={() => selectInventory(item)} />
  );

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.inventories, data.pages)) : [],
    );
  }, [data]);

  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
        dim.height = height / 6;
      },
    ),
  ).current;

  return (
    <View style={styles.container}>
      <RecyclerListView
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={renderItem}
        contentContainerStyle={{paddingTop: 10}}
      />
      <InventoryDetail
        inventory={selectedInventory}
        onBackdropPress={() => selectInventory(undefined)}
      />
      <BottomContainer>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('IMPORT_EXPORT', {type: 'IMPORT'})
            }>
            {language.t(languageKeys.materialAsset.docs.importInventory)}
          </Button>
          <Button
            onPress={() =>
              navigation.navigate('IMPORT_EXPORT', {type: 'EXPORT'})
            }
            mode="contained">
            {language.t(languageKeys.materialAsset.docs.exportInventory)}
          </Button>
        </View>
      </BottomContainer>
    </View>
  );
};

export default InventoryTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
