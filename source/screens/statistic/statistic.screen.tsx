import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StatisticStackParamsList} from '@/routes/ statistic.stack';
import Icon from '@/components/icon.component';
import ItemStatistic from './components/item-statistic';
import {TYPE_STATISTIC} from './constants/type-statistic';
type Props = StackScreenProps<StatisticStackParamsList>;
const StatisticScreen = ({route, navigation}: Props) => {
  return (
    <View>
      <ScrollView>
        {TYPE_STATISTIC.map((item, index) => {
          return (
            <View key={index}>
              <ItemStatistic item={item} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default StatisticScreen;

const styles = StyleSheet.create({});
