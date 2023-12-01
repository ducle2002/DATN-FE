import {useQuery} from 'react-query';
import MeterTypeService from '../services/meter-type.service';

export const useListMeterType = () => {
  const query = useQuery({
    queryKey: ['meter-types'],
    queryFn: () => MeterTypeService.getAll({maxResultCount: 100}),
    staleTime: 300000,
  });

  return {...query, meterTypes: query.data?.meterTypes ?? []};
};
