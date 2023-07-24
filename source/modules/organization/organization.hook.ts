import {useMutation} from 'react-query';
import OrganizationApi from './organization.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setOrganization} from './organization.slice';

export const useOrganizationUnit = () => {
  const dispatch = useAppDispatch();
  const {mutate: getOrganizationUnitByUser} = useMutation({
    mutationFn: () => OrganizationApi.getOrganizationUnitIdByUser(),
    onSuccess: result => {
      dispatch(setOrganization(result));
    },
    onError: error => {
      console.log(error);
    },
  });

  return {getOrganizationUnitByUser};
};
