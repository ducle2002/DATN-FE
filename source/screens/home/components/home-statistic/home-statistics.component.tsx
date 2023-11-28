import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import ReflectStatistics from './components/reflect-chart';
import CitizenChart from './components/citizen-chart';
import VoteChart from './components/vote-chart';
import CommunicateChart from './components/communicate-chart';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');
const HomeStatistics = () => {
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.x;
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#5BBAEF',
      height: '100%',
      width: 100 / 4,
      borderRadius: 20,
      left: interpolate(translateY.value, [0, width * 3], [0, 100 - 100 / 4]),
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
        <View style={styles.itemContainer}>
          <ReflectStatistics />
        </View>
        <View style={styles.itemContainer}>
          <CitizenChart />
        </View>
        <View style={styles.itemContainer}>
          <VoteChart />
        </View>
        <View style={styles.itemContainer}>
          <CommunicateChart />
        </View>
      </Animated.ScrollView>
      <View
        style={{
          width: 100,
          height: 5,
          backgroundColor: '#f1f2f8',
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: 5,
        }}>
        <Animated.View style={[{}, animatedStyle]} />
      </View>
    </View>
  );
};
export default HomeStatistics;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    borderWidth: 2,
    marginHorizontal: 10,
    borderColor: '#f1f2f8',
    shadowOpacity: 0.1,
  },
});
