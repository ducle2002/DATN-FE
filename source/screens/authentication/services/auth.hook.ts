import AuthenticationApi from '@/screens/authentication/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import {useAppDispatch} from '../../../hooks/redux.hook';
import {logoutSuccess} from '@/screens/authentication/services/auth.slice';
import NotificationService from '@/modules/firebase-notification/noti.service';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const {mutate: logout} = useMutation({
    mutationFn: () => AuthenticationApi.logout(),
    onSuccess: () => {
      AsyncStorage.removeItem('Token');
      AsyncStorage.removeItem('Role');
      AsyncStorage.getItem('FCMToken')
        .then(result => {
          if (result) {
            NotificationService.logout({token: result}).then(() => {
              AsyncStorage.removeItem('FCMToken');
            });
          }
        })
        .finally(() => {
          AsyncStorage.removeItem('FCMToken');
        });
      dispatch(logoutSuccess());
    },
    onError: () => {
      AsyncStorage.removeItem('Token');
      AsyncStorage.removeItem('Role');
      AsyncStorage.getItem('FCMToken')
        .then(result => {
          if (result) {
            NotificationService.logout({token: result}).then(() => {
              AsyncStorage.removeItem('FCMToken');
            });
          }
        })
        .finally(() => {
          AsyncStorage.removeItem('FCMToken');
        });
      dispatch(logoutSuccess());
    },
  });
  return {logout};
};
