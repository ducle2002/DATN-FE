import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useController, useFormContext} from 'react-hook-form';
import {TChangePasswordForm} from '@/modules/setting/setting.model';

type Props = {
  name: 'currentPassword' | 'newPassword' | 'confirmPassword';
  label?: string;
};

const ChangePasswordInput = ({name, label}: Props): JSX.Element => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const {control} = useFormContext<TChangePasswordForm>();
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({
    name,
    control,
  });

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        label={label}
        activeOutlineColor={'#0077b6'}
        activeUnderlineColor={'#0077b6'}
        outlineColor="gray"
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
        value={value}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye' : 'eye-off'}
            color={'#339FD9'}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
      />
      {error && (
        <Text
          style={[
            {
              color: '#9d0208',
              paddingHorizontal: 15,
              paddingTop: 5,
              fontSize: 12,
              fontWeight: '500',
            },
          ]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
  wrapper: {
    marginBottom: 20,
  },
});

export default ChangePasswordInput;
