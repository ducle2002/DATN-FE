import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import React from 'react';
import Icon, {TypeIcon} from '@/components/icon.component';
import globalStyles from '@/config/globalStyles';
import CTextInput from '@/components/text-input.component';

type Props = React.ComponentProps<typeof TextInput> & {
  iconName: string;
  iconType: TypeIcon;
  iconColor: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const InputComponent = ({
  iconName,
  iconType,
  iconColor,
  containerStyle,
  ...props
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} type={iconType} size={20} color={iconColor} />
      </View>
      <CTextInput
        autoCapitalize="none"
        placeholderTextColor={'#e4e4e4'}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#0A167C',
  },
  input: {
    ...globalStyles.text14Medium,
    flex: 1,
    paddingLeft: 10,
    color: 'white',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    aspectRatio: 1,
  },
});
