import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Icon from '@/components/icon.component';
import {HomeScreenProps} from '../home.screen';
const {height} = Dimensions.get('screen');

const HomeHeader = ({navigation}: HomeScreenProps) => {
  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      blurRadius={5}
      style={styles.container}
      imageStyle={styles.imageContainer}>
      <SafeAreaView style={styles.contentContainer}>
        <Icon
          type="Ionicons"
          name="settings-sharp"
          size={30}
          color={'white'}
          style={{padding: 5}}
          onPress={() => {
            navigation.navigate('SETTING_SCREEN');
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.3,
    overflow: 'hidden',
  },
  imageContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    backgroundColor: '#091D66B2',
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
