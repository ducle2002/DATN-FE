import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemLocalService from './components/item-local-service';
import Icon from '@/components/icon.component';
import DropdownModalComponent from '@/components/dropdown-modal.component';
const {height} = Dimensions.get('screen');
const LocalServiceManagementScreen = () => {
  return (
    <View>
      <DropdownModalComponent
        options={[
          {
            label: 'Bảo dưỡng điều hòa',
            id: 1,
          },
        ]}
        selectedLabel={'Bảo dưỡng điều hòa'}
        onSelected={() => {}}
        degAnimation={180}
        style={[
          styles.filterSelect,
          {
            paddingRight: 4,
            alignItems: 'center',
            backgroundColor: 'white',
          },
        ]}
        // valueStyle={styles.txtChip}
      />
      <Text>Chi tiết: Yêu cầu dịch vụ bảo dưỡng điều hòa</Text>
      <ItemLocalService />
    </View>
  );
};

export default LocalServiceManagementScreen;

const styles = StyleSheet.create({
  filterSelect: {
    padding: 4,
    borderRadius: 6,
    // flex: 1,
    // justifyContent: 'center',
  },
});
