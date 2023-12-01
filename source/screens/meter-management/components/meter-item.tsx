import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TMeter} from '../models/model';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  MeterDrawerParamsList,
  MeterStackParamsList,
} from '@/routes/operating/meter.stack';
import {StackNavigationProp} from '@react-navigation/stack';
type Props = {
  item: TMeter;
  navigation?: CompositeNavigationProp<
    DrawerNavigationProp<MeterDrawerParamsList, 'LIST_INDEX'>,
    StackNavigationProp<MeterStackParamsList, 'MAIN_SCREEN'>
  >;
};

const MeterItem = ({item, navigation}: Props) => {
  return (
    <ItemCard
      onPress={() => navigation?.navigate('METER_DETAIL', {id: item.id})}>
      <View>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textApartment}>{item.apartmentCode}</Text>
      </View>
    </ItemCard>
  );
};

export default MeterItem;

const styles = StyleSheet.create({
  textName: {
    ...globalStyles.text15Bold,
  },
  textApartment: {
    ...globalStyles.text14Medium,
  },
});
