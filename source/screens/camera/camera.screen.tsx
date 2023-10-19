import {Dimensions, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ScannerView from '@/components/scanner-view';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import {Chip} from 'react-native-paper';
const {width} = Dimensions.get('screen');
type Props = StackScreenProps<AppStackParamsList, 'CAMERA_SCREEN'>;

const CameraScreen = ({route}: Props) => {
  const isReturnPhoto = route.params?.isReturnPhoto;
  const [res, setRes] = useState<string>();

  const onScannedCallback = (result?: string, params?: any) => {
    if (result) {
      Linking.canOpenURL(result).then(canOpen => {
        if (canOpen) {
          Linking.openURL(result);
        }
      });

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
        active={isFocused}
        isReturnPhoto={isReturnPhoto}
        useScanner={!res}
      />
      {res && (
        <View
          style={{
            position: 'absolute',
            top: '60%',
            left: '50%',
            width: width * 0.5,
            transform: [{translateX: -width * 0.25}],
          }}>
          <Chip
            onPress={() => {}}
            closeIcon={'close-circle'}
            onClose={() => setRes(undefined)}>
            <Text>{res}</Text>
          </Chip>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
