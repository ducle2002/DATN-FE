import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {RichEditor} from 'react-native-pell-rich-editor';
import globalStyles from '@/config/globalStyles';

type Props = React.ComponentProps<typeof RichEditor> & {
  containerStyle?: ViewStyle;
  errorMessage?: string;
};

const TextEditor = ({containerStyle, errorMessage, ...props}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <RichEditor style={{flex: 1}} androidLayerType="software" {...props} />
      <Text style={styles.textError}>{errorMessage}</Text>
    </View>
  );
};

export default TextEditor;

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 5,
  },
  textError: {
    ...globalStyles.text12Medium,
    color: 'red',
  },
});
