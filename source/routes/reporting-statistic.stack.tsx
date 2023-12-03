import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainReportScreen from '@/screens/report-statistic/main.screen';

export type ReportStatisticStackParamsList = {
  MAIN: undefined;
};

const Stack = createStackNavigator<ReportStatisticStackParamsList>();
const ReportStatisticStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MAIN" component={MainReportScreen} />
    </Stack.Navigator>
  );
};

export default ReportStatisticStack;
