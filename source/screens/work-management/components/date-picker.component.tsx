import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import Button from '@/components/button.component';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Icon from '@/components/icon.component';
import language, {languageKeys} from '@/config/language/language';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  minimumDate?: string;
  maximumDate?: string;
  labelStyle?: StyleProp<TextStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
};

const DatePickerComponent = ({
  value,
  onChange = () => {},
  label,
  minimumDate,
  labelStyle,
  inputContainerStyle,
  containerStyle,
  labelContainerStyle,
  errorMessage,
}: Props) => {
  const [modal, setIsVisible] = useState<{
    isVisible: boolean;
    mode: 'date' | 'time' | 'datetime' | undefined;
  }>({isVisible: false, mode: undefined});

  return (
    <>
      <View style={containerStyle}>
        {label && (
          <View style={labelContainerStyle}>
            <Text style={labelStyle}>{label}</Text>
          </View>
        )}
        <View style={[styles.container, inputContainerStyle]}>
          <Button
            onPress={() =>
              setIsVisible({
                isVisible: true,
                mode: 'time',
              })
            }>
            {value
              ? moment(value).format('HH:mm')
              : language.t(languageKeys.shared.button.pickTime)}
          </Button>
          <Button
            onPress={() =>
              setIsVisible({
                isVisible: true,
                mode: 'date',
              })
            }>
            {value
              ? moment(value).format('DD-MM-YYYY')
              : language.t(languageKeys.shared.button.pickDate)}
          </Button>
          <Icon
            size={30}
            type="Ionicons"
            name="calendar"
            onPress={() =>
              setIsVisible({
                isVisible: true,
                mode: 'datetime',
              })
            }
            style={{marginLeft: 'auto'}}
            color="#429AE0"
          />
        </View>
        {errorMessage && <Text>{errorMessage}</Text>}
      </View>
      <DatePicker
        date={moment(value ? value : undefined).toDate()}
        modal={true}
        open={modal.isVisible}
        onCancel={() => {
          setIsVisible({isVisible: false, mode: undefined});
        }}
        onConfirm={date => {
          setIsVisible({isVisible: false, mode: undefined});
          onChange(moment(date).toISOString());
        }}
        mode={modal.mode}
        theme="light"
        minimumDate={moment(minimumDate ? minimumDate : undefined).toDate()}
        maximumDate={moment(minimumDate ? minimumDate : undefined)
          .add(1, 'M')
          .toDate()}
        locale="vi"
      />
    </>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
