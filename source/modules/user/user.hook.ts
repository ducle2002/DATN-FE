import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.hook';
import {useMutation} from 'react-query';
import UserApi from './user.service';
import {setUser} from './user.slice';

export const useAccount = () => {
  const {isLogin} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const {mutate} = useMutation({
    mutationFn: () => UserApi.getDetailRequest(),
    onSuccess: result => {
      dispatch(setUser(result));
    },
  });

  useEffect(() => {
    if (isLogin) {
      mutate();
    }
  }, [isLogin, mutate]);
};
