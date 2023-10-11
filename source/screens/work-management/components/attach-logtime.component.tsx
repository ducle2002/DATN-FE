import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {TWorkDetail} from '../services/work.model';
import {Button} from 'react-native-paper';
import {schemaAttachLogTime} from '../services/work.hook';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {TWorkAttachLogTime} from '../services/logtime.model';
import ScannerView from '@/components/scanner-view';
import CTextInput from '@/components/text-input.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
type Props = {
  workDetail?: TWorkDetail;
  workId?: number;
};
const AttachLogTimeComponent = ({workDetail, workId}: Props) => {
  const {control, handleSubmit, watch, setValue} = useForm({
    mode: 'onChange',
    resolver: schemaAttachLogTime
      ? yupResolver(schemaAttachLogTime)
      : undefined,
    defaultValues: {
      note: null,
      imageUrls: [],
    },
  });
  const onSubmit = (data: TWorkAttachLogTime) => {
    console.log(data);
  };
  const onScannedCallback = (result?: string, params?: any) => {
    // console.log(result, params);
    setValue('imageUrls', [params.image]);
    // if (result?.includes('yooioc://working-log-time/add')) {
    //   Linking.openURL(result + `&image=${JSON.stringify(params.image)}`);
    // } else {
    //   Linking.openURL(
    //     'yooioc://working-log-time/add?' +
    //       `&image=${JSON.stringify(params.image)}`,
    //   );
    // }
  };
  return (
    <View>
      <View>
        <View style={styles.imageContainer}>
          <>
            {!!watch('imageUrls') && watch('imageUrls').length > 0 ? (
              <>
                <Image
                  source={{
                    uri: `file://${watch('imageUrls')[0]?.path}`,
                  }}
                  style={{width: '100%', height: '100%'}}
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
                containerStyle={{marginBottom: 20}}
                withError={false}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.containerBtnSave}>
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained-tonal"
          style={{
            borderRadius: 8,
          }}>
          Lưu
        </Button>
      </View>
    </View>
  );
};

export default AttachLogTimeComponent;

const styles = StyleSheet.create({
  containerBtnSave: {
    paddingHorizontal: '2%',
    paddingVertical: '8%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e9ecef',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ababab',
    alignSelf: 'center',
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderBottomColor: '#99C8F0',
    borderBottomWidth: 1,
  },
  labelStyle: {
    ...globalStyles.text16Bold,
  },
});
