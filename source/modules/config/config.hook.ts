import {useMutation} from 'react-query';
import ConfigApi from './config.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setConfig} from './config.slice';
import {useLogout} from '../auth/auth.hook';

export const useConfigPermissions = () => {
  const dispatch = useAppDispatch();
  const {logout} = useLogout();
  const {mutate: getConfigPermission} = useMutation({
    mutationFn: () => ConfigApi.getConfigRequest(),
    onSuccess: ({data: {result}}) => {
      dispatch(
        setConfig({
          grantedPermissions: Object.keys(result.auth.grantedPermissions),
        }),
      );
    },
    onError: () => {
      logout();
    },
  });
  return {getConfigPermission};
};