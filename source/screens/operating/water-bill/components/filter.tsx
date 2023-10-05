import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import DashedLine from '@/components/dashed-line.component';

type Props = {};

const FilterWater = (props: Props) => {
  return (
    <View style={styles.container} {...props}>
      <View
        style={[
          styles.rowContainer,
          {
            marginBottom: 10,
          },
        ]}>
        <View style={{flex: 1}}>
          <Text>Kỳ</Text>
        </View>
        <DropdownMenuComponent
          options={[{id: 1, label: 'Tháng 10'}]}
          onSelected={() => {}}
          selectedLabel={'Tháng 10'}
          style={styles.dropdown}
        />
      </View>
      <DashedLine color="#D1D8FB" width={20} />
      <View style={[styles.rowContainer, {marginTop: 10}]}>
        <View style={{flex: 1}}>
          <Text>Toa nha</Text>
        </View>
        <DropdownMenuComponent
          options={[{id: 1, label: 'Tòa A1'}]}
          onSelected={() => {}}
          selectedLabel={'Tòa A1'}
          style={styles.dropdown}
        />
      </View>
    </View>
  );
};

export default FilterWater;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f8',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 20,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  dropdown: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 10,
  },
});
