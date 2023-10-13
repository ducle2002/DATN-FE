import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TakePhotoComponent = () => {
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
              size={layout.width * 0.4}
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

export default TakePhotoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...globalStyles.text16Bold,
  },
});
