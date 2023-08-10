import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {LocalServiceStackParamsList} from '@/routes/local-service.stack';
import {
  EBookingState,
  TOpenTime,
  UnitTime,
} from '@/modules/local-service/local-service.model';
import language, {languageKeys} from '@/config/language/language';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import LocalServiceApi, {
  TUpdateStateParams,
} from '@/modules/local-service/local-service.service';
import ReactNativeModal from 'react-native-modal';
import CTextInput from '@/components/text-input.component';
import globalStyles from '@/config/globalStyles';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';
type Props = StackScreenProps<
  LocalServiceStackParamsList,
  'DETAIL_BOOKING_SCREEN'
>;

type formValue = {
  refuseReason: string;
};

const BookingDetailScreen = ({route, navigation}: Props) => {
  const cancelSchema = yup.object({
    refuseReason: yup
      .string()
      .required(language.t(languageKeys.shared.form.requiredMessage)),
  });
  const {booking} = route.params;

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<formValue>({
    defaultValues: {
      refuseReason: '',
    },
    resolver: yupResolver(cancelSchema),
  });

  const {data: timeBooked} = useQuery({
    queryKey: ['time-booked', booking.id],
    queryFn: () =>
      LocalServiceApi.getAllTimeBookedByItemRequest({
        itemBookingId: booking.itemBookingId,
        bookingDay: booking.bookingDay,
      }),
  });

  const {data: itemBooking} = useQuery({
    queryKey: ['item-booking', booking.itemBookingId],
    queryFn: () =>
      LocalServiceApi.getItemBookingByIdRequest({id: booking.itemBookingId}),
  });

  const bookingTime = useMemo(() => JSON.parse(booking.bookingTime), [booking]);

  const timeSlot = useMemo(() => {
    if (itemBooking) {
      const day = moment(booking?.bookingDay).day();
      let time: Array<TOpenTime> | undefined = [];
      if (day === 0) {
        time = itemBooking?.openTimes.CN;
      } else if (day === 1) {
        time = itemBooking?.openTimes.T2;
      } else if (day === 2) {
        time = itemBooking?.openTimes.T3;
      } else if (day === 3) {
        time = itemBooking?.openTimes.T4;
      } else if (day === 4) {
        time = itemBooking?.openTimes.T5;
      } else if (day === 5) {
        time = itemBooking?.openTimes.T6;
      } else if (day === 6) {
        time = itemBooking?.openTimes.T7;
      }
      if (time && itemBooking?.unit) {
        const open = moment(time[0].openTime, 'HH:mm');
        const close = moment(time[0].closeTime, 'HH:mm');

        const openHour = open.hour() + open.minute() / 60;
        const closeTime = close.hour() + close.minute() / 60;

        var timeSkip = UnitTime[itemBooking?.unit];

        var ts: Array<string> = [];

        for (let i = openHour; i < closeTime; i += timeSkip) {
          let start = moment.utc(i * 3600 * 1000).format('HH:mm');
          let end;
          if (i + timeSkip > closeTime) {
            end = moment.utc(closeTime * 3600 * 1000).format('HH:mm');
          } else {
            end = moment.utc((i + timeSkip) * 3600 * 1000).format('HH:mm');
          }
          ts = [...ts, start + '-' + end];
        }
        return ts;
      }
    }
    return [];
  }, [booking?.bookingDay, itemBooking]);

  const {mutate: updateBooking} = useMutation({
    mutationFn: (params: TUpdateStateParams) =>
      LocalServiceApi.updateStateBookingRequest(params),
    onSuccess: () => {
      if (isVisible) {
        toggleVisible();
      }
      queryClient.refetchQueries(['booking', booking.storeId]);
      navigation.goBack();
    },
  });

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const onSubmit = (data: formValue) => {
    updateBooking({
      bookingId: booking.id,
      state: EBookingState.denied,
      refuseReason: data.refuseReason,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal: 16}}>
        <Text style={styles.textStatus}>
          {language.t(
            languageKeys.localService.status[EBookingState[booking.state]],
          )}
        </Text>
        <Text>{booking.itemBookingName}</Text>
        <View style={[styles.row, styles.blueBackground]}>
          <Text style={styles.textTitle}>
            {language.t(languageKeys.localService.booking.customerName)}
          </Text>
          <Text style={styles.textValue}>{booking.customerName.trim()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textTitle}>
            {language.t(languageKeys.localService.booking.buildingCode)}
          </Text>
          <Text style={styles.textValue}>
            {booking.customerInfo?.buildingCode}
          </Text>
        </View>
        <View style={[styles.row, styles.blueBackground]}>
          <Text style={styles.textTitle}>
            {language.t(languageKeys.localService.booking.customerPhoneNumber)}
          </Text>
          <Text style={styles.textValue}>{booking.customerPhoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textTitle}>
            {language.t(languageKeys.localService.booking.address)}
          </Text>
          <Text style={styles.textValue}>{booking.customerAddress}</Text>
        </View>
        <View style={[styles.row, styles.blueBackground]}>
          <Text style={styles.textTitle}>
            {language.t(languageKeys.localService.booking.bookingDate)}
          </Text>
          <Text style={styles.textValue}>{booking.bookingDay}</Text>
        </View>
        {timeSlot.length > 0 && (
          <View>
            <Text style={[styles.textTitle, {marginTop: 10}]}>
              {language.t(languageKeys.localService.booking.bookingTime)}
            </Text>
            <View
              style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
              {timeSlot.map((t: string) => (
                <View
                  key={t}
                  style={[
                    styles.timeSlot,
                    {
                      backgroundColor: !bookingTime.includes(t)
                        ? timeBooked?.includes(t)
                          ? '#64748b'
                          : '#c0c0c0'
                        : booking.state === EBookingState.accepted ||
                          booking.state === EBookingState.requesting
                        ? '#22c55e'
                        : '#ef4444',
                    },
                  ]}>
                  <Text style={[styles.textTimeSlot, {color: 'white'}]}>
                    {t}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <BottomContainer
        style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button onPress={() => toggleVisible()} mode="outlined">
          {language.t(languageKeys.shared.button.deny)}
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            updateBooking({
              bookingId: booking.id,
              state: EBookingState.accepted,
            });
          }}>
          {language.t(languageKeys.shared.button.accept)}
        </Button>
      </BottomContainer>

      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.1}
        isVisible={isVisible}>
        <View style={styles.modal}>
          <Text style={{...globalStyles.text15Medium, marginBottom: 10}}>
            {language.t(languageKeys.localService.booking.refuseReason)}
          </Text>
          <Controller
            control={control}
            name="refuseReason"
            render={({field: {value, onChange}}) => (
              <CTextInput
                errorMessage={errors.refuseReason?.message}
                value={value}
                onChangeText={onChange}
                style={{backgroundColor: '#64C6DD'}}
              />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <Button
              mode="outlined"
              onPress={() => {
                toggleVisible();
              }}>
              {language.t(languageKeys.shared.button.cancel)}
            </Button>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              {language.t(languageKeys.shared.button.deny)}
            </Button>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  textStatus: {
    ...globalStyles.text17Bold,
    marginVertical: 10,
  },
  textTitle: {
    ...globalStyles.text16Medium,
    flex: 1,
  },
  textValue: {
    ...globalStyles.text16Medium,
    textAlign: 'left',
    flex: 1,
  },
  blueBackground: {
    backgroundColor: '#f1f2f8',
  },
  textTimeSlot: {
    ...globalStyles.text14Bold,
  },
  timeSlot: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
