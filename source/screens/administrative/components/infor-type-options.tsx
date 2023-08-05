import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  label: string;
  optionValue: any;
};
const InforTypeOptions = ({label, optionValue}: Props) => {
  //   console.log(optionValue);

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text>{label}: </Text>
      <Text>{optionValue?.displayName}</Text>
    </View>
  );
};

export default InforTypeOptions;

const styles = StyleSheet.create({});
