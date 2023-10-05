import {Linking, StyleSheet, View} from 'react-native';
import React from 'react';

import ScannerView from '@/components/scanner-view';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = StackScreenProps<AppStackParamsList, 'CAMERA_SCREEN'>;

const CameraScreen = ({route}: Props) => {
  const isReturnPhoto = route.params?.isReturnPhoto;

  const onScannedCallback = (result?: string, params?: any) => {
    if (result?.includes('yooioc://water-bill/add')) {
      Linking.openURL(result + `&image=${JSON.stringify(params.image)}`);
    }
  };
  const isFocused = useIsFocused();
  return (
    <View style={styles.container}>
      <ScannerView
        onScannedCallback={onScannedCallback}
        active={isFocused}
        isReturnPhoto={isReturnPhoto}
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
