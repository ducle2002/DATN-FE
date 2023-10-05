import {StyleSheet, View} from 'react-native';
import React from 'react';
import DropdownMenuComponent, {
  TOptionItem,
} from '@/components/dropdown-menu.component';

type Props = {
  status: Array<TOptionItem>;
  formId: TOptionItem[];
  selectedStatus?: number;
  selectStatus: (id?: number) => void;
  selectedFormId?: number;
  selectFormId: (id?: number) => void;
};

const FilterWork = ({
  status,
  selectStatus,
  selectedStatus,
  formId,
  selectedFormId,
  selectFormId,
}: Props) => {
  return (
    <View style={styles.container}>
      <DropdownMenuComponent
        options={formId}
        label="Vai trò"
        selectedLabel={formId.find(s => s.id === selectedFormId)?.label}
        onSelected={(id: number) => selectFormId(id)}
        style={{
          alignItems: 'flex-start',
          flex: 1,
          paddingRight: 10,
        }}
        inputContainer={{
          backgroundColor: '#F1F1F1',
          paddingVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 15,
          width: '100%',
          marginTop: 10,
        }}
      />
      <DropdownMenuComponent
        options={status}
        label="Trạng thái"
        selectedLabel={status.find(s => s.id === selectedStatus)?.label}
        onSelected={(id: number) => selectStatus(id)}
        style={{
          alignItems: 'flex-start',
          flex: 1,
          paddingLeft: 10,
        }}
        inputContainer={{
          backgroundColor: '#F1F1F1',
          paddingVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 15,
          width: '100%',
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default FilterWork;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    flexDirection: 'row',
  },
});
