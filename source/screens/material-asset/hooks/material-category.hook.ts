import {useInfiniteQuery, useQueries} from 'react-query';
import MaterialCategoryApi from '../services/material-category.service';
import {ECategoryType} from '../services/material-asset.model';

export const useMaterialCategory = () => {
  const result = useQueries([
    {
      queryKey: ['category-inventory'],
      queryFn: () => MaterialCategoryApi.getAll({type: 2}),
      staleTime: 600000,
    },
    {
      queryKey: ['category-producer'],
      queryFn: () => MaterialCategoryApi.getAll({type: 3}),
      staleTime: 600000,
    },
    {
      queryKey: ['category-type'],
      queryFn: () => MaterialCategoryApi.getAll({type: 4}),
      staleTime: 600000,
    },
    {
      queryKey: ['category-unit'],
      queryFn: () => MaterialCategoryApi.getAll({type: 5}),
      staleTime: 600000,
    },
    {
      queryKey: ['category-group'],
      queryFn: () => MaterialCategoryApi.getAll({type: 1}),
      staleTime: 600000,
    },
  ]);

  return {
    categoryInventory: result[0],
    categoryProducer: result[1],
    categoryType: result[2],
    categoryUnit: result[3],
    categoryGroup: result[4],
  };
};

export const useListCategory = (type: ECategoryType) => {
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['category', type],
    queryFn: ({pageParam}) =>
      MaterialCategoryApi.getAll({
        ...pageParam,
        type: type,
        maxResultCount: 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 20;
      return (allPages.length - 1) * 20 + lastPage.dataFilter.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 20,
          }
        : undefined;
    },
  });

  return {data, fetchNextPage, hasNextPage};
};
