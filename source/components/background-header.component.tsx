import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height} = Dimensions.get('screen');

type Props = React.ComponentProps<typeof View>;

const BackgroundHeader = ({children}: Props) => {
  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      blurRadius={5}
      style={styles.container}
      imageStyle={styles.imageContainer}>
      <SafeAreaView
        style={[
          {flex: 1, backgroundColor: '#091D66B2'},
          styles.contentContainer,
        ]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BackgroundHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: height * 0.2,
    overflow: 'hidden',
  },
  imageContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 16,
  },
});
