import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import {CompositeNavigationProp} from '@react-navigation/native';
import {
  MeterDrawerParamsList,
  MeterStackParamsList,
} from '@/routes/operating/meter.stack';
import {TMeterMonthly} from '../models/model';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {StackNavigationProp} from '@react-navigation/stack';
import language, {languageKeys} from '@/config/language/language';
import {useListMeterType} from '../hooks/useListMeterTypes';
import moment from 'moment';
type Props = {
  item: TMeterMonthly;
  navigation?: CompositeNavigationProp<
    DrawerNavigationProp<MeterDrawerParamsList, 'LIST_INDEX'>,
    StackNavigationProp<MeterStackParamsList, 'MAIN_SCREEN'>
  >;
};

const RecorderItem = ({item, navigation}: Props) => {
  const {data} = useListMeterType();
  return (
    <ItemCard
      style={styles.container}
      onPress={() => {
        navigation?.navigate('MONTHLY_DETAIL', {id: item.id});
      }}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.residentLanguage.resident.apartmentCode)}{' '}
            <Text>{item.apartmentCode}</Text>
          </Text>
          <Text>
            {data?.meterTypes.find(t => t.id === item.meterTypeId)?.name}
          </Text>
          <Text>{item.urbanName}</Text>
          <Text>{item.buildingName}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.textPeriod}>
            {moment(item.period).format('11/YYYY')}
          </Text>
          <Text style={styles.textValue}>{item.value}</Text>
        </View>
      </View>
    </ItemCard>
  );
};

export default memo(RecorderItem);

const styles = StyleSheet.create({
  container: {
    borderColor: '#4E5B8A',
    borderWidth: 0,
    borderRadius: 8,
    shadowOpacity: 0.3,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  textLabel: {
    ...globalStyles.text16Bold,
  },
  textValue: {
    ...globalStyles.text15SemiBold,
  },
  textPeriod: {
    ...globalStyles.text14Medium,
    color: '#ababab',
  },
});
