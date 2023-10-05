import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import MaterialCategoryApi from '@/screens/material-asset/services/material-category.service';
import {useQueries} from 'react-query';

type Props = {};

const AssetFilter = (props: Props) => {
  const result = useQueries([
    {
      queryKey: ['filter-inventory'],
      queryFn: () => MaterialCategoryApi.getAll({type: 2}),
      staleTime: 600000,
    },
    {
      queryKey: ['filter-producer'],
      queryFn: () => MaterialCategoryApi.getAll({type: 3}),
      staleTime: 600000,
    },
    {
      queryKey: ['filter-type'],
      queryFn: () => MaterialCategoryApi.getAll({type: 4}),
      staleTime: 600000,
    },
    {
      queryKey: ['filter-unit'],
      queryFn: () => MaterialCategoryApi.getAll({type: 5}),
      staleTime: 600000,
    },
    {
      queryKey: ['filter-group'],
      queryFn: () => MaterialCategoryApi.getAll({type: 1}),
      staleTime: 600000,
    },
  ]);

  return <View style={styles.container} />;
};

export default AssetFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 1,
    shadowOpacity: 0.2,
  },
});
