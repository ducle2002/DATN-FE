import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {TWorkDetail} from '../services/work.model';
import {Button} from 'react-native-paper';
import {schemaAttachLogTime} from '../services/work.hook';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {TWorkAttachLogTime, TWorkLogTime} from '../services/logtime.model';
import ScannerView from '@/components/scanner-view';
import CTextInput from '@/components/text-input.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import {useMutation} from 'react-query';
import LogTimeApi from '../services/logtime.service';
import {useToast} from 'react-native-toast-notifications';
import LoadingComponent from '@/components/loading';
type Props = {
  workDetail?: TWorkDetail;
  workId?: number;
  logTimeInfo?: TWorkLogTime;
  turnWorkId?: number;
  onClose: Function;
};
const AttachLogTimeComponent = ({
  workDetail,
  workId,
  logTimeInfo,
  turnWorkId,
  onClose,
}: Props) => {
  const toast = useToast();
  const {control, handleSubmit, watch, setValue, reset} = useForm({
    mode: 'onChange',
    resolver: schemaAttachLogTime
      ? yupResolver(schemaAttachLogTime)
      : undefined,
    defaultValues: {
      note: null,
      imageUrls: [],
    },
  });
  const {mutate: createOrUpdateLogTime, isLoading} = useMutation({
    mutationKey: ['createOrUpdateLogTime'],
    mutationFn: (data: TWorkLogTime) =>
      logTimeInfo ? LogTimeApi.update(data) : LogTimeApi.create(data),
    onSuccess() {
      toast.show('Công việc hoàn thành và thêm minh chứng thành công', {
        type: 'success',
        placement: 'top',
        duration: 1000,
        animationType: 'slide-in',
      });
      onClose();
      reset();
    },
    onError() {
      toast.show('Công việc hoàn thành và thêm minh chứng thất bại', {
        type: 'danger',
        placement: 'top',
        duration: 1000,
        animationType: 'slide-in',
      });
      onClose();
    },
  });
  const onSubmit = (data: TWorkAttachLogTime) => {
    Keyboard.dismiss();
    if (workId && workDetail && turnWorkId) {
      createOrUpdateLogTime({
        id: logTimeInfo?.id,
        workId: workId,
        workDetailId: workDetail.id,
        dateStart: new Date().toISOString(),
        status: logTimeInfo?.status,
        note: data.note,
        imageUrls: data.imageUrls,
        workTurnId: turnWorkId,
      });
    }
  };
  const onScannedCallback = async (result?: string, params?: any) => {
    const img: any = await fetch(params.image.path);
    if (img && params?.image) {
      setValue('imageUrls', [
        {
          name: img?._bodyBlob?._data.name,
          width: params.image.width,
          height: params.image.height,
          type: img?._bodyBlob?._data.type,
          size: img?._bodyBlob?._data.size,
          uri: params.image.path,
          source: params.image.path,
        },
      ]);
    }

    // if (result?.includes('yooioc://working-log-time/add')) {
    //   Linking.openURL(result + `&image=${JSON.stringify(params.image)}`);
    // } else {
    //   Linking.openURL(
    //     'yooioc://working-log-time/add?' +
    //       `&image=${JSON.stringify(params.image)}`,
    //   );
    // }
  };
  useEffect(() => {}, []);
  return (
    <Pressable>
      <Text style={styles.txtHeader}>Gửi minh chứng</Text>
      <View style={styles.imageContainer}>
        <>
          {!!watch('imageUrls') && watch('imageUrls').length > 0 ? (
            <>
              <Image
                source={{
                  uri: `${watch('imageUrls')[0]?.uri}`,
                }}
                style={{width: '100%', height: '100%', borderRadius: 5}}
                borderRadius={5}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  paddingVertical: '5%',
                }}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setValue('imageUrls', []);
                  }}>
                  chụp lại hình ảnh
                </Button>
              </View>
            </>
          ) : (
            <ScannerView
              isReturnPhoto={true}
              onScannedCallback={onScannedCallback}
              active={watch('imageUrls').length <= 0}
              hasCaptureButton={true}
            />
          )}
        </>
      </View>
      <View>
        <Controller
          control={control}
          name="note"
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value === null ? undefined : value}
              onChangeText={onChange}
              style={styles.inputContainerStyle}
              labelStyle={styles.labelStyle}
              label={language.t(languageKeys.workManagement.work.note)}
              containerStyle={{
                marginBottom: 20,
                height: 100,
                paddingHorizontal: 10,
              }}
              withError={false}
              multiline
            />
          )}
        />
      </View>

      <View style={styles.containerBtnSave}>
        <Button
          disabled={!turnWorkId && !workDetail && !workId}
          onPress={handleSubmit(onSubmit)}
          mode="contained-tonal"
          buttonColor="#0077b6"
          labelStyle={{...globalStyles.text15SemiBold, color: 'white'}}
          style={{
            borderRadius: 8,
          }}>
          Lưu
        </Button>
      </View>
      {isLoading && <LoadingComponent />}
    </Pressable>
  );
};

export default AttachLogTimeComponent;

const styles = StyleSheet.create({
  containerBtnSave: {
    paddingHorizontal: '2%',
    paddingBottom: '8%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#ababab',
    alignSelf: 'center',
    borderRadius: 5,
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#99C8F0',
    borderWidth: 1,
    justifyContent: 'center',
  },
  labelStyle: {
    ...globalStyles.text15Medium,
    color: '#0077b6',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  txtHeader: {
    ...globalStyles.text16Bold,
    color: '#0077b6',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
