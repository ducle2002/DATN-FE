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
