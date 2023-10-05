import {createStackNavigator} from '@react-navigation/stack';
import WaterStack, {WaterStackParamsList} from './water.stack';
import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
export type OperatingStackParamsList = {
  WATER_BILL: NavigatorScreenParams<WaterStackParamsList>;
};

const Stack = createStackNavigator<OperatingStackParamsList>();

const OperatingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WATER_BILL" component={WaterStack} />
    </Stack.Navigator>
  );
};

export default OperatingStack;
