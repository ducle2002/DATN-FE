import {StyleSheet, View} from 'react-native';
import React, {useMemo} from 'react';
import DropdownMenu from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import {useAppSelector} from '@/hooks/redux.hook';

type Props = {
  onChange: Function;
  selected: number | undefined;
};

const FilterService = ({onChange = () => {}, selected}: Props) => {
  const {services} = useAppSelector(state => state.localService);

  const selectedLabel = useMemo<string>(
    () => services.find(v => v.type === selected)?.name ?? 'Tất cả',
    [selected, services],
  );

  const filter = useMemo(
    () => [
      {id: undefined, label: 'all'},
      ...services.filter(o => o.type).map(o => ({id: o.type, label: o.name})),
    ],
    [services],
  );

  return (
    <View style={styles.container}>
      <DropdownMenu
        selectedLabel={selectedLabel}
        label={'Loại dịch vụ'}
        labelStyle={{...globalStyles.text15Medium}}
        style={{flexDirection: 'row', alignItems: 'center'}}
        valueStyle={{...globalStyles.text15Bold}}
        options={filter}
        onSelected={(option: number) => {
          onChange(option);
        }}
      />
    </View>
  );
};

export default FilterService;

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
