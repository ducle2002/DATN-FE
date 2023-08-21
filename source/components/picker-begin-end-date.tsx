import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {MarkedDates} from 'react-native-calendars/src/types';

const PickerBeginEndDate = () => {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    [moment().format('YYYY-MM-DD')]: {
      startingDay: true,
      endingDay: true,
      color: '#0077b6',
      textColor: 'white',
    },
  });
  return (
    <Calendar
      onDayPress={day => {
        const listDay = Object.keys(markedDates);
        let beginDate = listDay[0];
        let endDate = listDay[listDay.length - 1];
        if (moment(day.dateString).diff(listDay[0], 'days') < 0) {
          beginDate = day.dateString;
          endDate = listDay[0];
        } else if (
          moment(day.dateString).diff(listDay[listDay.length - 1], 'days') > 0
        ) {
          endDate = day.dateString;
          beginDate = listDay[listDay.length - 1];
        } else {
          endDate = day.dateString;
          console.log(beginDate, endDate);
        }
        let newMarkedDates: MarkedDates = {};

        for (let i = 0; i <= moment(endDate).diff(beginDate, 'days'); i++) {
          newMarkedDates[
            `${moment(beginDate).add(i, 'days').format('YYYY-MM-DD')}`
          ] = {
            startingDay: i === 0,
            endingDay: i === moment(endDate).diff(beginDate, 'days'),
            color: '#0077b6',
            textColor: 'white',
          };
        }

        setMarkedDates(newMarkedDates);
      }}
      markingType="period"
      markedDates={markedDates}
    />
  );
};

export default PickerBeginEndDate;

const styles = StyleSheet.create({});
