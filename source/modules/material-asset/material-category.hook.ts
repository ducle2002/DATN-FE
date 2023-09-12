import {useQueries} from 'react-query';
import MaterialCategoryApi from './material-category.service';

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
