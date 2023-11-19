import {
  LayoutRectangle,
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
import globalStyles from '@/config/globalStyles';
import {TImagePicker} from '@/utils/image-picker-handle';

type Props = {
  onScannedCallback?: (result?: string, params?: any) => void;
  hasCaptureButton?: boolean;
  active?: boolean;
  isReturnPhoto?: boolean;
  useScanner?: boolean;
  onTakeImageCallback?: (image: TImagePicker) => void;
};

const ScannerView = ({
  onScannedCallback,
  hasCaptureButton,
  active = true,
  isReturnPhoto,
  useScanner = true,
  onTakeImageCallback,
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
      fetch((Platform.OS === 'android' ? 'file://' : '') + result.path).then(
        (img: any) => {
          if (img && result) {
            if (onTakeImageCallback) {
              onTakeImageCallback({
                name: img?._bodyBlob?._data.name,
                width: result.width,
                height: result.height,
                type: img?._bodyBlob?._data.type,
                size: img?._bodyBlob?._data.size,
                uri: (Platform.OS === 'android' ? 'file://' : '') + result.path,
                source:
                  (Platform.OS === 'android' ? 'file://' : '') + result.path,
              });
            }
          }
        },
      );
    });
  };

  const [code, setCode] = useState<Barcode>();

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarCodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], {
      checkInverted: true,
    });
    if (detectedBarCodes.length > 0) {
      runOnJS(setCode)(detectedBarCodes[0]);
    }
  }, []);

  useEffect(() => {
    if (code) {
      if (isReturnPhoto) {
        camera.current?.takePhoto().then(result => {
          if (onScannedCallback) {
            onScannedCallback(code.displayValue, {image: result});
          }
        });
        return;
      }
      if (onScannedCallback) {
        onScannedCallback(code.displayValue);
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

  const [layout, setLayout] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  return (
    <>
      {hasPermission ? (
        <View
          onLayout={({nativeEvent}) => {
            setLayout(nativeEvent.layout);
          }}
          style={styles.container}>
          {back && (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={back}
              isActive={active}
              frameProcessor={useScanner && active ? frameProcessor : undefined}
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
              size={layout.width * 0.4}
            />
          </View>
          <SafeAreaView
            style={{width: '100%', marginTop: 'auto', alignItems: 'center'}}>
            {(hasCaptureButton || onTakeImageCallback) && (
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
