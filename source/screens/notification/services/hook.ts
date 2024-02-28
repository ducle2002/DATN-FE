import {useInfiniteQuery, useQuery} from 'react-query';
import NotificationService from './notification';
import {useAppDispatch} from '@/hooks/redux.hook';
import {setUnreadCount} from './notification.slice';

export const useGetNumberUnread = () => {
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ['user-notifications'],
    queryFn: () => NotificationService.getAll(),
    onSuccess: result => {
      dispatch(setUnreadCount(result.unreadCount));
    },
  });
  return query;
};

export const useListNotifications = () => {
  const dispatch = useAppDispatch();

  const query = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({pageParam}) =>
      NotificationService.getAll({
        ...pageParam,
        keyword: pageParam.keyword?.toLocaleLowerCase(),
        maxResultCount: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.notifications?.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 10,
          }
        : undefined;
    },
    cacheTime: 0,
    onSuccess: result => {
      dispatch(setUnreadCount(result.pages[0].unreadCount));
    },
  });

  return query;
};
