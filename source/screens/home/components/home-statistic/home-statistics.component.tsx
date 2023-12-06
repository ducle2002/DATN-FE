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
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';
import InvoiceChart from './components/invoice-chart';
import WorkChart from './components/work-chart';
import PersonalWorkChart from './components/personal-work-chart';
const {width} = Dimensions.get('screen');
const HomeStatistics = () => {
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.x;
  });

  const {grantedPermissions} = useAppSelector(state => state.config);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#5BBAEF',
      height: '100%',
      width: 100 / 5,
      borderRadius: 20,
      left: interpolate(translateY.value, [0, width * 5], [0, 100 - 100 / 5]),
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
        {checkPermission(['Pages.Reporting.Invoice'], grantedPermissions) && (
          <View style={styles.itemContainer}>
            <InvoiceChart />
          </View>
        )}
        {checkPermission(
          ['Pages.Reporting.WorkManagement'],
          grantedPermissions,
        ) && (
          <View style={styles.itemContainer}>
            <WorkChart />
          </View>
        )}
        <View style={styles.itemContainer}>
          <PersonalWorkChart />
        </View>
        {checkPermission(
          ['Pages.Reporting.Overview.CitizenReflect'],
          grantedPermissions,
        ) && (
          <View style={styles.itemContainer}>
            <ReflectStatistics />
          </View>
        )}
        {checkPermission(['Pages.Reporting.Citizen'], grantedPermissions) && (
          <View style={styles.itemContainer}>
            <CitizenChart />
          </View>
        )}
        {checkPermission(
          ['Pages.Reporting.Overview.CitizenVote'],
          grantedPermissions,
        ) && (
          <View style={styles.itemContainer}>
            <VoteChart />
          </View>
        )}
        {checkPermission(
          ['Pages.Reporting.Overview.CitizenChat'],
          grantedPermissions,
        ) && (
          <View style={styles.itemContainer}>
            <CommunicateChart />
          </View>
        )}
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
