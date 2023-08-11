import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useQueries} from 'react-query';
import QAApi from '@/modules/qa/qa.service';
import {StackScreenProps} from '@react-navigation/stack';
import {QAStackParamsList} from '@/routes/question-answer.stack.screen';
import {useQAData} from '@/modules/qa/qa.hook';

type Props = StackScreenProps<QAStackParamsList, 'DETAIL_SCREEN'>;

const DetailScreen = ({navigation, route}: Props) => {
  const {id} = route.params;

  const {
    questionQuery: {data: question},
  } = useQAData(id);

  console.log(question);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: question?.threadTitle,
    });
  }, [navigation, question?.threadTitle]);

  return (
    <View style={styles.container}>
      <Text>{question?.threadTitle}</Text>
      <Text>{question?.creatorName}</Text>
      <Text>{question?.content}</Text>
    </View>
  );
};
export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
