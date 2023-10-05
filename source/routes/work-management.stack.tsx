import LogTimeWorkScreen from '@/screens/work-management/log-time-work.screen';
import AssignmentScreen from '@/screens/work-management/assignment.screen';
import ManagementScreen from '@/screens/work-management/management.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type WorkManagementStackParamsList = {
  MANAGEMENT: undefined;
  ASSIGNMENT: undefined;
  LOGTIME: undefined;
};
const Stack = createStackNavigator<WorkManagementStackParamsList>();

const WorkManagementStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MANAGEMENT"
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="MANAGEMENT" component={ManagementScreen} />
      <Stack.Screen name="ASSIGNMENT" component={AssignmentScreen} />
      <Stack.Screen name="LOGTIME" component={LogTimeWorkScreen} />
    </Stack.Navigator>
  );
};

export default WorkManagementStack;
