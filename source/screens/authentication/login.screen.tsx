import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import AuthenticationApi from '@/modules/authentication/authentication.service';
import {Button} from 'react-native-paper';
import {ILoginPayload} from '@/modules/authentication/authentication.model';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '@/modules/authentication/authentication.slide';
import language, {languageKeys} from '@/config/language/language';

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();

  const {control, handleSubmit} = useForm<ILoginPayload>({});
  const {mutate} = useMutation({
    mutationFn: (params: ILoginPayload) =>
      AuthenticationApi.loginRequest(params),
    onSuccess: result => {
      dispatch(loginSuccess(result));
      console.log('result', result);
    },
    onError: error => {
      console.log(error);
    },
  });
  const onSubmit = (data: ILoginPayload) => {
    mutate(data);
  };
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      <Controller
        {...{control}}
        name="userNameOrEmailAddress"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={{backgroundColor: 'white', height: 30}}
          />
        )}
      />
      <Controller
        {...{control}}
        name="password"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={{backgroundColor: 'white', height: 30, marginTop: 10}}
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>
        {/* <Text>{language.t}</Text> */}
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
});
