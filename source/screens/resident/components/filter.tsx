import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {EResidentFormId} from '../services/resident.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';

type Props = {
  onChange: (formId: EResidentFormId) => void;
  selected: EResidentFormId;
};

const ResidentFilter = ({onChange, selected}: Props) => {
  const options = Object.values(EResidentFormId)
    .filter(v => typeof v === 'number')
    .map(value => ({
      id: value,
      label: language.t(
        languageKeys.residentLanguage.formId[
          value as keyof typeof languageKeys.residentLanguage.formId
        ],
      ),
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

export default ResidentFilter;

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
