import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

type Props = React.ComponentProps<typeof View>;

const BottomContainer = ({children, style, ...props}: Props) => {
  return (
    <SafeAreaView
      style={[{backgroundColor: 'white', shadowOpacity: 0.1, elevation: 10}]}
      {...props}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
