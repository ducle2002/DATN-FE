import {Platform, StyleSheet, TextInput} from 'react-native';
import React from 'react';

type Props = React.ComponentProps<typeof TextInput>;

const CTextInput = ({style, ...props}: Props) => {
  return <TextInput style={[styles.textInput, style]} {...props} />;
};

export default CTextInput;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: Platform.OS === 'android' ? 2 : 8,
    paddingHorizontal: 10,
    minHeight: 30,
  },
});
