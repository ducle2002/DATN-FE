import {useInfiniteQuery, useQuery} from 'react-query';
import WorkTypeApi from './work-type.service';
import {EWorkFormID, EWorkStatus, TPersonnel} from './work.model';
import WorkManagementApi from './work-management.service';
import WorkCommentApi from './work-comment.service';
import {createContext} from 'react';

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
  keyword = undefined,
}: {
  selectedStatus?: EWorkStatus;
  selectedFormId?: EWorkFormID;
  keyword?: string;
}) => {
  const query = useInfiniteQuery({
    queryKey: ['my-work', selectedStatus, selectedFormId, keyword],
    queryFn: ({pageParam}) =>
      WorkManagementApi.getAll({
        ...pageParam,
        maxResultCount: 20,
        status: selectedStatus,
        formId: selectedFormId,
        keyword: keyword,
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

  return query;
};

export const useWorkComment = ({workId}: {workId: number}) => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['work-comment', workId],
    queryFn: ({pageParam}) =>
      WorkCommentApi.getAll({
        ...pageParam,
        maxResultCount: 20,
        workId: workId,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.comments.length !==
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

export const useAllWorkComment = ({workId}: {workId: number}) => {
  const {data, refetch} = useQuery({
    queryKey: ['all-work-comment', workId],
    queryFn: () => WorkCommentApi.getAllWithoutPaging({workId: workId}),
  });

  return {
    data,
    refetch,
  };
};

export const PersonnelPickerContext = createContext<{
  selected: TPersonnel[];
  onSelect: (accounts: TPersonnel[]) => void;
}>({
  selected: [],
  onSelect: () => {},
});
