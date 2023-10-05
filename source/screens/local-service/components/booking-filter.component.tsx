import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import DropdownMenu, {TOptionItem} from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import {
  EBookingFormId,
  EBookingState,
  TBookingItem,
  TBookingStatus,
  bookingFilter,
} from '@/screens/local-service/services/local-service.model';

type Props = {
  onChangeState: Function;
  selectedState: EBookingFormId;
  selectedItem: number | undefined;
  onChangeItem: Function;
  items: Array<TBookingItem>;
};

const FilterBooking = ({
  onChangeState = () => {},
  selectedState,
  onChangeItem,
  selectedItem,
  items,
}: Props) => {
  const selectedLabel = useMemo<TBookingStatus>(
    () => bookingFilter.find(v => v.state === selectedState)?.label ?? 'all',
    [selectedState],
  );

  const listItems = useMemo<Array<TOptionItem>>(() => {
    if (items && items.length > 0) {
      return [
        {
          id: undefined,
          label: language.t(languageKeys.localService.status.all),
        },
        ...items?.map(item => ({id: item.id, label: item.name})),
      ];
    }
    return [];
  }, [items]);

  const selectedItemLabel = useMemo(
    () => listItems.find(v => v.id === selectedItem)?.label,
    [listItems, selectedItem],
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
          onChangeState(option);
        }}
      />
      {listItems.length > 1 && (
        <DropdownMenu
          options={listItems}
          selectedLabel={selectedItemLabel}
          label={language.t(languageKeys.localService.booking.service)}
          labelStyle={{...globalStyles.text15Medium}}
          style={{flexDirection: 'row', alignItems: 'center'}}
          valueStyle={{...globalStyles.text15Bold}}
          onSelected={(option: number | undefined) => onChangeItem(option)}
        />
      )}
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
    justifyContent: 'space-between',
  },
});
