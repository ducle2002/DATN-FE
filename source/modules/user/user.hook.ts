import {useAppDispatch} from '../../hooks/redux.hook';
import {useMutation} from 'react-query';
import UserApi from './user.service';
import {setUser} from './user.slice';
import {useLogout} from '../../screens/authentication/services/auth.hook';

export const useAccount = () => {
  const dispatch = useAppDispatch();
  const {logout} = useLogout();

  const {mutate: getUserInfor} = useMutation({
    mutationFn: () => UserApi.getDetailRequest(),
    onSuccess: result => {
      dispatch(setUser(result));
    },
    onError: () => {
      logout();
    },
  });

  return {getUserInfor};
};
