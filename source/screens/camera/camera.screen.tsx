import {StyleSheet, View} from 'react-native';
import React from 'react';

import ScannerView from '@/components/scanner-view';
import {Barcode} from 'vision-camera-code-scanner';

const CameraScreen = () => {
  const onScannedCallback = (result: Array<Barcode>, params) => {
    console.log(result, params);
  };
  return (
    <View style={styles.container}>
      <ScannerView
        hasCaptureButton={true}
        onScannedCallback={onScannedCallback}
      />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
