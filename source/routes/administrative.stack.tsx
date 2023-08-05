import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdministrativeScreen from '@/screens/administrative/administrative.screen';
import AdministrativeDetailScreen from '@/screens/administrative/administrative-detail.screen';
import {
  TAdminidtrativeConfig,
  TAdministrativeOrder,
} from '@/modules/administrative/administrative.model';
export type AdministrativeStackParamsList = {
  AdministrativeScreen: {};
  AdministrativeDetailScreen: {
    data: TAdministrativeOrder;
    config: TAdminidtrativeConfig;
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
