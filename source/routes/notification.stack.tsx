import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '@/screens/digital-notification/notification.screen';
import CreateNotificationScreen from '@/screens/digital-notification/create.screen';

export type NotificationStackParamsList = {
  MAIN_SCREEN: undefined;
  DETAIL_SCREEN: undefined;
  CREATE_SCREEN: {noti?: undefined};
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
      <Stack.Screen name="CREATE_SCREEN" component={CreateNotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
