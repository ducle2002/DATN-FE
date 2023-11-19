import {useInfiniteQuery, useQuery} from 'react-query';
import {TFilter} from './MeterFilterContext';
import MeterService from '../services/meter.service';
import {TPagingParams} from 'types/type';

export const useGetAllMeter = (filter: TFilter & {meterTypeId?: number}) => {
  const query = useQuery({
    queryKey: ['meters', filter],
    queryFn: () => MeterService.getAll(filter),
  });

  return {...query, meters: query.data?.meters ?? []};
};

export const useListMeters = (
  params?: TPagingParams & {meterTypeId?: number},
) => {
  const query = useInfiniteQuery({
    queryKey: ['list-meter', params],
    queryFn: ({pageParam}) =>
      MeterService.getAll({
        ...params,
        maxResultCount: 10,
        ...pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.meters.length !==
        lastPage.totalRecords
        ? {
            ...params,
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
  });

  return query;
};
