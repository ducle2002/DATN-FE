import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
const {height} = Dimensions.get('screen');
import ChatIcon from 'assets/icons/chat.svg';

const HomeHeader = () => {
  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      blurRadius={5}
      style={{
        width: '100%',
        height: height * 0.3,
        overflow: 'hidden',
      }}
      imageStyle={{
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}>
      <SafeAreaView
        style={{
          backgroundColor: '#091D66B2',
          flex: 1,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />
    </ImageBackground>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
