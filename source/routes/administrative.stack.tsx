import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdministrativeScreen from '@/screens/administrative/administrative.screen';
import AdministrativeDetailScreen from '@/screens/administrative/administrative-detail.screen';

export type AdministrativeStackParamsList = {
  AdministrativeScreen: {};
  AdministrativeDetailScreen: {
    id: number;
  };
};
const Stack = createStackNavigator<AdministrativeStackParamsList>();

const AdministrativeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={'AdministrativeScreen'}
        component={AdministrativeScreen}
      />
      <Stack.Screen
        name={'AdministrativeDetailScreen'}
        component={AdministrativeDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default AdministrativeStack;
