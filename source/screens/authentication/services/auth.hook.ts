import AuthenticationApi from '@/screens/authentication/services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import {useAppDispatch} from '../../../hooks/redux.hook';
import {logoutSuccess} from '@/screens/authentication/services/auth.slice';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const {mutate: logout} = useMutation({
    mutationFn: () => AuthenticationApi.logout(),
    onSuccess: () => {
      AsyncStorage.removeItem('Token');
      dispatch(logoutSuccess());
    },
    onError: () => {
      AsyncStorage.removeItem('Token');
      dispatch(logoutSuccess());
    },
  });
  return {logout};
};
