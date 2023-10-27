import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import ReactNativeModal from 'react-native-modal';
import {useAssetById} from '../hooks/hook';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import {StackNavigationProp} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';

type Props = {
  isVisible: boolean;
  result?: string;
  onBackdropPress: () => void;
  navigation: StackNavigationProp<MaterialAssetStackParamsList, 'QR_SCANNER'>;
};

const getSearchParamFromURL = (url: string, param: string) => {
  const include = url.includes(param);

  if (!include) {
    return null;
  }

  const params = url.split(/([&,?,=])/);
  const index = params.indexOf(param);
  const value = params[index + 2];
  return value;
};

const AssetQRDetail = ({
  isVisible,
  result = '',
  onBackdropPress = () => {},
  navigation,
}: Props) => {
  const id = useMemo(() => {
    if (result) {
      return getSearchParamFromURL(result, 'id');
    }
    return undefined;
  }, [result]);

  const data = useAssetById(Number(id));

  return (
    <ReactNativeModal isVisible={isVisible} style={{margin: 0}}>
      <SafeAreaView style={{height: '100%'}}>
        <View style={{marginTop: 'auto', backgroundColor: 'white'}}>
          <View style={styles.container}>
            <Text style={styles.textTitle}>{data?.title}</Text>
            {data?.trangThaiText && (
              <Text style={styles.textValue}>
                {language.t(languageKeys.materialAsset.materialDetail.status)}:{' '}
                {data?.trangThaiText}
              </Text>
            )}
            {data?.blockText && (
              <Text style={styles.textValue}>
                {language.t(languageKeys.materialAsset.materialDetail.block)}:{' '}
                {data?.blockText}
              </Text>
            )}
            {data?.buildingText && (
              <Text style={styles.textValue}>
                {language.t(languageKeys.materialAsset.materialDetail.building)}
                : {data?.buildingText}
              </Text>
            )}
            {data?.apartmentText && (
              <Text style={styles.textValue}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.apartment,
                )}
                : {data?.apartmentText}
              </Text>
            )}
            {data?.floorText && (
              <Text style={styles.textValue}>
                {language.t(languageKeys.materialAsset.materialDetail.floor)}:{' '}
                {data?.floorText}
              </Text>
            )}
            <Text style={styles.textValue}>
              {language.t(languageKeys.materialAsset.materialDetail.note)}:{' '}
              {data?.ghiChu}
            </Text>
          </View>
          <BottomContainer>
            <ScrollView horizontal>
              <View style={styles.buttonGroupContainer}>
                <Button
                  mode="outlined"
                  onPress={onBackdropPress}
                  style={{marginHorizontal: 5}}>
                  {language.t(languageKeys.shared.button.back)}
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    onBackdropPress();
                    navigation.navigate('DETAIL_TAB', {
                      id: Number(id),
                      screen: 'DETAIL_SCREEN',
                      params: {id: Number(id)},
                    });
                  }}
                  style={{marginHorizontal: 5}}>
                  {language.t(languageKeys.materialAsset.header.detail)}
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    onBackdropPress();
                    navigation.navigate('DETAIL_TAB', {
                      id: Number(id),
                      screen: 'MAINTENANCE_HISTORY',
                      params: {id: Number(id)},
                    });
                  }}
                  style={{marginHorizontal: 5}}>
                  {language.t(
                    languageKeys.materialAsset.header.maintenanceHistory,
                  )}
                </Button>
              </View>
            </ScrollView>
          </BottomContainer>
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default AssetQRDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '60%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textTitle: {
    ...globalStyles.text17Bold,
    textAlign: 'center',
  },
  textValue: {
    ...globalStyles.text16Medium,
  },
});
