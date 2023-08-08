import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('screen');

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'#fff'} />
      <Text style={styles.txt}>Đang tải</Text>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: width * 0.35,
    top: height * 0.5 - width * 0.15,
    width: width * 0.3,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
  },
  txt: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});
