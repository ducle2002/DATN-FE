import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StatisticStackParamsList} from '@/routes/ statistic.stack';
type Props = StackScreenProps<StatisticStackParamsList, 'FEEDBACK_STATISTIC'>;
const FeedbackStatisticScreen = (props: Props) => {
  return (
    <View>
      <Text>FeedbackStatisticScreen</Text>
    </View>
  );
};

export default FeedbackStatisticScreen;

const styles = StyleSheet.create({});
