import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import globalStyles from '@/config/globalStyles';

type Props = React.ComponentProps<typeof TextInput> & {
  errorMessage?: string;
  containerStyle?: ViewStyle;
  label?: string;
};

const CTextInput = ({
  style,
  label,
  errorMessage,
  containerStyle,
  ...props
}: Props) => {
  return (
    <>
      {label && <Text style={styles.textLabel}>{label}</Text>}
      <View style={[styles.container, containerStyle]}>
        <TextInput style={[styles.textInput, style]} {...props} />
      </View>
      <Text style={styles.textError}>{errorMessage}</Text>
    </>
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    minHeight: 35,
  },
  textLabel: {
    ...globalStyles.text15Bold,
    marginBottom: 5,
  },
  textInput: {
    ...globalStyles.text15Medium,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: Platform.OS === 'android' ? 2 : 8,
    paddingHorizontal: 10,
    minHeight: 35,
    flex: 1,
  },
  textError: {
    ...globalStyles.text12Medium,
    color: 'red',
    marginTop: 5,
  },
});
