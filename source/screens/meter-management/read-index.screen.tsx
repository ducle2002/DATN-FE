/* eslint-disable @typescript-eslint/no-shadow */
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MeterStackParamsList} from '@/routes/operating/meter.stack';
import Button from '@/components/button.component';
import ScannerView from '@/components/scanner-view';
import globalStyles from '@/config/globalStyles';
import {Controller, SubmitHandler, useForm, useWatch} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import language, {languageKeys} from '@/config/language/language';
import BottomContainer from '@/components/bottom-container.component';
import DashedLine from '@/components/dashed-line.component';
import {useListBuilding} from '@/modules/building/building.hook';
import {useAllUrban} from '@/modules/urban/urban.hook';
import {TFilter} from './hooks/MeterFilterContext';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {useGetAllMeter} from './hooks/useListMeter';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import MeterMonthlyService from './services/meter-monthly.service';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import UtilsApi from '@/services/utils.service';
import {TImagePicker} from '@/utils/image-picker-handle';
import MeterService from './services/meter.service';
type Props = StackScreenProps<MeterStackParamsList, 'READ_INDEX'>;

const ReadIndexMeterScreen = ({route, navigation}: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [meterId, setMeterId] = useState<number | undefined>();

  useEffect(() => {
    setMeterId(route.params.id);
  }, [route.params.id]);

  const onScannedCallback = (result?: string) => {
    if (result?.includes('yooioc://app/meter')) {
      Linking.openURL(result);
    } else {
    }
  };

  const [filters, setFilters] = useState<TFilter>();
  const {urbans} = useAllUrban({});
  const {buildings} = useListBuilding({urbanId: filters?.urbanId});
  const {meters} = useGetAllMeter({
    ...filters,
    meterTypeId: route.params?.meterTypeId,
  });

  const {data: lastMonthData} = useQuery({
    queryKey: ['last-month', meterId],
    queryFn: () =>
      MeterMonthlyService.getAll({
        meterId: meterId,
        maxResultCount: 1,
        isClosed: true,
      }),
    enabled: !!meterId,
    onSuccess: result => {
      if (result.records[0] && !filters?.urbanId && !filters?.urbanId) {
        prevFilterRef.current = {
          urbanId: result.records[0].urbanId,
          buildingId: result.records[0].buildingId,
        };
        setFilters(old => ({
          ...old,
          urbanId: result.records[0].urbanId,
          buildingId: result.records[0].buildingId,
        }));
      }
    },
  });

  const {data} = useQuery({
    queryKey: ['meter-info', meterId],
    queryFn: () => MeterService.getById({id: meterId ?? -1}),
    enabled: lastMonthData?.totalRecords === 0,
    onSuccess: result => {
      if (result) {
        prevFilterRef.current = {
          buildingId: result.buildingId,
          urbanId: result.urbanId,
        };
        setFilters(old => ({
          ...old,
          urbanId: result.urbanId,
          buildingId: result.buildingId,
        }));
      }
    },
    onError: () => {
      toast.show('Không tìm thấy thông tin', {
        placement: 'center',
      });
    },
  });
  const {control, handleSubmit, resetField, reset} = useForm<{
    value: number;
    image: TImagePicker;
  }>();

  const image = useWatch({control: control, name: 'image'});

  const {mutate: createRequest, status} = useMutation({
    mutationFn: params => MeterMonthlyService.create(params),
    onSuccess: () => {
      toast.show('Thêm chỉ số thành công');
      reset();
      setTimeout(() => {
        setMeterId(undefined);
      }, 200);
      setFilters(old => ({...old, buildingId: undefined, urbanId: undefined}));
      queryClient.refetchQueries(['list-meter-monthly']);
    },
  });

  const {mutate: uploadImageRequest, status: uploadStatus} = useMutation({
    mutationFn: params => {
      return UtilsApi.uploadImagesRequest(params.image ? [params.image] : []);
    },
    onSuccess: (result: any, params: any) => {
      createRequest({...params, imageUrl: result[0]});
    },
  });

  const prevFilterRef = useRef<TFilter>();

  useEffect(() => {
    if (
      prevFilterRef.current?.buildingId !== filters?.buildingId ||
      prevFilterRef.current?.urbanId !== filters?.urbanId
    ) {
      setMeterId(undefined);
    }
    prevFilterRef.current = filters;
  }, [filters]);

  const onSubmit: SubmitHandler<{
    value: number;
    image: TImagePicker;
  }> = data => {
    if (
      lastMonthData?.records &&
      data?.value <= lastMonthData?.records?.[0]?.value
    ) {
      toast.show('Chỉ số đã nhập thấp hơn kỳ trước');
      return;
    }
    uploadImageRequest({
      ...data,
      meterId,
      period: moment().toISOString(),
      firstValue: 0,
      apartmentCode: '',
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <>
            <Controller
              control={control}
              name={'image'}
              rules={{
                required: {value: true, message: 'Chụp ảnh trước khi lưu'},
              }}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <>
                    <View style={styles.imageContainer}>
                      {value ? (
                        <>
                          <Image
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
                          onScannedCallback={onScannedCallback}
                          active={!image}
                          onTakeImageCallback={(result: TImagePicker) => {
                            onChange(result);
                          }}
                          useScanner={!meterId && !image}
                        />
                      )}
                    </View>
                    <Text style={styles.textError}>{error?.message}</Text>
                  </>
                );
              }}
            />
          </>
          <View style={styles.formContainer}>
            <View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.meter.labelForm.urban)}
                </Text>

                <DropdownMenuComponent
                  style={{flex: 1}}
                  inputContainer={styles.textValue}
                  options={urbans.map(u => ({
                    id: u.id,
                    label: u.displayName,
                  }))}
                  onSelected={(urbanId: number) =>
                    setFilters(old => ({
                      ...old,
                      urbanId: urbanId,
                      buildingId: undefined,
                      apartmentCode: undefined,
                    }))
                  }
                  selectedLabel={
                    urbans.find(u => u.id === filters?.urbanId)?.displayName
                  }
                />
              </View>
              <DashedLine style={{marginVertical: 10}} />
            </View>

            <View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.meter.labelForm.building)}
                </Text>

                <DropdownMenuComponent
                  style={{flex: 1}}
                  inputContainer={styles.textValue}
                  options={buildings.map(u => ({
                    id: u.id,
                    label: u.displayName,
                  }))}
                  onSelected={(buildingId: number) =>
                    setFilters(old => ({
                      ...old,
                      buildingId: buildingId,
                      apartmentCode: undefined,
                    }))
                  }
                  selectedLabel={
                    buildings.find(u => u.id === filters?.buildingId)
                      ?.displayName
                  }
                />
              </View>
              <DashedLine style={{marginVertical: 10}} />
            </View>

            <View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.meter.labelForm.meter)}
                </Text>

                <DropdownMenuComponent
                  style={{flex: 1}}
                  inputContainer={styles.textValue}
                  options={meters.map(u => ({
                    id: u?.id,
                    label: u?.name,
                  }))}
                  onSelected={(value: number) => setMeterId(value)}
                  selectedLabel={
                    meters.find(u => u.id === meterId)?.name ?? data?.name
                  }
                />
              </View>
              <DashedLine style={{marginVertical: 10}} />
            </View>

            {!!lastMonthData?.records[0] && (
              <View>
                <View style={styles.row}>
                  <Text style={styles.textLabel}>
                    {language.t(languageKeys.meter.labelForm.previousReading)}
                  </Text>

                  <CTextInput
                    containerStyle={{flex: 1}}
                    style={[styles.textValue]}
                    value={lastMonthData?.records?.[0].value?.toString()}
                    editable={false}
                  />
                </View>
                <DashedLine style={{marginVertical: 10}} />
              </View>
            )}

            <Controller
              name="value"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: language.t(languageKeys.shared.form.requiredMessage),
                },
              }}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View>
                  <View style={styles.row}>
                    <Text style={styles.textLabel}>
                      {language.t(languageKeys.meter.labelForm.currentReading)}
                    </Text>
                    <CTextInput
                      editable={!!meterId}
                      containerStyle={{flex: 1}}
                      //@ts-ignore
                      value={value}
                      //@ts-ignore
                      onChangeText={onChange}
                      style={[styles.textValue]}
                    />
                  </View>
                  {meterId && (
                    <Text style={styles.textError}>{error?.message}</Text>
                  )}
                  <DashedLine style={{marginVertical: 10}} />
                </View>
              )}
            />
          </View>
        </ScrollView>
        <BottomContainer>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              mode="outlined"
              onPress={() => {
                if (meterId) {
                  setMeterId(undefined);
                  setFilters(old => ({
                    ...old,
                    buildingId: undefined,
                    urbanId: undefined,
                  }));
                } else {
                  navigation.goBack();
                }
              }}>
              {language.t(languageKeys.shared.button.back)}
            </Button>
            <Button
              onPress={handleSubmit(onSubmit)}
              mode="contained"
              disabled={status === 'loading' || uploadStatus === 'loading'}>
              {language.t(languageKeys.shared.button.save)}
            </Button>
          </View>
        </BottomContainer>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReadIndexMeterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '90%',
    aspectRatio: 1,
    backgroundColor: '#ababab',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 2,
    alignItems: 'center',
  },
  textLabel: {
    ...globalStyles.text16Bold,
    paddingHorizontal: 5,
    flex: 1,
  },
  textValue: {
    ...globalStyles.text16Medium,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#f1f2f8',
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textError: {
    ...globalStyles.text12Medium,
    color: 'red',
  },
});
