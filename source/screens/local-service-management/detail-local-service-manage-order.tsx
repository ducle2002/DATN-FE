import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import {useQuery} from 'react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {STATUS_ORDER_LOCAL_SERVICE} from './services/local-service-management.model';

import {LocalServiceManagementStackParamsList} from '@/routes/local-service-management';
import LocalServiceManagementApi from './services/local-service-management.service';
import {chipWithStatus} from './services/local-service-management.hook';
import BookingDetailService from './components/booking-detail-service';
import {Chip} from 'react-native-paper';
import RateListStar from './components/rate-list-star';
const {height} = Dimensions.get('screen');
type Props = StackScreenProps<
  LocalServiceManagementStackParamsList,
  'DETAIL_ORDER_SCREEN'
>;
const DetailLocalServiceManageOrder = (props: Props) => {
  const {data: orderDetail} = useQuery({
    queryKey: ['DigitalServiceOrder/GetById', props.route.params.id],
    queryFn: () =>
      LocalServiceManagementApi.getServiceOrderById({
        id: props.route.params.id,
      }),
  });

  const chipInfo = useMemo(() => {
    return chipWithStatus(orderDetail?.status ?? 0);
  }, [orderDetail?.status]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '25%',
        }}>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.txtLabel}>Trạng thái: </Text>
            <Chip
              textStyle={{
                color: chipInfo.txtColor,
              }}
              style={{
                backgroundColor: chipInfo.color,
              }}>
              {chipInfo?.label}
            </Chip>
          </View>
          <View style={styles.row}>
            <Text style={[styles.txtLabel, {width: '25%'}]}>Người đặt: </Text>
            <Text style={styles.txtContent}>
              {orderDetail?.creatorCitizen?.fullName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.txtLabel, {width: '25%'}]}>Ngày đặt: </Text>
            <Text style={styles.txtContent}>
              {moment(orderDetail?.creationTime).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.txtLabel, {width: '25%'}]}>Địa chỉ: </Text>
            <Text style={styles.txtContent} numberOfLines={1}>
              {orderDetail?.address}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.txtLabel, {width: '25%'}]}>Liên hệ: </Text>
            <Text style={styles.txtContent} numberOfLines={1}>
              {orderDetail?.creatorCitizen?.phoneNumber ?? 'Đang cập nhật'}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.txtLabel, {width: '25%'}]}>Tổng tiền: </Text>
            <Text style={styles.txtCurrency}>
              {orderDetail?.totalAmount.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </Text>
          </View>
        </View>
        {orderDetail?.status === STATUS_ORDER_LOCAL_SERVICE.EXCHANGE && (
          <View style={styles.section}>
            <Text style={styles.txtLabel}>Nội dung trao đổi: </Text>
            <Text style={styles.txtContent}>{orderDetail.responseContent}</Text>
          </View>
        )}

        {!!orderDetail?.arrServiceDetails &&
          orderDetail.arrServiceDetails
            ?.filter(item => Number(item.total) !== 0)
            .map((item, index) => {
              return (
                <View key={index}>
                  <BookingDetailService item={item} />
                </View>
              );
            })}
        {orderDetail?.ratingScore && (
          <View style={styles.section}>
            <Text style={styles.txtLabel}>Đánh giá</Text>
            <View style={[styles.row, {paddingVertical: '1.5%'}]}>
              <RateListStar
                size={24}
                pointStar={Number(orderDetail.ratingScore)}
              />
              <Text
                style={
                  styles.txtStar
                }>{`(${orderDetail.ratingScore}/5 sao)`}</Text>
            </View>
            <Text style={styles.txtContent}>{orderDetail.comments}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailLocalServiceManageOrder;

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 8,
  },
  txtLabel: {
    ...globalStyles.text14SemiBold,
  },
  txtContent: {
    ...globalStyles.text14Regular,
    color: '#353535',
  },
  footer: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: '10%',
    paddingTop: '5%',
    paddingHorizontal: '4%',
    borderTopWidth: 2,
    borderColor: '#f8f9fa',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: '2%',
  },

  btn: {
    // width: '40%',
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  txtBtn: {
    ...globalStyles.text15Bold,
    color: 'white',
  },
  btnSolid: {
    backgroundColor: '#339FD9',
  },
  btnSoft: {
    backgroundColor: 'rgba(74, 195, 251, 0.3)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtCurrency: {
    ...globalStyles.text14SemiBold,
    color: '#0077b6',
  },
  txtErr: {
    ...globalStyles.text12Medium,
    color: '#9d0208',
  },
  textareaContainer: {
    height: (height * 120) / 812,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(224, 224, 224, 0.5)',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: (height * 120) / 812,
    fontSize: 14,
    color: '#333',
    paddingVertical: 20,
  },
  txtStar: {
    ...globalStyles.text13SemiBold,
    paddingLeft: 4,
    color: '#ff7b00',
  },
});
