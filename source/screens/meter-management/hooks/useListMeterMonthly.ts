import {useInfiniteQuery} from 'react-query';
import MeterMonthlyService from '../services/meter-monthly.service';
import {TPagingParams} from 'types/type';

export const useListMeterMonthly = (
  params?: TPagingParams & {meterTypeId?: number; meterId?: number},
) => {
  const query = useInfiniteQuery({
    queryKey: ['list-meter-monthly', params],
    queryFn: ({pageParam}) =>
      MeterMonthlyService.getAll({
        ...params,
        maxResultCount: 10,
        ...pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.records.length !==
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
