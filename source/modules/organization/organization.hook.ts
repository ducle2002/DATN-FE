import {useMutation, useQuery} from 'react-query';
import OrganizationApi from './organization.service';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setOrganization} from './organization.slice';
import {useLocalServiceType} from '../../screens/local-service/services/local-service.hook';
import {arrayToTree} from '@/utils/utils';

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

export const useAllOrganizationUnit = () => {
  const {data} = useQuery({
    queryKey: ['all-organization-unit'],
    queryFn: () => OrganizationApi.getOrganizationUnits({maxResultCount: 1000}),
  });

  return arrayToTree(data?.organizationUnits ?? []);
};

export const useAllOrganizationUsers = ({id}: {id?: number}) => {
  const {data} = useQuery({
    queryKey: ['user-organization', id],
    queryFn: () => OrganizationApi.getOrganizationUnitUsers({id: id}),
    enabled: id !== undefined,
  });

  return {...data};
};
