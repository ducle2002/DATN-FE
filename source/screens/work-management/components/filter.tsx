import {StyleSheet, View} from 'react-native';
import React from 'react';
import DropdownMenuComponent, {
  TOptionItem,
} from '@/components/dropdown-menu.component';
import CreateWork from './create-work.component';
import {useAppSelector} from '@/hooks/redux.hook';
import {checkPermission} from '@/utils/utils';

type Props = {
  status: Array<TOptionItem>;
  selectedStatus: number;
  selectStatus: (id: number) => void;
};

const FilterWork = ({status, selectStatus, selectedStatus}: Props) => {
  const {grantedPermissions} = useAppSelector(state => state.config);

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
          flex: 0.9,
        }}
        inputContainer={{
          backgroundColor: '#F1F1F1',
          paddingVertical: 10,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginLeft: 30,
          flex: 1,
        }}
        labelContainerStyle={{flex: 0.5}}
      />
      {checkPermission(grantedPermissions, [
        'Pages.Management.TaskManagement.Create',
      ]) && <CreateWork />}
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
