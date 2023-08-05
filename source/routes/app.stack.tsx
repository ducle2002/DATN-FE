import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import HomeScreen from '@/screens/home/home.screen';
import SettingScreen from '@/screens/setting/settings.screen';
import NotificationStack, {
  NotificationStackParamsList,
} from './notification.stack';
import FeedbackStack, {FeedbackStackParamsList} from './feedback.stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import VoteStack, {VoteStackParamsList} from './vote.stack';
import {HOST_SERVER} from '@env';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {selectedEncryptedAccessToken} from '@/modules/auth/auth.slice';
import * as signalR from '@microsoft/signalr';
import {setConnection} from '@/modules/hubconnection/hubconnection.slice';
import ChatStack, {ChatStackParamsList} from './chat.stack';
import AdministrativeStack, {
  AdministrativeStackParamsList,
} from './administrative.stack';

export type AppStackParamsList = {
  HOME_SCREEN: undefined;
  SETTING_SCREEN: undefined;
  NOTIFICATION_STACK: NavigatorScreenParams<NotificationStackParamsList>;
  FEEDBACK_STACK: NavigatorScreenParams<FeedbackStackParamsList>;
  VOTE_STACK: NavigatorScreenParams<VoteStackParamsList>;
  CHAT_STACK: NavigatorScreenParams<ChatStackParamsList>;
  ADMINISTRATIVE_STACK: NavigatorScreenParams<AdministrativeStackParamsList>;
};

const Stack = createStackNavigator<AppStackParamsList>();

const AppStack = () => {
  const encryptedAccessToken = useAppSelector(selectedEncryptedAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (encryptedAccessToken && encryptedAccessToken !== '') {
      const hubConnection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect()
        .withUrl(
          HOST_SERVER +
            '/messager?enc_auth_token=' +
            encodeURIComponent(encryptedAccessToken),
        )
        .build();
      hubConnection
        .start()
        .then(() => {
          console.log('[START_CONNECT_HUBCONNECTION]');
        })
        .catch((err: any) => {
          console.log('[ERROR_START_CONNECT_SIGNALR]', err);
        });
      hubConnection.onclose((e: any) => {
        if (e) {
          console.log('Chat connection closed with error: ', e);
        } else {
          console.log('Chat disconnected');
        }

        hubConnection.start().then(() => {});
      });

      dispatch(setConnection(hubConnection));
    }
  }, [dispatch, encryptedAccessToken]);
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
        name="CHAT_STACK"
        component={ChatStack}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="FEEDBACK_STACK"
        component={FeedbackStack}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ADMINISTRATIVE_STACK"
        component={AdministrativeStack}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="VOTE_STACK"
        component={VoteStack}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
