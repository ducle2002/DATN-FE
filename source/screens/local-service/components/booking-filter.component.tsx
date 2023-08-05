import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import DropdownMenu from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import {
  EBookingFormId,
  EBookingState,
  TBookingStatus,
  bookingFilter,
} from '@/modules/local-service/local-service.model';

type Props = {
  onChange: Function;
  selected: EBookingFormId;
};

const FilterBooking = ({onChange = () => {}, selected}: Props) => {
  const selectedLabel = useMemo<TBookingStatus>(
    () => bookingFilter.find(v => v.state === selected)?.label ?? 'all',
    [selected],
  );

  return (
    <View style={styles.container}>
      <DropdownMenu
        selectedLabel={language.t(
          languageKeys.localService.status[selectedLabel],
        )}
        label={language.t(languageKeys.vote.main.status)}
        labelStyle={{...globalStyles.text15Medium}}
        style={{flexDirection: 'row', alignItems: 'center'}}
        valueStyle={{...globalStyles.text15Bold}}
        options={bookingFilter.map(f => ({
          id: f.state,
          label: language.t(languageKeys.localService.status[f.label]),
        }))}
        onSelected={(option: EBookingState) => {
          onChange(option);
        }}
      />
    </View>
  );
};

export default FilterBooking;

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
