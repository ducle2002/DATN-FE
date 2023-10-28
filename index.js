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
import notifee, {EventType} from '@notifee/react-native';

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

const RenderApp = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RenderApp);
