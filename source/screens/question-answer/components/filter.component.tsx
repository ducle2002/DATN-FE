import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import {EQAFormID, QAFormID} from '@/screens/question-answer/services/qa.model';
import DropdownMenuComponent, {
  TOptionItem,
} from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';

type Props = {
  onChange: Function;
  selected: EQAFormID;
};

const Filter = ({selected, onChange}: Props) => {
  const options = QAFormID.map<TOptionItem>(o => ({
    id: o.id,
    label: language.t(languageKeys.qa.state[o.label]),
  }));
  const selectedLabel = useMemo(
    () => options.find(o => o.id === selected)?.label,
    [options, selected],
  );
  return (
    <View style={styles.container}>
      <DropdownMenuComponent
        options={options}
        selectedLabel={selectedLabel}
        onSelected={onChange}
        label={language.t(languageKeys.qa.state.state)}
        labelStyle={{...globalStyles.text15Medium}}
        style={{flexDirection: 'row', alignItems: 'center'}}
        valueStyle={{...globalStyles.text15Bold}}
      />
    </View>
  );
};

export default Filter;

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
