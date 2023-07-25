import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '@/screens/digital-notification/notification.screen';
import CreateNotificationScreen from '@/screens/digital-notification/create.screen';
import {TDigitalNoti} from '@/modules/digital-notification/digital-noti.model';
import language, {languageKeys} from '@/config/language/language';

export type NotificationStackParamsList = {
  MAIN_SCREEN: undefined;
  DETAIL_SCREEN: undefined;
  CREATE_SCREEN: {noti?: TDigitalNoti};
};

const Stack = createStackNavigator<NotificationStackParamsList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CREATE_SCREEN"
        component={CreateNotificationScreen}
        options={{title: language.t(languageKeys.digitalNoti.header.create)}}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
