import HotlineUpdateScreen from '@/screens/hotline/hotline-update.screen';
import HotlineScreen from '@/screens/hotline/hotline.screen';
import {THotline} from '@/screens/hotline/services/hotline.model';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type HotlineStackParamsList = {
  LIST_HOTLINE: undefined;
  UPDATE: {hotline: THotline} | undefined;
};

const Stack = createStackNavigator<HotlineStackParamsList>();

const HotlineStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LIST_HOTLINE" component={HotlineScreen} />
      <Stack.Screen name="UPDATE" component={HotlineUpdateScreen} />
    </Stack.Navigator>
  );
};
export default HotlineStack;
