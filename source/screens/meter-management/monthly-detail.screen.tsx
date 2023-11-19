import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {MeterStackParamsList} from '@/routes/operating/meter.stack';
import MeterMonthlyService from './services/meter-monthly.service';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {Controller, SubmitHandler, useForm, useWatch} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import ScannerView from '@/components/scanner-view';
import {TImagePicker} from '@/utils/image-picker-handle';
import UtilsApi from '@/services/utils.service';
import {useToast} from 'react-native-toast-notifications';
type Props = StackScreenProps<MeterStackParamsList, 'MONTHLY_DETAIL'>;

const MonthlyDetailScreen = ({navigation, route}: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {control, handleSubmit, register, resetField} = useForm<{
    value: number | string;
    image?: TImagePicker;
  }>();
  const image = useWatch({control: control, name: 'image'});

  const {data} = useQuery({
    queryKey: ['meter-monthly', route.params.id],
    queryFn: () => MeterMonthlyService.getById({id: route.params.id}),
  });

  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState(false);

  const {mutate: deleteRequest} = useMutation({
    mutationFn: () => MeterMonthlyService.delete({id: route.params.id}),
    onSuccess: () => {
      queryClient.refetchQueries(['list-meter-monthly']);
      setTimeout(() => {
        navigation.goBack();
      }, 200);
    },
  });

  register('value', {value: data?.value.toString(), valueAsNumber: true});

  const {mutate: updateRequest, status} = useMutation({
    mutationFn: (params: any) => MeterMonthlyService.update(params),
    onSuccess: () => {
      toast.show('Thêm chỉ số thành công');
      setTimeout(() => {
        setEditable(false);
        setNewImage(false);
      }, 200);
      queryClient.refetchQueries(['list-meter-monthly']);
      queryClient.refetchQueries(['meter-monthly', route.params.id]);
    },
  });

  const {mutate: uploadImageRequest, status: uploadStatus} = useMutation({
    mutationFn: params => {
      return UtilsApi.uploadImagesRequest(params.image ? [params.image] : []);
    },
    onSuccess: (result: any, params: any) => {
      updateRequest({...params, imageUrl: result[0]});
    },
  });

  const onSubmit: SubmitHandler<{
    value: number | string;
    image?: TImagePicker;
  }> = formData => {
    if (formData.image) {
      uploadImageRequest({
        ...data,
        ...formData,
      });
    } else {
      updateRequest({
        ...data,
        ...formData,
      });
    }
  };

  return (
    <View style={styles.container}>
      <>
        {data ? (
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Tên</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>{data.name}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Căn hộ</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>{data.apartmentCode}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Khu đô thị</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>{data.urbanName}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Tòa nhà</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>{data.buildingName}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Kì</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>
                    {moment(data.period).format('MM/YYYY')}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Ngày ghi</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>
                    {moment(data.creationTime).format('HH:mm DD/MM/YYYY')}
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.labelContainer}>
                  <Text style={styles.textLabel}>Người ghi</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.textValue}>{data.creatorUserName}</Text>
                </View>
              </View>

              <Controller
                control={control}
                name="value"
                render={({field: {value, onChange}}) => (
                  <View style={styles.row}>
                    <View style={styles.labelContainer}>
                      <Text style={styles.textLabel}>Chỉ số</Text>
                    </View>
                    <View style={styles.valueContainer}>
                      <CTextInput
                        value={value as string}
                        onChangeText={onChange}
                        editable={editable}
                        style={[
                          styles.textValue,
                          {
                            backgroundColor: undefined,
                            paddingHorizontal: 0,
                            paddingVertical: 0,
                          },
                        ]}
                        withError={false}
                      />
                    </View>
                  </View>
                )}
              />

              <View>
                <View
                  style={[
                    styles.row,
                    {justifyContent: 'space-between', alignItems: 'center'},
                  ]}>
                  <Text style={styles.textLabel}>Hình ảnh</Text>
                  {editable && !newImage && (
                    <Button onPress={() => setNewImage(true)}>
                      Chụp ảnh khác
                    </Button>
                  )}
                </View>
                <View style={styles.imageContainer}>
                  {!editable || !newImage ? (
                    <FastImage
                      source={{uri: data.imageUrl}}
                      style={styles.image}
                    />
                  ) : (
                    <Controller
                      control={control}
                      name={'image'}
                      render={({
                        field: {value, onChange},
                        fieldState: {error},
                      }) => {
                        return (
                          <>
                            <View style={styles.imageContainer}>
                              {value ? (
                                <>
                                  <FastImage
                                    source={{
                                      uri: value.uri,
                                    }}
                                    style={{width: '100%', height: '100%'}}
                                  />
                                  <Button
                                    mode="contained-tonal"
                                    onPress={() => {
                                      resetField('image', undefined);
                                    }}
                                    style={{
                                      position: 'absolute',
                                      bottom: 0,
                                      alignSelf: 'center',
                                    }}>
                                    Chụp lại
                                  </Button>
                                </>
                              ) : (
                                <ScannerView
                                  isReturnPhoto={false}
                                  active={!image}
                                  onTakeImageCallback={(
                                    result: TImagePicker,
                                  ) => {
                                    onChange(result);
                                  }}
                                />
                              )}
                            </View>
                            <Text style={styles.textError}>
                              {error?.message}
                            </Text>
                          </>
                        );
                      }}
                    />
                  )}
                </View>
              </View>
            </ScrollView>

            <BottomContainer>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                {!editable ? (
                  <>
                    <Button mode="outlined" onPress={() => deleteRequest()}>
                      {language.t(languageKeys.shared.button.delete)}
                    </Button>
                    <Button onPress={() => setEditable(true)} mode="contained">
                      {language.t(languageKeys.shared.button.edit)}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onPress={() => {
                        setEditable(false);
                        resetField('value');
                      }}
                      mode="outlined">
                      {language.t(languageKeys.shared.button.cancel)}
                    </Button>
                    <Button
                      mode="contained"
                      onPress={handleSubmit(onSubmit)}
                      disabled={
                        status === 'loading' || uploadStatus === 'loading'
                      }>
                      {language.t(languageKeys.shared.button.save)}
                    </Button>
                  </>
                )}
              </View>
            </BottomContainer>
          </View>
        ) : undefined}
      </>
    </View>
  );
};

export default MonthlyDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  labelContainer: {
    flex: 0.5,
    paddingVertical: 5,
  },
  valueContainer: {
    flex: 1,
    backgroundColor: '#f1f2f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  textLabel: {
    ...globalStyles.text15Medium,
  },
  textError: {
    ...globalStyles.text12Medium,
    color: 'red',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 5,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f1f2f6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
