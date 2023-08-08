import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  EBookingState,
  TBooking,
} from '@/modules/local-service/local-service.model';
import ItemCard from '@/components/item-card.component';
import moment from 'moment';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import Icon from '@/components/icon.component';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LocalServiceStackParamsList} from '@/routes/local-service.stack';

type Props = {item: TBooking};

const BookingItem = ({item}: Props) => {
  const navigation =
    useNavigation<NavigationProp<LocalServiceStackParamsList>>();
  return (
    <ItemCard
      onPress={() => {
        navigation.navigate('DETAIL_BOOKING_SCREEN', {booking: item});
      }}>
      <View style={styles.iconContainer}>
        <Icon type="Ionicons" name="document-text" size={30} color={'white'} />
      </View>
      <View style={{marginLeft: 10}}>
        <Text style={styles.textName}>{item.itemBookingName}</Text>
        <Text style={styles.textCustomer}>{item.customerName.trim()}</Text>
        <Text style={styles.textTime}>
          {language.t(languageKeys.localService.booking.creationTime)}{' '}
          {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
        <Text style={styles.textStatus}>
          {language.t(
            languageKeys.localService.status[EBookingState[item.state]],
          )}
        </Text>
      </View>
    </ItemCard>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  textName: {
    ...globalStyles.text16Medium,
  },
  textCustomer: {
    ...globalStyles.text15Medium,
    color: '#4AC3FB',
  },
  textTime: {
    ...globalStyles.text14Medium,
    color: '#808694',
  },
  textStatus: {
    ...globalStyles.text13Bold,
  },
  iconContainer: {
    borderRadius: 100,
    backgroundColor: '#5BBAEF',
    aspectRatio: 1,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
