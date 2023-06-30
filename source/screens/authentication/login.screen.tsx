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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm<ILoginPayload>({});
  const {mutate} = useMutation({
    mutationFn: (params: ILoginPayload) =>
      AuthenticationApi.loginRequest(params),
    onSuccess: result => {
      console.log(result);

      AsyncStorage.setItem(
        'Token',
        JSON.stringify({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        }),
      );
      dispatch(loginSuccess(result));
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
        name="tenancyName"
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={{backgroundColor: 'white', height: 30, marginBottom: 10}}
          />
        )}
      />
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
        <Text>{language.t(languageKeys.auth.login.login)}</Text>
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {},
});
