import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StatisticScreen from '@/screens/statistic/statistic.screen';
import FeedbackStatisticScreen from '@/screens/statistic/feedback-statistic.screen';
import CitizenStatisticScreen from '@/screens/statistic/citizen-statistic.screen';
import InvoiceStatisticScreen from '@/screens/statistic/invoice-statistic.screen';
import WorkStatisticScreen from '@/screens/statistic/work-statistic.screen';
export type StatisticStackParamsList = {
  MAIN_SCREEN: undefined;
  FEEDBACK_STATISTIC: undefined;
  CITIZEN_STATISTIC: undefined;
  INVOICE_STATISTIC: undefined;
  WORK_STATISTIC: undefined;
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
          title: 'Báo cáo thống kê',
        }}
      />
      <Stack.Screen
        name="FEEDBACK_STATISTIC"
        component={FeedbackStatisticScreen}
        options={{
          title: 'Thống kê phản ánh',
        }}
      />
      <Stack.Screen
        name="CITIZEN_STATISTIC"
        component={CitizenStatisticScreen}
        options={{
          title: 'Thống kê cư dân',
        }}
      />
      <Stack.Screen
        name="INVOICE_STATISTIC"
        component={InvoiceStatisticScreen}
        options={{
          title: 'Thống kê thu chi',
        }}
      />
      <Stack.Screen
        name="WORK_STATISTIC"
        component={WorkStatisticScreen}
        options={{
          title: 'Thống kê công việc',
        }}
      />
    </Stack.Navigator>
  );
};

export default StatisticStack;
