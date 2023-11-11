import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/config/globalStyles';
import {TServiceDetailOrder} from '../services/local-service-management.model';
const {width, height} = Dimensions.get('screen');
const BookingDetailService = ({item}: {item: TServiceDetailOrder}) => {
  return (
    <View style={styles.cardDetail}>
      <View style={styles.imgDetailContainer}>
        <FastImage
          source={{uri: item.image}}
          style={{
            width: width * 0.2,
            aspectRatio: 1,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardDetailContent}>
        <Text style={styles.txtLabel} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.txtSubLabel} numberOfLines={2}>
          Số lượng: x{item.total}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.txtContent}>
            {item.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingDetailService;

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  txtSubLabel: {
    ...globalStyles.text13Medium,
    color: '#adb5bd',
  },
  cardDetail: {
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: '2%',
    padding: 8,
    backgroundColor: 'white',
  },
  imgDetailContainer: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetailContent: {
    justifyContent: 'space-between',
    paddingVertical: '2%',
    paddingLeft: '4%',
    width: width * 0.65,
  },
  txtContent: {
    ...globalStyles.text14SemiBold,
    color: '#0077b6',
  },
});
