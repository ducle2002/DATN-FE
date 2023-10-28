import {TBooking} from '@/screens/local-service/services/local-service.model';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LocalServiceManagementScreen from '@/screens/local-service-management/local-service-management.screen';
export type LocalServiceManagementStackParamsList = {
  MAIN_SCREEN: undefined;
  //   BOOKING_SCREEN: {storeId: number};
  //   DETAIL_BOOKING_SCREEN: {
  //     booking: TBooking;
  //   };
};

const Stack = createStackNavigator<LocalServiceManagementStackParamsList>();

const LocalServiceManagementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={LocalServiceManagementScreen}
        options={{
          title: 'Danh sách yêu cầu dịch vụ',
        }}
      />
      {/* <Stack.Screen name="BOOKING_SCREEN" component={BookingScreen} />
      <Stack.Screen
        name="DETAIL_BOOKING_SCREEN"
        component={BookingDetailScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default LocalServiceManagementStack;
