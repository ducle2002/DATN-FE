import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScannerView from '@/components/scanner-view';
import {useIsFocused} from '@react-navigation/native';
import AssetQRDetail from './components/asset-qr-detail.component';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';

type Props = StackScreenProps<MaterialAssetStackParamsList, 'QR_SCANNER'>;

const AssetQRScreen = ({navigation}: Props) => {
  const [res, setRes] = useState<string>();

  const onScannedCallback = (result?: string) => {
    if (result) {
      setRes(result);
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setRes(undefined);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScannerView
        onScannedCallback={onScannedCallback}
        active={isFocused && !res}
        isReturnPhoto={false}
        useScanner={!res}
      />
      <AssetQRDetail
        result={res}
        isVisible={!!res}
        onBackdropPress={() => setRes(undefined)}
        navigation={navigation}
      />
    </View>
  );
};

export default AssetQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
