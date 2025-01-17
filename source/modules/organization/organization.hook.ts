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

export const useAllOrganizationUnitByUser = () => {
  const query = useQuery({
    queryKey: ['all-organization-unit-by-user'],
    queryFn: () => OrganizationApi.getOrganizationUnitIdByUser(),
    staleTime: 180000,
  });
  return {...query, listOrganizations: query.data?.listOrganizations ?? []};
};

export const useAllOrganizationUnit = () => {
  const query = useQuery({
    queryKey: ['all-organization-unit'],
    queryFn: () => OrganizationApi.getOrganizationUnits({maxResultCount: 1000}),
    cacheTime: 300000,
    staleTime: 300000,
  });

  return query;
};

export const useOrganizationUnitTree = () => {
  const {data} = useQuery({
    queryKey: ['all-organization-unit'],
    queryFn: () => OrganizationApi.getOrganizationUnits({maxResultCount: 1000}),
    cacheTime: 300000,
    staleTime: 300000,
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
