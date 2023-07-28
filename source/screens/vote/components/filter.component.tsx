import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import DropdownMenu from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import {EVoteState, TVoteStatus, votesFilter} from '@/modules/vote/vote.model';
import language, {languageKeys} from '@/config/language/language';

type Props = {
  onChange: Function;
  selected: EVoteState;
};

const FilterVote = ({onChange = () => {}, selected}: Props) => {
  const selectedLabel = useMemo<TVoteStatus>(
    () => votesFilter.find(v => v.state === selected)?.label ?? 'all',
    [selected],
  );
  return (
    <View style={styles.container}>
      <DropdownMenu
        selectedLabel={language.t(languageKeys.vote.status[selectedLabel])}
        label={language.t(languageKeys.vote.main.status)}
        labelStyle={{...globalStyles.text15Medium}}
        style={{flexDirection: 'row', alignItems: 'center'}}
        valueStyle={{...globalStyles.text15Bold}}
        options={votesFilter.map(f => ({
          id: f.state,
          label: language.t(languageKeys.vote.status[f.label]),
        }))}
        onSelected={(option: EVoteState) => {
          onChange(option);
        }}
      />
    </View>
  );
};

export default FilterVote;

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
