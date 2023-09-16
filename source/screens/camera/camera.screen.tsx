import {NativeModules, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Icon from '@/components/icon.component';

const {ExampleModule} = NativeModules;

type Props = {};

const CameraScreen = (props: Props) => {
  useEffect(() => {
    Camera.getCameraPermissionStatus().then(result => {
      console.log(result);
      if (result !== 'authorized') {
        Camera.requestCameraPermission();
      }
    });
  }, []);

  const devices = useCameraDevices('wide-angle-camera');

  // console.log(devices);

  // const back = devices.back;

  return (
    <View style={styles.container}>
      {/* {back && (
        <Camera device={back} style={StyleSheet.absoluteFill} isActive={true} />
      )} */}
      <Icon
        type="Ionicons"
        name="radio-button-on"
        size={50}
        color={'white'}
        style={{marginTop: 'auto'}}
        onPress={() => {
          console.log(ExampleModule);
          ExampleModule.getParamsFromJS('100');
        }}
      />
      <View />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
