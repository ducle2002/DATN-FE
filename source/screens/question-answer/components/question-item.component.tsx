import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TQuestion} from '@/screens/question-answer/services/qa.model';
import ItemCard from '@/components/item-card.component';
import ThumbnailImage from '@/components/thumbnail-image';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import language, {languageKeys} from '@/config/language/language';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {QAStackParamsList} from '@/routes/question-answer.stack.screen';

type Props = {question: TQuestion};

const QuestionItem = ({question}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<QAStackParamsList, 'MAIN_SCREEN'>>();
  return (
    <ItemCard
      onPress={() => {
        navigation.navigate('DETAIL_SCREEN', {id: question.id});
      }}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <ThumbnailImage
          source={{uri: question.creatorAvatar}}
          size="256x256"
          style={styles.image}
        />
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.textThread}>
            {language.t(languageKeys.qa.question)}: {question.threadTitle}
          </Text>
          <Text numberOfLines={1} style={styles.textName}>
            {language.t(languageKeys.qa.creator)}:{' '}
            {question.creatorName?.trim()}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              height: 40,
              paddingVertical: 5,
            }}>
            <Text style={styles.textTime}>
              {language.t(languageKeys.qa.crationTime)}:{' '}
              {moment(question.creationTime).format('HH:mm DD/MM/YYYY')}
            </Text>
            <View
              style={[
                styles.tagContainer,
                {
                  backgroundColor:
                    question.commentCount > 0 ? '#64C6DD' : '#F86F03',
                },
              ]}>
              <Text style={styles.textTag}>
                {language.t(languageKeys.qa.commentState_interval, {
                  count: question.commentCount,
                  postProcess: 'interval',
                })}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ItemCard>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textThread: {
    ...globalStyles.text16SemiBold,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  textTime: {
    ...globalStyles.text14Regular,
  },
  tagContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  textTag: {
    ...globalStyles.text13Bold,
    color: 'white',
  },
  textName: {
    ...globalStyles.text15Medium,
  },
});
