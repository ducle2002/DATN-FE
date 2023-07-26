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
        <Text style={styles.txtTitleASheet}>{'Chi tiết phản ánh'}</Text>
        <Pressable onPress={onClose}>
          <Text style={styles.txtbtnTitle}>{'Đóng'}</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.containerContent}>
          <Text style={styles.txtLabelDetail}>{'Tiêu đề'}</Text>
          <Text style={styles.txtContentDetail}>
            {'Phản ánh'} {data ? data.name : ''}
          </Text>
        </View>
        <View style={styles.state}>
          <Text style={styles.txtLabelDetail}>{'Trạng thái'}</Text>
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
                ? 'Phản ánh mới'
                : data.state <= 2 || data.state === -1
                ? 'Đang xử lí'
                : 'Đã xử lí'
              : ''}
          </Text>
        </View>
        <View style={styles.feedBackTime}>
          <Text style={styles.txtLabelDetail}>{'Thời gian phản ánh:'}:</Text>
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
          <Text style={styles.txtLabelDetail}>Nội dung:</Text>
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
              Ảnh phản ánh:
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
          <Text style={styles.txtBtnCreate}>{'Trả lời tin nhắn'}</Text>
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
