import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

type Props = React.ComponentProps<typeof View> & {
  contentContainer?: ViewStyle;
};

const BackgroundHeader = ({contentContainer, children}: Props) => {
  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      blurRadius={1}
      style={styles.container}
      imageStyle={styles.imageContainer}>
      <SafeAreaView
        style={[
          {backgroundColor: '#091D66B2'},
          styles.contentContainer,
          contentContainer,
        ]}>
        <View
          style={{
            paddingBottom: 16,
            paddingTop: Platform.OS === 'android' ? 16 : 0,
          }}>
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BackgroundHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
});
