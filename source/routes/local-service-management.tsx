import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LocalServiceManagementScreen from '@/screens/local-service-management/local-service-management.screen';
import {TLocalServiceManagementOrder} from '@/screens/local-service-management/services/local-service-management.model';
import DetailLocalServiceManageOrder from '@/screens/local-service-management/detail-local-service-manage-order';
export type LocalServiceManagementStackParamsList = {
  MAIN_SCREEN: undefined;
  //   BOOKING_SCREEN: {storeId: number};
  DETAIL_ORDER_SCREEN: {
    orderInfo: TLocalServiceManagementOrder;
  };
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
      <Stack.Screen
        name="DETAIL_ORDER_SCREEN"
        component={DetailLocalServiceManageOrder}
        options={{
          title: 'Chi tiết dịch vụ được đặt',
        }}
      />
      {/* <Stack.Screen
        name="DETAIL_BOOKING_SCREEN"
        component={BookingDetailScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default LocalServiceManagementStack;
