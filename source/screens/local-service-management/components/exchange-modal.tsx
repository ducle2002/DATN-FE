import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {TLocalServiceManagementOrder} from '../services/local-service-management.model';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useToast} from 'react-native-toast-notifications';
import {useMutation, useQueryClient} from 'react-query';
import LocalServiceManagementApi from '../services/local-service-management.service';
const {width, height} = Dimensions.get('screen');
const ExchangeModal = ({
  data,
  onClose,
}: {
  data?: TLocalServiceManagementOrder;
  onClose: Function;
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const schema = useMemo(
    () =>
      yup.object().shape({
        totalAmount: yup.number().required('Trường này là bắt buộc'),
        responseContent: yup.string().required('Trường này là bắt buộc'),
      }),
    [],
  );
  const {control, handleSubmit, watch, setValue} = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {mutate: createFeedback, isLoading: loadingCreate} = useMutation({
    mutationKey: ['localService/createFeedback'],
    mutationFn: (dataSubmit: {
      id: number;
      responseContent: string;
      totalAmount: number;
    }) => LocalServiceManagementApi.updateFeedback(dataSubmit),
    onSuccess: () => {
      queryClient.refetchQueries(['localService/listAllOrder']);
      onClose();
      toast.show('Gửi phản hồi thành công', {
        type: 'success',
        placement: 'center',
        duration: 1000,
      });
    },
    onError: () => {
      toast.show('Gửi phản hồi thất bại', {
        type: 'danger',
        placement: 'center',
        duration: 1000,
      });
    },
  });
  const onSubmit = (dataForm: any) => {
    if (data?.id) {
      createFeedback({
        id: data.id,
        responseContent: dataForm.responseContent,
        totalAmount: dataForm.totalAmount,
      });
    }
  };
  useEffect(() => {
    if (data?.totalAmount) {
      setValue('totalAmount', data?.totalAmount);
    }
  }, [data, setValue]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: height * 0.5,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingTop: '3%',
          paddingHorizontal: '3%',
        }}>
        Gửi phản hồi
      </Text>

      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          marginTop: 12,
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '400',
            color: '#BDBDBD',
          }}>
          {'Giá'}
        </Text>
      </View>
      <Controller
        control={control}
        name="totalAmount"
        render={({field: {value, onChange}}) => (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(text: string) => {
                onChange(Number(text));
              }}
              value={value ? String(value) : ''}
              placeholder={'Nhập giá'}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              keyboardType="number-pad"
            />
          </View>
        )}
      />
      <View style={styles.labelContentFeedback}>
        <Text style={styles.txtLabelModalSolid}>{'Nội dung'}</Text>
      </View>
      <Controller
        control={control}
        name="responseContent"
        render={({field: {value, onChange}, fieldState}) => (
          <View>
            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textarea}
                onChangeText={(text: string) => {
                  onChange(text);
                }}
                value={value}
                multiline={true}
                maxLength={1000}
                placeholder={'Nhập nội dung phản hồi'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
              <Text style={styles.txtArea}>
                {watch('responseContent')?.length ?? 0}/1000
              </Text>
            </View>
            {fieldState?.error && (
              <Text style={styles.txtErr}>{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />
      <View style={[styles.iconAddContainer]}>
        <TouchableOpacity
          disabled={loadingCreate}
          onPress={handleSubmit(onSubmit)}
          style={styles.btnCreate}>
          <Text style={styles.txtBtnCreate}>{'Gửi'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExchangeModal;

const styles = StyleSheet.create({
  textareaContainer: {
    minHeight: (height * 120) / 812,
    width: (width * 343) / 375,
    padding: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(224, 224, 224, 0.5)',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: (height * 120) / 812,
    fontSize: 14,
    color: '#333',
    paddingVertical: 20,
  },
  txtArea: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '2%',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.5)',
  },
  labelContentFeedback: {
    width: '100%',
    alignItems: 'flex-start',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  txtLabelModalSolid: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
    color: '#4F4F4F',
  },
  textInputContainer: {
    width: (width * 343) / 375,
    paddingTop: 4,
    paddingBottom: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: 'rgba(224, 224, 224, 0.5)',
  },
  textInput: {
    fontSize: 15,
    color: '#333',
  },
  btnCreate: {
    height: (height * 44) / 812,
    width: (width * 343) / 375,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#339FD9',
    marginBottom: 24,
    borderRadius: 8,
  },
  txtBtnCreate: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  iconAddContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 16,
    zIndex: 0,
  },
  txtErr: {
    fontSize: 12,
    color: '#9d0208',
    fontWeight: '400',
    paddingHorizontal: '4%',
  },
});
