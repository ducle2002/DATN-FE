import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '@/screens/home/home.screen';
import SettingScreen from '@/screens/setting/settings.screen';
import NotificationStack, {
  NotificationStackParamsList,
} from './notification.stack';
import FeedbackStack, {FeedbackStackParamsList} from './feedback.stack';
import {NavigatorScreenParams} from '@react-navigation/native';

export type AppStackParamsList = {
  HOME_SCREEN: undefined;
  SETTING_SCREEN: undefined;
  NOTIFICATION_STACK: NavigatorScreenParams<NotificationStackParamsList>;
  FEEDBACK_STACK: NavigatorScreenParams<FeedbackStackParamsList>;
};

const Stack = createStackNavigator<AppStackParamsList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'HOME_SCREEN'}
        component={HomeScreen}
      />
      <Stack.Screen name={'SETTING_SCREEN'} component={SettingScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="NOTIFICATION_STACK"
        component={NotificationStack}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="FEEDBACK_STACK"
        component={FeedbackStack}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
