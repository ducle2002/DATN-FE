import {useMutation} from 'react-query';
import OrganizationApi from './organization.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setOrganization} from './organization.slice';
import {useLocalServiceType} from '../local-service/local-service.hook';

export const useOrganizationUnit = () => {
  const dispatch = useAppDispatch();
  const {getLocalService} = useLocalServiceType();
  const {mutate: getOrganizationUnitByUser} = useMutation({
    mutationFn: () => OrganizationApi.getOrganizationUnitIdByUser(),
    onSuccess: result => {
      dispatch(setOrganization(result));
      getLocalService();
    },
    onError: error => {
      console.log(error);
    },
  });

  return {getOrganizationUnitByUser};
};
