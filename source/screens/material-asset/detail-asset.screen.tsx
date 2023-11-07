import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  AssetDetailTabParamsList,
  MaterialAssetStackParamsList,
} from '@/routes/material-asset.stack';
import {useAssetById, useDeleteAsset} from './hooks/hook';
import MaterialDetail from './components/material-detail';
import Button from '@/components/button.component';
import BottomContainer from '@/components/bottom-container.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';
import {Dialog} from 'react-native-paper';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<AssetDetailTabParamsList, 'DETAIL_SCREEN'>,
  StackScreenProps<MaterialAssetStackParamsList, 'DETAIL_TAB'>
>;

const DetailAssetScreen = ({navigation, route}: Props) => {
  const id = route.params.id;
  const material = useAssetById(id);
  const {grantedPermissions} = useAppSelector(state => state.config);
  useEffect(() => {
    if (material) {
      navigation.getParent()?.setOptions({
        title: material.title,
      });
    }
  }, [material, navigation]);

  const {deleteAsset} = useDeleteAsset({
    onSuccessCallback: () => {
      navigation.goBack();
    },
  });
  const [editable, setEditable] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.assetName)}
          </Text>
          <Text style={styles.textValue}>{material?.title}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.assetCode)}
          </Text>
          <Text style={styles.textValue}>{material?.code}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.form)}
          </Text>
          <Text style={styles.textValue}>{material?.hinhThucText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.status)}
          </Text>
          <Text style={styles.textValue}>{material?.trangThaiText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.systemCode)}
          </Text>
          <Text style={styles.textValue}>{material?.maHeThongText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.assetGroup)}
          </Text>
          <Text style={styles.textValue}>{material?.nhomTaiSanText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.block)}
          </Text>
          <Text style={styles.textValue}>{material?.blockText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.floor)}
          </Text>
          <Text style={styles.textValue}>{material?.floorText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.building)}
          </Text>
          <Text style={styles.textValue}>{material?.buildingText}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.amount)}
          </Text>
          <Text style={styles.textValue}>{material?.soLuong}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.totalValue)}
          </Text>
          <Text style={styles.textValue}>{material?.giaTriTaiSan}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.startDate)}
          </Text>
          <Text style={styles.textValue}>
            {moment(material?.ngayBatDau).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.endDate)}
          </Text>
          <Text style={styles.textValue}>
            {material?.ngayKetThuc &&
              moment(material?.ngayKetThuc).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.materialDetail.description)}
          </Text>
          <Text style={styles.textValue}>{material?.ghiChu}</Text>
        </View>

        <BottomContainer>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {checkPermission(grantedPermissions, [
              'Pages.Assets.AssetCatalog.Edit',
            ]) && (
              <Button
                mode="contained"
                onPress={() => setEditable(true)}
                style={{flex: 0.4}}>
                {language.t(languageKeys.shared.button.edit)}
              </Button>
            )}

            {checkPermission(grantedPermissions, [
              'Pages.Assets.AssetCatalog.Delete',
            ]) && (
              <Button
                mode="contained-tonal"
                onPress={() => setIsVisible(true)}
                style={{flex: 0.4}}>
                {language.t(languageKeys.shared.button.delete)}
              </Button>
            )}
          </View>
        </BottomContainer>
      </View>
      <MaterialDetail
        onBackdropPress={() => {
          setEditable(false);
        }}
        materialId={editable ? id : undefined}
      />
      <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
        <Dialog.Title>
          <Text style={[styles.textValue, {flex: 0}]}>Bạn có muốn xóa</Text>
        </Dialog.Title>
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            style={styles.button}
            onPress={() => setIsVisible(false)}>
            {language.t(languageKeys.shared.button.cancel)}
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              deleteAsset(id);
            }}>
            {language.t(languageKeys.shared.button.delete)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

export default DetailAssetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textLabel: {
    flex: 1,
    ...globalStyles.text16Medium,
  },
  textValue: {
    flex: 1,
    ...globalStyles.text16Bold,
  },
  button: {
    paddingHorizontal: 10,
    marginLeft: 20,
  },
});
