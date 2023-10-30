import {useAppSelector} from '@/hooks/redux.hook';
import {useEffect} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import NotificationService from './noti.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {Linking} from 'react-native';

export const useRegisterNotification = () => {
  const {tenantId} = useAppSelector(state => state.auth);
  const {isLogin} = useAppSelector(state => state.auth);
  useEffect(() => {
    if (tenantId && isLogin) {
      messaging()
        .registerDeviceForRemoteMessages()
        .then(() => {
          messaging()
            .requestPermission()
            .then(result => {
              if (
                result === messaging.AuthorizationStatus.AUTHORIZED ||
                result === messaging.AuthorizationStatus.PROVISIONAL
              ) {
                messaging()
                  .getToken()
                  .then(token => {
                    AsyncStorage.setItem('FCMToken', token);
                    NotificationService.register({
                      tenantId: tenantId,
                      token: token,
                    });
                  });
              }
            });
        });
    }
  }, [isLogin, tenantId]);
};

export const getNotification = async () => {
  await messaging().registerDeviceForRemoteMessages();
  await messaging().getToken();
  // console.log('[TOKEN]', token);

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    });
  async function onMessageReceived(
    message: FirebaseMessagingTypes.RemoteMessage,
  ) {
    const channelId = await notifee.createChannel({
      id: 'Test1',
      name: 'Default Channel1',
      importance: AndroidImportance.HIGH,
    });

    await notifee.requestPermission();

    await notifee.displayNotification({
      title: message.notification?.title,
      body: message.notification?.body,
      android: {
        channelId,
        pressAction: {
          id: 'Test1',
        },
      },
      // data: {action: message.data.action},
    });
    notifee.onBackgroundEvent(async ({type, detail}) => {
      if (type === EventType.PRESS) {
        Linking.openURL('yooioc://');
      }
    });

    notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        Linking.openURL('yooioc://');
      }
    });
  }

  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);
};