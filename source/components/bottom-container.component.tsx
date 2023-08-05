import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';

type Props = React.ComponentProps<typeof View>;

const BottomContainer = ({children, style, ...props}: Props) => {
  return (
    <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
      <SafeAreaView
        style={[{backgroundColor: 'white', shadowOpacity: 0.1, elevation: 10}]}
        {...props}>
        <View style={[styles.container, style]}>{children}</View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
    width: '100%',
  },
});
