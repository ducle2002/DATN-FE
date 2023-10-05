import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {memo, useLayoutEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {QAStackParamsList} from '@/routes/question-answer.stack.screen';
import {useQAData} from '@/screens/question-answer/services/qa.hook';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import globalStyles from '@/config/globalStyles';
import ThumbnailImage from '@/components/thumbnail-image';
import moment from 'moment';
import language, {languageKeys} from '@/config/language/language';
import {
  EQuestionState,
  TCreateUpdateCommentParams,
  TQuestion,
} from '@/screens/question-answer/services/qa.model';
import BottomContainer from '@/components/bottom-container.component';
import CTextInput from '@/components/text-input.component';
import Icon from '@/components/icon.component';
import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import QAApi from '@/screens/question-answer/services/qa.service';
import {useAppSelector} from '@/hooks/redux.hook';
const {width} = Dimensions.get('screen');
type Props = StackScreenProps<QAStackParamsList, 'DETAIL_SCREEN'>;

const DetailScreen = ({navigation, route}: Props) => {
  const {id} = route.params;

  const {tenantId} = useAppSelector(state => state.auth);
  const {
    questionQuery: {data: question, refetch: refetchQuestion},
    answerQuery: {data: answer, refetch: refetchAnswer},
  } = useQAData(id);

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: question?.threadTitle,
    });
  }, [navigation, question?.threadTitle]);

  const {control, handleSubmit, watch} = useForm({
    defaultValues: {
      comment: '',
    },
  });

  const answerInput = watch('comment');

  const {mutate: updateState} = useMutation({
    mutationFn: () =>
      QAApi.updateStateQuestionRequest({id: id, state: EQuestionState.ACCEPT}),
    onSuccess: () => {
      refetchAnswer();
      refetchQuestion();
      queryClient.refetchQueries(['q-a']);
    },
  });

  const {mutate: sendComment, status} = useMutation({
    mutationFn: (params: TCreateUpdateCommentParams) =>
      QAApi.createOrUpdateCommentRequest(params),
    onSuccess: () => {
      updateState();
    },
  });

  const onSubmit = (data: {comment: string}) => {
    sendComment({
      id: answer && answer?.length > 0 ? answer[0].id : undefined,
      comment: data.comment,
      forumId: question?.id ?? id,
      tenantId: tenantId,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <ThumbnailImage
            size="256x256"
            source={{uri: question?.creatorAvatar}}
            style={styles.avatar}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.textThread}>
              {language.t(languageKeys.qa.question)}: {question?.threadTitle}
            </Text>
            <Text style={styles.textName}>
              {language.t(languageKeys.qa.creator)}: {question?.creatorName}
            </Text>
            <Text style={styles.textTime}>
              {language.t(languageKeys.qa.crationTime)}:{' '}
              {moment(question?.creationTime).format('HH:mm DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <View style={[styles.contentContainer, {borderTopLeftRadius: 0}]}>
            <RenderContent {...{question}} />
          </View>
        </View>
        {answer && answer.length > 0 && (
          <View style={styles.answerContainer}>
            <Text style={styles.textThread}>
              {language.t(languageKeys.qa.answer)}
            </Text>
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <ThumbnailImage
                source={{uri: answer[0].creatorAvatar}}
                style={styles.avatar}
                size="256x256"
              />
              <View style={{marginLeft: 10}}>
                <Text style={styles.textName}>
                  {language.t(languageKeys.qa.respondent)}:{' '}
                  {answer[0].creatorName}
                </Text>
                <Text style={styles.textTime}>
                  {language.t(languageKeys.qa.crationTime)}:{' '}
                  {moment(answer[0].creationTime).format('HH:mm DD/MM/YYYY')}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.contentContainer,
                {
                  borderTopRightRadius: 0,
                  width: '100%',
                },
              ]}>
              <Text style={{...globalStyles.text15Medium}}>
                {answer[0].comment}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {(!answer || answer.length === 0) && (
        <BottomContainer style={styles.bottomContainer}>
          <View style={{flex: 1}}>
            <Controller
              control={control}
              name="comment"
              render={({field: {value, onChange}}) => (
                <CTextInput
                  style={{backgroundColor: '#f1f2f8', borderRadius: 20}}
                  placeholder={language.t(languageKeys.qa.answer)}
                  withError={false}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={answerInput.length === 0 || status === 'loading'}
            style={{padding: 10, marginLeft: 10}}>
            <Icon
              onPress={handleSubmit(onSubmit)}
              type="Ionicons"
              name="send"
              size={30}
              color={answerInput.length === 0 ? '#ababab' : '#505DCF'}
              disabled={answerInput.length === 0 || status === 'loading'}
            />
          </Pressable>
        </BottomContainer>
      )}
    </View>
  );
};

const RenderContent = memo(({question}: {question: TQuestion | undefined}) => {
  return (
    <RenderHTML
      contentWidth={width}
      source={{html: question?.content ?? ''}}
      baseStyle={{
        ...globalStyles.text15Medium,
      }}
      systemFonts={[...defaultSystemFonts, 'Inter-Medium']}
    />
  );
});

export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  textThread: {
    ...globalStyles.text16SemiBold,
  },
  textName: {
    ...globalStyles.text15Medium,
  },
  textTime: {
    ...globalStyles.text14Regular,
  },
  avatar: {width: 50, height: 50, borderRadius: 50},
  contentContainer: {
    backgroundColor: '#f1f2f8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
  },
  answerContainer: {
    alignItems: 'flex-end',
    marginTop: 30,
    borderTopWidth: 5,
    borderTopColor: '#f1f2f8',
    paddingTop: 30,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
