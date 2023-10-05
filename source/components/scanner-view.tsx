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
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';
import globalStyles from '@/config/globalStyles';
const {width} = Dimensions.get('screen');

type Props = {
  onScannedCallback?: (result?: string, params?: any) => void;
  hasCaptureButton?: boolean;
  active?: boolean;
  isReturnPhoto?: boolean;
};

const ScannerView = ({
  onScannedCallback,
  hasCaptureButton,
  active = true,
  isReturnPhoto,
}: Props) => {
  const [hasPermission, setPermission] = useState(false);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(result => {
      if (result !== 'authorized') {
        Camera.requestCameraPermission().then(r => {
          if (r === 'authorized') {
            setPermission(true);
          }
        });
      } else {
        setPermission(true);
      }
    });
  }, []);

  const takePhoto = () => {
    camera.current?.takePhoto().then(result => {
      if (onScannedCallback) {
        onScannedCallback(undefined, {
          image: {
            ...result,
            path: Platform.OS === 'ios' ? result.path : 'file://' + result.path,
          },
        });
      }
    });
  };

  const [code, setCode] = useState<string>();

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarCodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    if (detectedBarCodes.length > 0) {
      runOnJS(setCode)(detectedBarCodes[0].displayValue);
    }
  }, []);

  useEffect(() => {
    if (code) {
      if (isReturnPhoto) {
        camera.current?.takePhoto().then(result => {
          if (onScannedCallback) {
            onScannedCallback(code, {image: result});
          }
        });
        return;
      }
      if (onScannedCallback) {
        onScannedCallback(code);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, isReturnPhoto]);

  useEffect(() => {
    if (!active) {
      setCode(undefined);
    }
  }, [active]);

  const devices = useCameraDevices();
  const back = devices.back;

  return (
    <>
      {hasPermission ? (
        <View style={styles.container}>
          {back && (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={back}
              isActive={active}
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
              size={width * 0.4}
            />
          </View>
          <SafeAreaView
            style={{width: '100%', marginTop: 'auto', alignItems: 'center'}}>
            {hasCaptureButton && (
              <Icon
                type="Ionicons"
                name="radio-button-on-outline"
                size={70}
                color={'white'}
                onPress={takePhoto}
              />
            )}
          </SafeAreaView>
        </View>
      ) : (
        <SafeAreaView
          style={[
            styles.container,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={styles.text}>
            No permission to use the camera is granted
          </Text>
        </SafeAreaView>
      )}
    </>
  );
};

export default ScannerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...globalStyles.text16Bold,
  },
});
