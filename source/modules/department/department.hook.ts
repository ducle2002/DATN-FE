import {useQuery} from 'react-query';
import DepartmentServiceApi from './department.service';

export const useAllDepartment = () => {
  const {data} = useQuery({
    queryKey: ['department'],
    queryFn: () =>
      DepartmentServiceApi.getAllDepartment({maxResultCount: 1000}),
  });
  return data?.departments;
};

export const useAllAccountOnDepartment = ({id}: {id?: number}) => {
  const {data} = useQuery({
    queryKey: ['account-department', id],
    queryFn: () =>
      DepartmentServiceApi.getAllPersonnelAccount({
        id: id ?? -1,
        maxResultCount: 999,
      }),
    enabled: id ? id >= 0 : false,
    staleTime: 300000,
    cacheTime: 300000,
  });

  return {accounts: data?.accounts ?? []};
};
