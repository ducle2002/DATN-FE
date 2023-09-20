import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from './icon.component';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {Barcode, BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';
import FastImage from 'react-native-fast-image';
const {width} = Dimensions.get('screen');

type Props = {
  onScannedCallback?: (result: Array<Barcode>, params?: any) => void;
  hasCaptureButton: boolean;
};

const ScannerView = ({onScannedCallback, hasCaptureButton}: Props) => {
  const [hasPermission, setPermission] = useState(false);
  const camera = useRef<Camera>(null);
  const [path, setPath] = useState('');

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(result => {
      if (result !== 'authorized') {
        Camera.requestCameraPermission();
      } else {
        setPermission(true);
      }
    });
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarCodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    if (detectedBarCodes.length > 0) {
      if (onScannedCallback) {
        runOnJS(onScannedCallback)(detectedBarCodes);
      }
    }
  }, []);

  const devices = useCameraDevices();
  const back = devices.back;

  const takePhoto = () => {
    camera.current?.takePhoto().then(result => {
      setPath(Platform.OS === 'ios' ? result.path : 'file://' + result.path);
    });
  };

  if (hasPermission) {
    return (
      <View style={styles.container}>
        {back && (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={back}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={1}
            photo={true}
          />
        )}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type="Ionicons"
            name="scan-outline"
            color={'white'}
            size={width * 0.6}
          />
        </View>
        <SafeAreaView
          style={{width: '100%', marginTop: 'auto', alignItems: 'center'}}>
          {path !== '' && (
            <View style={{backgroundColor: 'white'}}>
              <FastImage
                source={{uri: path}}
                style={{width: 100, height: 100}}
              />
            </View>
          )}
          {hasCaptureButton && (
            <Icon
              type="Ionicons"
              name="radio-button-on-outline"
              size={80}
              color={'white'}
              onPress={takePhoto}
            />
          )}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View>
      <Text>No permission to use the camera is granted</Text>
    </View>
  );
};

export default ScannerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
