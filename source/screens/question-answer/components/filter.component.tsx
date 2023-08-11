import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {EQAFormID, QAFormID} from '@/modules/qa/qa.model';
import DropdownMenuComponent, {
  TOptionItem,
} from '@/components/dropdown-menu.component';

type Props = {
  onChange: Function;
  selected: EQAFormID;
};

const Filter = ({selected, onChange}: Props) => {
  const options = QAFormID.map<TOptionItem>(o => ({id: o.id, label: o.label}));
  const selectedLabel = useMemo(
    () => options.find(o => o.id === selected)?.label,
    [options, selected],
  );
  return (
    <View>
      <DropdownMenuComponent
        options={options}
        selectedLabel={selectedLabel}
        onSelected={onChange}
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
