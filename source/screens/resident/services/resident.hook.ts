import {useInfiniteQuery, useMutation} from 'react-query';
import {ResidentApi} from './resident.services';
import {EResidentFormId, TResident} from './resident.model';

export const useResidentData = ({
  formId,
  keyword,
}: {
  formId: EResidentFormId;
  keyword?: String;
}) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['resident', formId, keyword],
    queryFn: ({pageParam}) =>
      ResidentApi.getResident({
        ...pageParam,
        formId: formId,
        maxResultCount: 10,
        keyword,
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
