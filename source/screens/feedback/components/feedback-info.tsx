import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TFeedback} from '@/modules/feedback/feedback.model';
import moment from 'moment';
import ImagesGridGallery from '@/components/images-grid-gallery';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';

const {width, height} = Dimensions.get('screen');
type Props = {
  data: TFeedback;
  onClickChat?: (event: GestureResponderEvent) => void;
  onClose?: (event: GestureResponderEvent) => void;
};
const FeedbackInfo = ({
  data,
  onClickChat = () => {},
  onClose = () => {},
}: Props) => {
  const {t} = useTranslation();
  return (
    <View
      style={{
        backgroundColor: 'white',
        maxHeight: height * 0.93,
        paddingTop: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}>
      <View style={styles.header}>
        <Text style={styles.txtTitleASheet}>
          {t(languageKeys.feedback.main.feedbackInfo.title)}
        </Text>
        <Pressable onPress={onClose}>
          <Text style={styles.txtbtnTitle}>
            {t(languageKeys.feedback.main.feedbackInfo.close)}
          </Text>
        </Pressable>
      </View>
      <ScrollView
        style={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.containerContent}>
          <Text style={styles.txtLabelDetail}>
            {t(languageKeys.feedback.main.feedbackInfo.label)}:
          </Text>
          <Text style={styles.txtContentDetail}>{data ? data.name : ''}</Text>
        </View>
        <View style={styles.state}>
          <Text style={styles.txtLabelDetail}>
            {t(languageKeys.feedback.main.feedbackInfo.status)}:
          </Text>
          <Text
            style={{
              ...styles.txtState,
              color: data
                ? data.state === null || data.state === 1
                  ? '#FEC458'
                  : data.state <= 2 || data.state === -1
                  ? '#339FD9'
                  : '#05B82C'
                : '#339FD9',
            }}>
            {data
              ? data.state === null || data.state === 1
                ? t(languageKeys.feedback.main.pending)
                : data.state <= 2 || data.state === -1
                ? t(languageKeys.feedback.main.handling)
                : t(languageKeys.feedback.main.Finished)
              : ''}
          </Text>
        </View>
        <View style={styles.feedBackTime}>
          <Text style={styles.txtLabelDetail}>
            {t(languageKeys.feedback.main.feedbackInfo.time)}:
          </Text>
          <Text style={styles.txtContentDetail}>
            {data ? moment(data.creationTime).format('HH:mm DD/MM/YYYY') : ''}
          </Text>
        </View>
        {/* {typeConfig !== 1 ? (
          <View style={styles.orgContainer}>
            <Text style={styles.txtLabelDetail}>{language.t('to')}:</Text>
            <Text style={styles.txtContentDetail}>{orgName}</Text>
          </View>
        ) : null} */}
        <View style={{paddingVertical: 10}}>
          <Text style={styles.txtLabelDetail}>
            {t(languageKeys.feedback.main.feedbackInfo.content)}:
          </Text>
          <Text
            style={[
              styles.txtContentDetail,
              {paddingVertical: 10, paddingHorizontal: '2%'},
            ]}>
            {data ? data.data : ''}
          </Text>
        </View>

        {!!data.fileUrl && (
          <View
            style={{
              paddingVertical: 10,
            }}>
            <Text style={[styles.txtLabelDetail, {paddingBottom: 10}]}>
              {t(languageKeys.feedback.main.feedbackInfo.imgfeedback)}:
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View style={{width: (width * 3) / 4}}>
                <ImagesGridGallery images={data.fileUrl?.split(',')} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{marginBottom: 24, alignItems: 'center'}}>
        <TouchableOpacity onPress={onClickChat} style={styles.btnCreate}>
          <Text style={styles.txtBtnCreate}>
            {t(languageKeys.feedback.main.feedbackInfo.chat)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedbackInfo;

const styles = StyleSheet.create({
  txtTitleASheet: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
    color: '#333333',
  },
  txtbtnTitle: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    color: '#2B5783',
  },
  txtLabelDetail: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    color: '#828282',
  },
  txtContentDetail: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    lineHeight: 18,
  },
  btnCreate: {
    height: (height * 44) / 812,
    width: (width * 343) / 375,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#339FD9',
    marginBottom: 24,
    borderRadius: 8,
  },
  txtBtnCreate: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  containerContent: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  state: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  txtState: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  feedBackTime: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  orgContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
