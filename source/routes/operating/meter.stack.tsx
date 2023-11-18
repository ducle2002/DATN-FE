import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListMeterScreen from '@/screens/meter-management/list-meter.screen';
import MeterIndexScreen from '@/screens/meter-management/meter-index.screen';
import ReadIndexMeterScreen from '@/screens/meter-management/read-index.screen';
import {
  DrawerToggleButton,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MeterStackParamsList = {
  READ_INDEX: {
    meterTypeId?: number;
  };
  MAIN_SCREEN: NavigatorScreenParams<MeterDrawerParamsList>;
};

export type MeterDrawerParamsList = {
  LIST_METER: undefined;
  LIST_INDEX: undefined;
};

const Drawer = createDrawerNavigator<MeterDrawerParamsList>();
const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}>
      <Drawer.Screen name="LIST_INDEX" component={MeterIndexScreen} />
      <Drawer.Screen name="LIST_METER" component={ListMeterScreen} />
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
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={MainDrawer}
        options={{
          headerRight: renderDrawerToggleButton,
        }}
      />
      <Stack.Screen name="READ_INDEX" component={ReadIndexMeterScreen} />
    </Stack.Navigator>
  );
};

export default MeterStack;
