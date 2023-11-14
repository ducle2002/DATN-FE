import {useInfiniteQuery, useMutation} from 'react-query';
import {ResidentApi} from './resident.services';
import {TResident} from './resident.model';
import {TFilter} from '../hooks/ResidentFilterContext';

export const useResidentData = ({
  formId,
  keyword,
  urbanId,
  buildingId,
}: TFilter) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['resident', formId, keyword, urbanId, buildingId],
    queryFn: ({pageParam}) =>
      ResidentApi.getResident({
        ...pageParam,
        maxResultCount: 10,
        keyword,
        formId,
        urbanId,
        buildingId,
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
  return {
    data,
    fetchNextPage,
  };
};

export const useUpdateResidentState = (onSuccessCallback: () => void) => {
  const {mutate} = useMutation({
    mutationFn: (params: TResident) => ResidentApi.updateState(params),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
  return {updateState: mutate};
};
