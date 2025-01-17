import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import HomeScreen from '@/screens/home/home.screen';
import NotificationStack, {
  NotificationStackParamsList,
} from './notification.stack';
import FeedbackStack, {FeedbackStackParamsList} from './feedback.stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import VoteStack, {VoteStackParamsList} from './vote.stack';
import LocalServiceStack, {
  LocalServiceStackParamsList,
} from './local-service.stack';
import {HOST_SERVER} from '@env';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {selectedEncryptedAccessToken} from '@/screens/authentication/services/auth.slice';
import * as signalR from '@microsoft/signalr';
import {setConnection} from '@/modules/hubconnection/hubconnection.slice';
import ChatStack, {ChatStackParamsList} from './chat.stack';
import AdministrativeStack, {
  AdministrativeStackParamsList,
} from './administrative.stack';
import SettingStack from './settings.stack';
import QAStack, {QAStackParamsList} from './question-answer.stack.screen';
import MaterialAssetStack, {
  MaterialAssetStackParamsList,
} from './material-asset.stack';
import CameraScreen from '@/screens/camera/camera.screen';
import ResidentVerifyScreen from '@/screens/resident/resident-verify.screen';
import WorkManagementDrawer, {
  WorkStackParamsList,
} from './work-management.stack';
import HotlineStack, {HotlineStackParamsList} from './hotline.stack';
import LocalServiceManagementStack, {
  LocalServiceManagementStackParamsList,
} from './local-service-management';
import MeterStack, {MeterStackParamsList} from './operating/meter.stack';
import {useListMeterType} from '@/screens/meter-management/hooks/useListMeterTypes';
import StatisticStack, {StatisticStackParamsList} from './ statistic.stack';
import NotificationScreen from '@/screens/notification/notification.screen';

export type AppStackParamsList = {
  HOME_SCREEN: undefined;
  SETTING_SCREEN: undefined;
  NOTIFICATION_STACK: NavigatorScreenParams<NotificationStackParamsList>;
  FEEDBACK_STACK: NavigatorScreenParams<FeedbackStackParamsList>;
  VOTE_STACK: NavigatorScreenParams<VoteStackParamsList>;
  LOCAL_SERVICE_STACK: NavigatorScreenParams<LocalServiceStackParamsList>;
  LOCAL_SERVICE_MANAGEMENT_STACK: NavigatorScreenParams<LocalServiceManagementStackParamsList>;
  CHAT_STACK: NavigatorScreenParams<ChatStackParamsList>;
  ADMINISTRATIVE_STACK: NavigatorScreenParams<AdministrativeStackParamsList>;
  QUESTION_ANSWER_STACK: NavigatorScreenParams<QAStackParamsList>;
  MATERIAL_ASSET_STACK: NavigatorScreenParams<MaterialAssetStackParamsList>;
  CAMERA_SCREEN:
    | {
        isReturnPhoto?: boolean;
      }
    | undefined;
  RESIDENT_STACK: undefined | {id: number};
  WORK_MANAGEMENT: NavigatorScreenParams<WorkStackParamsList>;
  HOTLINE_STACK: NavigatorScreenParams<HotlineStackParamsList>;
  METER_STACK: NavigatorScreenParams<MeterStackParamsList>;
  STATISTIC_STACK: NavigatorScreenParams<StatisticStackParamsList>;
  NOTIFICATION: {id?: string} | undefined;
};

const Stack = createStackNavigator<AppStackParamsList>();

const AppStack = () => {
  const encryptedAccessToken = useAppSelector(selectedEncryptedAccessToken);
  const dispatch = useAppDispatch();

  useListMeterType();

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
        headerShown: false,
        freezeOnBlur: true,
      }}>
      <Stack.Group>
        <Stack.Screen name="METER_STACK" component={MeterStack} />

        <Stack.Screen name={'HOME_SCREEN'} component={HomeScreen} />
        <Stack.Screen name="NOTIFICATION_STACK" component={NotificationStack} />
        <Stack.Screen name="CHAT_STACK" component={ChatStack} />
        <Stack.Screen name="FEEDBACK_STACK" component={FeedbackStack} />
        <Stack.Screen
          name="ADMINISTRATIVE_STACK"
          component={AdministrativeStack}
        />
        <Stack.Screen name="VOTE_STACK" component={VoteStack} />
        <Stack.Screen
          name="LOCAL_SERVICE_STACK"
          component={LocalServiceStack}
        />
        <Stack.Screen
          name="LOCAL_SERVICE_MANAGEMENT_STACK"
          component={LocalServiceManagementStack}
        />
        <Stack.Screen name="STATISTIC_STACK" component={StatisticStack} />
        <Stack.Screen name="QUESTION_ANSWER_STACK" component={QAStack} />
        <Stack.Screen
          name="MATERIAL_ASSET_STACK"
          component={MaterialAssetStack}
        />
        <Stack.Screen
          name="RESIDENT_STACK"
          component={ResidentVerifyScreen}
          options={{headerShown: true}}
        />
      </Stack.Group>
      <Stack.Screen name="WORK_MANAGEMENT" component={WorkManagementDrawer} />
      <Stack.Screen
        initialParams={{isReturnPhoto: true}}
        name="CAMERA_SCREEN"
        component={CameraScreen}
      />
      <Stack.Screen name={'SETTING_SCREEN'} component={SettingStack} />
      <Stack.Screen name="HOTLINE_STACK" component={HotlineStack} />
      <Stack.Screen
        name="NOTIFICATION"
        component={NotificationScreen}
        options={{headerShown: true, headerTitle: ''}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
