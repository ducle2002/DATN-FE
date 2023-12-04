import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IconStatistic} from '../icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StatisticStackParamsList} from '@/routes/ statistic.stack';

const ItemStatistic = ({
  item,
}: {
  item: {name: string; hint: string; type: number};
}) => {
  const navigation =
    useNavigation<NavigationProp<StatisticStackParamsList, 'MAIN_SCREEN'>>();
  const NavigateToStatisticDetail = () => {
    switch (item.type) {
      case 7:
        navigation.navigate('FEEDBACK_STATISTIC');
        break;
      default:
        break;
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        NavigateToStatisticDetail();
      }}>
      <View style={styles.containerIcon}>
        <IconStatistic.ItemIconMenu />
      </View>
      <View style={styles.containerTxt}>
        <Text style={styles.txtLabel}>{item.name}</Text>
        <Text style={styles.txtHint}>{item.hint}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemStatistic;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: '2%',
    marginTop: '2%',
    padding: '2.5%',
    borderRadius: 8,
  },
  txtLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#50555C',
    lineHeight: 24,
  },
  txtHint: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 24,
    color: '#50555C',
  },
  containerIcon: {
    borderRadius: 40,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    padding: 10,
  },
  containerTxt: {
    paddingLeft: '4%',
  },
});
