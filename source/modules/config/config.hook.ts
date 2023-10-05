import {useMutation} from 'react-query';
import ConfigApi from './config.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setConfig} from './config.slice';
import {useLogout} from '../../screens/authentication/services/auth.hook';

export const useConfigPermissions = () => {
  const dispatch = useAppDispatch();
  const {logout} = useLogout();
  const {mutate: getConfigPermission} = useMutation({
    mutationFn: () => ConfigApi.getConfigRequest(),
    onSuccess: ({data: {result}}) => {
      dispatch(
        setConfig({
          grantedPermissions: Object.keys(result.auth.grantedPermissions),
          allPermissions: Object.keys(result.auth.allPermissions),
        }),
      );
    },
    onError: () => {
      logout();
    },
  });
  return {getConfigPermission};
};
