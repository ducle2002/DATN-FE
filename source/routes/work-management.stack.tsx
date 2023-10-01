import AssignmentScreen from '@/screens/work-management/assignment.screen';
import ManagementScreen from '@/screens/work-management/management.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type WorkManagementStackParamsList = {
  MANAGEMENT: undefined;
  ASSIGNMENT: undefined;
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
    </Stack.Navigator>
  );
};

export default WorkManagementStack;
