import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '@/components/icon.component';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {schemaLogTime} from './services/work.hook';
import {yupResolver} from '@hookform/resolvers/yup';
import DatePickerComponent from './components/date-picker.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import CTextInput from '@/components/text-input.component';
import {Button} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import {TWorkLogTime} from './services/logtime.model';
import CheckoutWork from './components/checkout-work.component';
import ScannerView from '@/components/scanner-view';
import {PhotoFile} from 'react-native-vision-camera';

type Props = StackScreenProps<WorkStackParamsList, 'CREATE_LOG_TIME'>;
const CreateLogTimeScreen = ({route, navigation}: Props) => {
  const [image, setImage] = useState<PhotoFile>();
  const {control, handleSubmit, watch, setValue} = useForm({
    mode: 'onChange',
    resolver: schemaLogTime ? yupResolver(schemaLogTime) : undefined,
    defaultValues: {
      workId: route.params.workId,
      workDetailId: route.params.detailWork.id,
      dateStart: '',
      dateFinish: '',
      userId: 0,
      note: null,
      imageUrls: [],
    },
  });
  const dateStart = useWatch({
    control: control,
    name: 'dateStart',
  });
  const onSubmit = (data: TWorkLogTime) => {
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}>
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
        </View>
        <View
          style={{
            paddingHorizontal: '2%',
            paddingTop: '2%',
          }}>
          <Controller
            control={control}
            name="dateStart"
            render={({field: {value, onChange}}) => (
              <DatePickerComponent
                value={value}
                onChange={onChange}
                label={language.t(languageKeys.workManagement.work.dateStart)}
                labelStyle={styles.labelStyle}
                inputContainerStyle={[
                  styles.inputContainerStyle,
                  {paddingVertical: 0},
                ]}
                containerStyle={{marginBottom: 20}}
              />
            )}
          />
          <Controller
            control={control}
            name="dateFinish"
            render={({field: {value, onChange}}) => (
              <DatePickerComponent
                value={value}
                onChange={onChange}
                label={language.t(languageKeys.workManagement.work.dateFinish)}
                minimumDate={dateStart}
                labelStyle={styles.labelStyle}
                inputContainerStyle={[
                  styles.inputContainerStyle,
                  {paddingVertical: 0},
                ]}
                containerStyle={{marginBottom: 20}}
              />
            )}
          />
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
      </ScrollView>

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

export default CreateLogTimeScreen;

const styles = StyleSheet.create({
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
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ababab',
    alignSelf: 'center',
  },
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
});
