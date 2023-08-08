import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';
const {width} = Dimensions.get('screen');
type Props = {
  label: string;
  value: string;
};
const InforTypeHtml = ({label, value}: Props) => {
  return (
    <View
      style={{
        paddingHorizontal: '2%',
      }}>
      <RenderHTML source={{html: label}} contentWidth={width} />
      {/* {value && <RenderHTML source={{html: value}} contentWidth={width} />} */}
    </View>
  );
};

export default InforTypeHtml;

const styles = StyleSheet.create({});
