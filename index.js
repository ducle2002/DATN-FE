/**
 * @format
 */
import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from '@/store';
import {QueryClient, QueryClientProvider} from 'react-query';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import CodePush from 'react-native-code-push';

const queryClient = new QueryClient();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Platform.OS === 'android' && remoteMessage.data.type === '1') {
    if (remoteMessage.notification.body !== 'VIDEO_CALL') {
      notifee.onBackgroundEvent(async ({type, detail}) => {
        // const {notification, pressAction} = detail;
      });
    }
  }
});

let RenderApp = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

RenderApp = CodePush(RenderApp);

AppRegistry.registerComponent(appName, () => RenderApp);
