import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import AuthenticationApi from '@/modules/auth/auth.service';
import {ILoginPayload} from '@/modules/auth/auth.model';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '@/modules/auth/auth.slice';
import language, {languageKeys} from '@/config/language/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/button.component';
import InputComponent from './components/input.component';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const loginSchema = yup.object({
  userNameOrEmailAddress: yup.string().required(),
  password: yup.string().required(),
});

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm<ILoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const {mutate: login} = useMutation({
    mutationFn: (params: ILoginPayload) =>
      AuthenticationApi.loginRequest(params),
    onSuccess: result => {
      AsyncStorage.setItem(
        'Token',
        JSON.stringify({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          tenantId: result.tenantId,
          encryptedAccessToken: result.encryptedAccessToken,
        }),
      );

      dispatch(loginSuccess(result));
    },
    onError: error => {
      console.log(error);
    },
  });

  const onSubmit = (data: ILoginPayload) => {
    login({...data, tenancyName: 'keangnam'});
  };

  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      style={styles.imageBackgroundcontainer}
      blurRadius={10}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Controller
            {...{control}}
            name="userNameOrEmailAddress"
            render={({field: {value, onChange}}) => (
              <InputComponent
                containerStyle={styles.inputContainer}
                placeholder={language.t(
                  languageKeys.auth.form.userNamePlaceholder,
                )}
                value={value}
                onChangeText={onChange}
                iconName="person"
                iconType="Ionicons"
                iconColor="#0A167C"
              />
            )}
          />
          <Controller
            {...{control}}
            name="password"
            render={({field: {value, onChange}}) => (
              <InputComponent
                placeholder={language.t(
                  languageKeys.auth.form.passwordPlaceholder,
                )}
                value={value}
                onChangeText={onChange}
                iconName="lock-closed"
                iconType="Ionicons"
                iconColor="#0A167C"
                containerStyle={styles.inputContainer}
                secureTextEntry={true}
              />
            )}
          />
          <Button
            style={styles.button}
            mode="contained-tonal"
            onPress={handleSubmit(onSubmit)}>
            <Text>{language.t(languageKeys.auth.login.login)}</Text>
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageBackgroundcontainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#091D66B2',
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: '40%',
  },
  inputContainer: {
    marginTop: 20,
  },
  button: {
    marginTop: 30,
  },
});
