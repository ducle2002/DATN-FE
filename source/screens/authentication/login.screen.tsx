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
import AuthenticationApi from '@/screens/authentication/services/auth.service';
import {ILoginPayload} from '@/screens/authentication/services/auth.model';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '@/screens/authentication/services/auth.slice';
import language, {languageKeys} from '@/config/language/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/button.component';
import InputComponent from './components/input.component';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToast} from 'react-native-toast-notifications';
import globalStyles from '@/config/globalStyles';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthenticationStackParamsList} from '@/routes/auth.stack';

const loginSchema = yup.object({
  userNameOrEmailAddress: yup
    .string()
    .required(languageKeys.shared.form.requiredMessage),
  password: yup.string().required(languageKeys.shared.form.requiredMessage),
  tenancyName: yup.string().required(languageKeys.shared.form.requiredMessage),
});

type Props = StackScreenProps<AuthenticationStackParamsList, 'LOGIN'>;

const LoginScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const toast = useToast();

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
    onError: ({response}) => {
      toast.show(
        response?.data?.error?.details
          ? response?.data?.error?.details
          : language.t(languageKeys.shared.error.connectionError),
      );
    },
  });

  const onSubmit = (data: ILoginPayload) => {
    login({...data});
  };

  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      style={styles.imageBackgroundContainer}
      blurRadius={10}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Controller
            {...{control}}
            name="tenancyName"
            render={({field: {value, onChange}}) => (
              <InputComponent
                containerStyle={styles.inputContainer}
                placeholder={language.t(
                  languageKeys.auth.form.tenancyPlaceholder,
                )}
                value={value}
                onChangeText={onChange}
                iconName="building"
                iconType="FontAwesome"
                iconColor="#0A167C"
                errorMessage={errors.tenancyName?.message}
              />
            )}
          />

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
                errorMessage={errors.userNameOrEmailAddress?.message}
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
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Text
            onPress={() => {
              navigation.navigate('REGISTER');
            }}
            style={styles.textPrivacy}>
            Đăng ký
          </Text>
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
  imageBackgroundContainer: {
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
  textPrivacy: {
    ...globalStyles.text13Bold,
    color: 'white',
    marginTop: 30,
    textAlign: 'left',
    alignSelf: 'flex-end',
    padding: 2,
  },
});
