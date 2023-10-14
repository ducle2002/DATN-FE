import {useInfiniteQuery, useQuery} from 'react-query';
import WorkTypeApi from './work-type.service';
import {EWorkFormID, EWorkStatus} from './work.model';
import WorkManagementApi from './work-management.service';

export const useWorkType = () => {
  const {data} = useQuery({
    queryKey: ['work-type'],
    queryFn: () => WorkTypeApi.getAllNotPaging(),
  });

  return {...data};
};

export const useWorkQuery = ({
  selectedStatus = undefined,
  selectedFormId = undefined,
}: {
  selectedStatus?: EWorkStatus;
  selectedFormId?: EWorkFormID;
}) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['my-work', selectedStatus, selectedFormId],
    queryFn: ({pageParam}) =>
      WorkManagementApi.getAll({
        ...pageParam,
        maxResultCount: 20,
        status: selectedStatus,
        formId: selectedFormId,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.works.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
  });

  return {data, fetchNextPage};
};
