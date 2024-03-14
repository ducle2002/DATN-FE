/**
 * @format
 */
import React from 'react';
import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from '@/store';
import {QueryClient, QueryClientProvider} from 'react-query';
import notifee, {EventType} from '@notifee/react-native';
import CodePush from 'react-native-code-push';
import messaging from '@react-native-firebase/messaging';
import {onMessageReceived} from '@/modules/firebase-notification/noti.hook';
const queryClient = new QueryClient();

notifee.onBackgroundEvent(async ({detail, type}) => {
  if (type === EventType.PRESS) {
    const url =
      detail?.notification?.data?.detailUrlApp?.toString() ||
      detail?.notification?.data?.data?.toString();
    Linking.openURL(url ?? 'yooioc://app').catch(() => {});
  }
});

messaging().setBackgroundMessageHandler(onMessageReceived);

let RenderApp = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

RenderApp = CodePush(RenderApp);

AppRegistry.registerComponent(appName, () => RenderApp);
