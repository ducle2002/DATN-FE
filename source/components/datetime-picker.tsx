import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import globalStyles from '@/config/globalStyles';

type Props = React.ComponentProps<typeof DatePicker> & {
  textDisplayStyle?: TextStyle;
  textContainerStyle?: ViewStyle;
};

const DateTimePicker = ({
  onConfirm,
  textDisplayStyle,
  textContainerStyle,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View style={textContainerStyle}>
        <Text
          style={[styles.text, textDisplayStyle]}
          onPress={() => setOpen(true)}>
          {moment(props.date).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
      <DatePicker
        modal
        open={open}
        onConfirm={date => {
          if (onConfirm) {
            onConfirm(date);
          }
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        {...props}
      />
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text15Medium,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
