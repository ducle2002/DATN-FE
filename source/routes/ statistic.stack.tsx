import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StatisticScreen from '@/screens/statistic/statistic.screen';
import FeedbackStatisticScreen from '@/screens/statistic/feedback-statistic.screen';
export type StatisticStackParamsList = {
  MAIN_SCREEN: undefined;
  FEEDBACK_STATISTIC: undefined;
};

const Stack = createStackNavigator<StatisticStackParamsList>();
const StatisticStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={StatisticScreen}
        options={{
          title: 'Báo cáo thông kê',
        }}
      />
      <Stack.Screen
        name="FEEDBACK_STATISTIC"
        component={FeedbackStatisticScreen}
        options={{
          title: 'Thống kê phản ánh',
        }}
      />
    </Stack.Navigator>
  );
};

export default StatisticStack;

const styles = StyleSheet.create({});
