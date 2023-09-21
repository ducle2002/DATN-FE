import {useInfiniteQuery} from 'react-query';
import {ResidentApi} from './resident.services';
import {EResidentFormId} from './resident.model';
import {useMemo} from 'react';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';

export const useResidentData = (formId: EResidentFormId) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['resident', formId],
    queryFn: ({pageParam}) =>
      ResidentApi.getResident({
        ...pageParam,
        formId: formId,
        maxResultCount: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.resident.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
  });

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.resident, data.pages)) : [],
    );
  }, [data]);

  return {
    data,
    fetchNextPage,
    dataProvider,
  };
};
