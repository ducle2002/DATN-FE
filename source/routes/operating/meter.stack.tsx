import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import ListMeterScreen from '@/screens/meter-management/list-meter.screen';
import MeterIndexScreen from '@/screens/meter-management/meter-index.screen';
import ReadIndexMeterScreen from '@/screens/meter-management/read-index.screen';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerToggleButton,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import MonthlyDetailScreen from '@/screens/meter-management/monthly-detail.screen';
import MeterDetailScreen from '@/screens/meter-management/meter-detail.screen';
import {useLogout} from '@/screens/authentication/services/auth.hook';

export type MeterStackParamsList = {
  READ_INDEX: {
    meterTypeId?: number;
    id?: number;
  };
  MAIN_SCREEN: NavigatorScreenParams<MeterDrawerParamsList>;
  MONTHLY_DETAIL: {id: number};
  METER_DETAIL: {id: number};
};

export type MeterDrawerParamsList = {
  LIST_METER: undefined;
  LIST_INDEX: undefined;
};

const Drawer = createDrawerNavigator<MeterDrawerParamsList>();
const MainDrawer = () => {
  const {logout} = useLogout();

  const renderDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Đăng xuất" onPress={() => logout()} />
      </DrawerContentScrollView>
    );
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}
      drawerContent={renderDrawerContent}>
      <Drawer.Screen
        name="LIST_METER"
        component={ListMeterScreen}
        options={{
          title: 'Danh sách đồng hồ',
        }}
      />
      <Drawer.Screen
        name="LIST_INDEX"
        component={MeterIndexScreen}
        options={{
          title: 'Bản ghi chỉ số',
        }}
      />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator<MeterStackParamsList>();

const MeterStack = () => {
  const renderDrawerToggleButton = () => <DrawerToggleButton />;
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={MainDrawer}
        options={{
          headerRight: renderDrawerToggleButton,
        }}
      />
      <Stack.Screen
        name="READ_INDEX"
        component={ReadIndexMeterScreen}
        options={{title: 'Ghi chỉ số'}}
      />
      <Stack.Screen
        name="MONTHLY_DETAIL"
        component={MonthlyDetailScreen}
        options={{
          title: 'Chi tiết bản ghi',
        }}
      />
      <Stack.Screen
        name="METER_DETAIL"
        component={MeterDetailScreen}
        options={{
          title: 'Chi tiết đồng hồ',
        }}
      />
    </Stack.Navigator>
  );
};

export default MeterStack;
