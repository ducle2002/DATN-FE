import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import Icon, {TypeIcon} from '@/components/icon.component';
import globalStyles from '@/config/globalStyles';
import CTextInput from '@/components/text-input.component';
import language from '@/config/language/language';

type Props = React.ComponentProps<typeof TextInput> & {
  iconName: string;
  iconType: TypeIcon;
  iconColor: string;
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage: string | undefined;
};

const InputComponent = ({
  iconName,
  iconType,
  iconColor,
  containerStyle,
  secureTextEntry,
  errorMessage,
  ...props
}: Props) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const toggleIsSecure = () => {
    setIsSecure(!isSecure);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} type={iconType} size={20} color={iconColor} />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <CTextInput
            autoCapitalize="none"
            placeholderTextColor={'#e4e4e4'}
            style={styles.input}
            secureTextEntry={isSecure}
            {...props}
          />
        </View>
        {errorMessage && (
          <Text style={styles.error}>{language.t(errorMessage)}</Text>
        )}
      </View>
      {secureTextEntry && (
        <Icon
          onPress={toggleIsSecure}
          type="Ionicons"
          name={isSecure ? 'eye-off' : 'eye'}
          size={25}
          color={'white'}
        />
      )}
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
    alignItems: 'center',
  },
  input: {
    ...globalStyles.text15Bold,
    flex: 1,
    paddingLeft: 10,
    color: 'white',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 5,
    width: 30,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    ...globalStyles.text12SemiBold,
    color: 'white',
    marginLeft: 10,
  },
});
