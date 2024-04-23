import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import AuthenticationApi from '@/screens/authentication/services/auth.service';
import {
  ILoginPayload,
  IRegisterPayload,
} from '@/screens/authentication/services/auth.model';
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

const registerSchema = yup.object({
  emailAddress: yup.string().required(languageKeys.shared.form.requiredMessage),
  tenancyName: yup.string().required(languageKeys.shared.form.requiredMessage),
  password: yup.string().required(languageKeys.shared.form.requiredMessage),
  confirmPassword: yup
    .string()
    .required(languageKeys.shared.form.requiredMessage),
  phoneNumber: yup.string().required(languageKeys.shared.form.requiredMessage),
  fullName: yup.string().required(languageKeys.shared.form.requiredMessage),
});

type Props = StackScreenProps<AuthenticationStackParamsList, 'REGISTER'>;

const RegisterScreen = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IRegisterPayload>({
    resolver: yupResolver(registerSchema),
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

  const {mutate: register} = useMutation({
    mutationFn: (params: IRegisterPayload & {tenantId: number}) =>
      AuthenticationApi.registerRequest(params),
    onSuccess: (_result, params) => {
      toast.show('Đăng ký tài khoản thành công');

      login({...params, userNameOrEmailAddress: params.phoneNumber});
    },
    onError: ({response}) => {
      toast.show(
        response?.data?.error?.message
          ? response?.data?.error?.message
          : language.t(languageKeys.shared.error.connectionError),
        {
          placement: 'top',
        },
      );
    },
  });

  const {mutate: checkTenant} = useMutation({
    mutationFn: (params: IRegisterPayload) =>
      AuthenticationApi.tenantAvailable(params),
    onSuccess: (data, params) => {
      console.log(data.tenantId);
      console.log(params);
      register({...params, tenantId: data.tenantId});
    },
  });

  const onSubmit = (data: IRegisterPayload) => {
    checkTenant({...data});
  };

  return (
    <ImageBackground
      source={require('assets/images/login.background.png')}
      style={styles.imageBackgroundContainer}
      blurRadius={10}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Controller
              control={control}
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
              control={control}
              name="fullName"
              render={({field: {value, onChange}}) => (
                <InputComponent
                  containerStyle={styles.inputContainer}
                  placeholder={'Họ và tên'}
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
              name="emailAddress"
              render={({field: {value, onChange}}) => (
                <InputComponent
                  containerStyle={styles.inputContainer}
                  placeholder={'Địa chỉ email'}
                  value={value}
                  onChangeText={onChange}
                  iconName="person"
                  iconType="Ionicons"
                  iconColor="#0A167C"
                  errorMessage={errors.emailAddress?.message}
                />
              )}
            />
            <Controller
              {...{control}}
              name="phoneNumber"
              render={({field: {value, onChange}}) => (
                <InputComponent
                  placeholder={'Số điện thoại'}
                  value={value}
                  onChangeText={onChange}
                  iconName="call"
                  iconType="Ionicons"
                  iconColor="#0A167C"
                  containerStyle={styles.inputContainer}
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
            <Controller
              {...{control}}
              name="password"
              render={({field: {value, onChange}, fieldState: {error}}) => (
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
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              {...{control}}
              name="confirmPassword"
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <InputComponent
                  placeholder={'Nhập lại mật khẩu'}
                  value={value}
                  onChangeText={onChange}
                  iconName="lock-closed"
                  iconType="Ionicons"
                  iconColor="#0A167C"
                  containerStyle={styles.inputContainer}
                  secureTextEntry={true}
                  errorMessage={error?.message}
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
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
