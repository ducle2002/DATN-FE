import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import DropdownMenuComponent, {
  TOptionItem,
} from '@/components/dropdown-menu.component';

type Props = {
  status: Array<TOptionItem>;
  selectedStatus: number;
  selectStatus: (id: number) => void;
};

const FilterWork = ({status, selectStatus, selectedStatus}: Props) => {
  return (
    <View style={styles.container}>
      <DropdownMenuComponent
        options={status}
        label="Trạng thái"
        selectedLabel={status.find(s => s.id === selectedStatus)?.label}
        onSelected={(id: number) => selectStatus(id)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
        inputContainer={{
          backgroundColor: 'white',
          paddingVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginLeft: 30,
          flex: 1,
        }}
        labelContainerStyle={{flex: 0.5}}
      />
    </View>
  );
};

export default FilterWork;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f8',
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
