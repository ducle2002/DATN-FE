import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {FormProvider, useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {SettingStackParamsList} from '@/routes/settings.stack';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from '@/components/icon.component';
import {useToast} from 'react-native-toast-notifications';
import ChangePasswordInput from './components/change-password-input';
import {useChangePasswordValidator} from '@/validators/settings/change-password.validator';
import {TChangePasswordForm} from '@/modules/setting/setting.model';
import SettingApi from '@/modules/setting/setting.service';

type Props = StackScreenProps<SettingStackParamsList, 'ChangePasswordScreen'>;

const ChangePasswordScreen = ({navigation}: Props) => {
  const toast = useToast();
  const methods = useForm<TChangePasswordForm>({
    resolver: useChangePasswordValidator(),
  });

  const onSubmit = (data: TChangePasswordForm) => {
    changePassword(data);
  };
  const onError = (errors: any) => {
    console.log(errors);
  };

  const {mutate: changePassword} = useMutation({
    mutationFn: (data: TChangePasswordForm) => SettingApi.changePassword(data),
    onSuccess: () => {
      toast.show('Đổi mật khẩu thành công', {
        duration: 1000,
        type: 'success',
      });
    },
    onError: () => {
      toast.show('Đổi mật khẩu thất bại', {
        duration: 1000,
        type: 'danger',
      });
    },
    onSettled: () => {
      navigation.goBack();
    },
  });

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              type="Ionicons"
              name="chevron-back"
              size={24}
              color={'#2B5783'}
            />
          </Pressable>
          <Text style={styles.txtHeader}>{'Đổi mật khẩu'}</Text>
          <View />
        </View>
        <View style={{paddingHorizontal: 10, paddingTop: 30}}>
          <ChangePasswordInput
            name="currentPassword"
            label={'Mật khẩu hiện tại'}
          />
          <ChangePasswordInput name="newPassword" label={'Mật khẩu mới'} />
          <ChangePasswordInput
            name="confirmPassword"
            label={'Nhập lại mật khẩu mới'}
          />
          <Button
            icon={'lock'}
            onPress={methods.handleSubmit(onSubmit, onError)}
            mode="contained"
            style={{
              backgroundColor: '#339FD9',
              width: '100%',
            }}>
            {'Lưu mật khẩu mới'}
          </Button>
        </View>
      </SafeAreaView>
    </FormProvider>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
  },
  wrapper: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
});
