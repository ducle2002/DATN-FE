import {useAppDispatch} from '../../hooks/redux.hook';
import {useMutation} from 'react-query';
import UserApi from './user.service';
import {setUser} from './user.slice';

export const useAccount = () => {
  const dispatch = useAppDispatch();

  const {mutate: getUserInfor} = useMutation({
    mutationFn: () => UserApi.getDetailRequest(),
    onSuccess: result => {
      dispatch(setUser(result));
    },
  });

  return {getUserInfor};
};
