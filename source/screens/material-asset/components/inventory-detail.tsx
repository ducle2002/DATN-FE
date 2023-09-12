import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  TInventory,
  TMaterialAsset,
} from '@/modules/material-asset/material-asset.model';
import ReactNativeModal from 'react-native-modal';
import {useInfiniteQuery} from 'react-query';
import MaterialAssetApi from '@/modules/material-asset/material-asset.service';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import globalStyles from '@/config/globalStyles';
import AddMaterialInventory from './add-material-inventory';

type Props = {
  inventory: TInventory | undefined;
  onBackdropPress: () => void;
};

const InventoryDetail = ({inventory, onBackdropPress}: Props) => {
  const {data} = useInfiniteQuery({
    queryKey: ['material-inventory', inventory?.id],
    queryFn: ({pageParam}) =>
      MaterialAssetApi.getAllMaterialInventory({
        ...pageParam,
        locationId: inventory?.id,
        maxResultCount: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.materials.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
    staleTime: 300000,
  });

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.materials, data.pages)) : [],
    );
  }, [data]);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const renderItem: ListRenderItem<TMaterialAsset> = ({item}) => (
    <View style={styles.row}>
      <Text style={[{flex: 2}, styles.textValue]}>{item.materialName}</Text>
      <Text style={[{flex: 1}, styles.textValue]}>{item.materialCode}</Text>
      <Text style={[{flex: 1}, styles.textValue]}>{item.amount}</Text>
      <Text style={[{flex: 1}, styles.textValue]}>
        {Intl.NumberFormat('vi', {style: 'currency', currency: 'vnd'}).format(
          item.totalPrice,
        )}
      </Text>
    </View>
  );
  const renderHeader = () => (
    <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
      <Text style={[styles.textLabel, {flex: 2}]}>
        {language.t(languageKeys.materialAsset.materialDetail.assetName)}
      </Text>
      <Text style={[styles.textLabel, {flex: 1}]}>
        {language.t(languageKeys.materialAsset.materialDetail.assetCode)}
      </Text>
      <Text style={[styles.textLabel, {flex: 1}]}>
        {language.t(languageKeys.materialAsset.materialDetail.amount)}
      </Text>
      <Text style={[styles.textLabel, {flex: 1}]}>
        {language.t(languageKeys.materialAsset.materialDetail.totalValue)}
      </Text>
    </View>
  );
  return (
    <ReactNativeModal
      style={{margin: 0}}
      isVisible={!!inventory}
      onBackdropPress={onBackdropPress}>
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={renderHeader}
          stickyHeaderIndices={[0]}
          data={dataProvider.getAllData()}
          renderItem={renderItem}
        />
        {inventory && (
          <AddMaterialInventory
            isVisible={isVisible}
            onBackdropPress={toggleVisible}
            inventoryId={inventory.id}
          />
        )}

        <BottomContainer>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={onBackdropPress}>
              {language.t(languageKeys.shared.button.back)}
            </Button>
            <Button onPress={toggleVisible}>
              {language.t(languageKeys.shared.button.add)}
            </Button>
          </View>
        </BottomContainer>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default InventoryDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 'auto',
    height: '100%',
  },
  textLabel: {
    ...globalStyles.text15Bold,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
