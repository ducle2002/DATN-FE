import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');
const ScrollViewChart = ({
  children,
  numberChart = 1,
}: {
  children: React.ReactNode;
  numberChart: number;
}) => {
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.x;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#5BBAEF',
      height: '100%',
      width: 100 / (numberChart - 1),
      borderRadius: 20,
      left: interpolate(
        translateY.value,
        [0, width * (numberChart - 1)],
        [0, 100 - 100 / (numberChart - 1)],
      ),
    };
  });

  return (
    <View>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate={'fast'}
        contentContainerStyle={{marginTop: 10}}>
        {/* <View style={styles.itemContainer}> */}
        {children}

        {/* </View> */}
      </Animated.ScrollView>
      <View
        style={{
          width: 100,
          height: 5,
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: 5,
        }}>
        <Animated.View style={[{}, animatedStyle]} />
      </View>
    </View>
  );
};
export default ScrollViewChart;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 12,
    borderColor: '#f1f2f8',
    shadowOpacity: 0.1,
  },
});
