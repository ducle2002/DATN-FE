import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  label: string;
  optionValue: any;
};
const InforTypeOptions = ({label, optionValue}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: '2%',
        paddingTop: '2%',
      }}>
      <Text style={styles.txtLabel}>{label}: </Text>
      <Text style={styles.txtContent}>
        {optionValue?.displayName ?? 'Không có thông tin'}
      </Text>
    </View>
  );
};

export default InforTypeOptions;

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  txtContent: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
});
