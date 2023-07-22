import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '@/screens/notifications/notification.screen';

export type NotificationStackParamsList = {
  MAIN_SCREEN: undefined;
  DETAIL_SCREEN: undefined;
};

const Stack = createStackNavigator<NotificationStackParamsList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackTitleVisible: false}}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
