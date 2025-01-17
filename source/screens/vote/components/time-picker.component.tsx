import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DateTimePicker from '@/components/datetime-picker';
import globalStyles from '@/config/globalStyles';

type Props = React.ComponentProps<typeof DateTimePicker> & {
  label?: string;
};

const TimePicker = ({label, ...props}: Props) => {
  return (
    <View>
      {label && <Text style={styles.textLabel}>{label}</Text>}
      <DateTimePicker textDisplayStyle={styles.textLabel} {...props} />
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  textLabel: {
    ...globalStyles.text15Medium,
  },
});
