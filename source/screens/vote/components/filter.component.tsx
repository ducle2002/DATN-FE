import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropdownMenu from '@/components/dropdown-menu.component';

type Props = {};

const FilterVote = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <DropdownMenu
        selectedLabel="tat ca"
        style={{flexDirection: 'row', alignItems: 'center'}}
        options={[{label: 'tat ca', id: 1}]}
        onSelected={() => {}}
      />
    </View>
  );
};

export default FilterVote;

const styles = StyleSheet.create({});
