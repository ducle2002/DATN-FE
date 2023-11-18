import {useQuery} from 'react-query';
import {TFilter} from './MeterFilterContext';
import MeterService from '../services/meter.service';

export const useGetAllMeter = (filter: TFilter & {meterTypeId?: number}) => {
  const query = useQuery({
    queryKey: ['meters', filter],
    queryFn: () => MeterService.getAll(filter),
  });

  return {...query, meters: query.data?.meters ?? []};
};
