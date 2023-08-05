import {useMutation} from 'react-query';
import LocalServiceApi from './local-service.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setTypeService} from './local-service.slice';

export const useLocalServiceType = () => {
  const dispatch = useAppDispatch();
  const {mutate: getLocalService} = useMutation({
    mutationFn: () => LocalServiceApi.getAllLocalServiceByOrganizationRequest(),
    onSuccess: ({services}) => {
      dispatch(setTypeService({services}));
    },
  });
  return {
    getLocalService,
  };
};
