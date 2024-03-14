import {useAppSelector} from '@/hooks/redux.hook';
import {useEffect} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import NotificationService from './noti.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {Linking, Platform} from 'react-native';

export const useRegisterNotification = () => {
  const {tenantId} = useAppSelector(state => state.auth);
  const {isLogin} = useAppSelector(state => state.auth);
  useEffect(() => {
    const unSubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        const url =
          detail?.notification?.data?.detailUrlApp?.toString() ||
          detail?.notification?.data?.data?.toString();
        Linking.openURL(url ?? 'yooioc://app').catch(() => {});
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);
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
                  .getAPNSToken()
                  .catch(e => {
                    console.log('apns error ', e);
                  });
                messaging()
                  .getToken()
                  .then(token => {
                    AsyncStorage.setItem('FCMToken', token);
                    NotificationService.register({
                      tenantId: tenantId,
                      token: token,
                      appType: 3,
                      deviceType: Platform.OS === 'android' ? 2 : 1,
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            });
        });
    }
  }, [isLogin, tenantId]);
};

export const onMessageReceived = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelId = await notifee.createChannel({
    id: 'YooIOC-Notifications',
    name: 'YooIOC Thông báo',
    importance: AndroidImportance.HIGH,
  });

  await notifee.requestPermission();

  await notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId,
      pressAction: {
        id: 'YooIOC-Notifications',
      },
    },
    data: {data: message.data?.detailUrlApp ?? 'yooioc://app'},
  });
};

export const getNotification = async () => {
  await messaging().registerDeviceForRemoteMessages();
  await messaging().getToken();

  messaging()
    .getAPNSToken()
    .catch(e => {
      console.log('apns error ', e);
    });
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

  messaging().onMessage(onMessageReceived);
};
