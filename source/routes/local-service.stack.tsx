import BookingScreen from '@/screens/local-service/booking.screen';
import LocalServiceScreen from '@/screens/local-service/local-service.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
export type LocalServiceStackParamsList = {
  MAIN_SCREEN: undefined;
  BOOKING_SCREEN: {storeId: number};
};

const Stack = createStackNavigator<LocalServiceStackParamsList>();

const LocalServiceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="MAIN_SCREEN" component={LocalServiceScreen} />
      <Stack.Screen name="BOOKING_SCREEN" component={BookingScreen} />
    </Stack.Navigator>
  );
};

export default LocalServiceStack;
