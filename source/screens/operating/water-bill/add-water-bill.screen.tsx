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
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {WaterStackParamsList} from '@/routes/operating/water.stack';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {AppStackParamsList} from '@/routes/app.stack';
import Button from '@/components/button.component';
import ScannerView from '@/components/scanner-view';
import {PhotoFile} from 'react-native-vision-camera';
import globalStyles from '@/config/globalStyles';
import {Controller, useForm} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import language, {languageKeys} from '@/config/language/language';
import BottomContainer from '@/components/bottom-container.component';
import TextInputSuggestion from '@/components/text-input-suggestion';
import DashedLine from '@/components/dashed-line.component';
type Props = CompositeScreenProps<
  StackScreenProps<WaterStackParamsList, 'ADD_WATER_BILL'>,
  StackScreenProps<AppStackParamsList, 'OPERATING_STACK'>
>;

const AddWaterBillScreen = ({route, navigation}: Props) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        headerShown: false,
      });
    }
  }, [isFocused, navigation]);

  const {image: imageParam, id} = route.params ?? {};

  const [image, setImage] = useState<PhotoFile>();
  const [data, setData] = useState<{id: number}>();

  useEffect(() => {
    setImage(imageParam);
    if (id) {
      setData({...data, id: id});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, imageParam]);

  const onScannedCallback = (result?: string, params?: any) => {
    if (result?.includes('yooioc://water-bill/add')) {
      Linking.openURL(result + `&image=${JSON.stringify(params.image)}`);
    } else {
      Linking.openURL(
        'yooioc://water-bill/add?' + `&image=${JSON.stringify(params.image)}`,
      );
    }
  };

  const {control} = useForm({});

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <View style={styles.imageContainer}>
            <>
              {image ? (
                <>
                  <Image
                    source={{
                      uri: image?.path,
                    }}
                    style={{width: '100%', height: '100%'}}
                  />
                  <Button
                    onPress={() => {
                      setImage(undefined);
                      setData(undefined);
                    }}
                    style={{position: 'absolute'}}>
                    reset
                  </Button>
                </>
              ) : (
                <ScannerView
                  isReturnPhoto={true}
                  onScannedCallback={onScannedCallback}
                  active={!image}
                  hasCaptureButton={true}
                />
              )}
            </>
          </View>
          <View style={styles.formContainer}>
            <View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.water.labelForm.apartment)}
                </Text>
                <Controller
                  control={control}
                  name="apartment"
                  render={({field: {value, onChange}}) => (
                    <TextInputSuggestion
                      containerStyle={{flex: 1}}
                      value={value}
                      onChangeText={onChange}
                      style={[styles.textValue]}
                    />
                  )}
                />
              </View>
              <DashedLine style={{marginVertical: 10}} />
            </View>
            <View>
              <View style={styles.row}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.water.labelForm.previousReading)}
                </Text>
                <CTextInput
                  containerStyle={{flex: 1}}
                  value={'20'}
                  style={[styles.textValue]}
                  editable={false}
                />
              </View>
              <DashedLine style={{marginVertical: 10}} />
            </View>
            <Controller
              name="currentIndex"
              control={control}
              render={({field: {value, onChange}}) => (
                <View>
                  <View style={styles.row}>
                    <Text style={styles.textLabel}>
                      {language.t(languageKeys.water.labelForm.currentReading)}
                    </Text>
                    <CTextInput
                      containerStyle={{flex: 1}}
                      value={value}
                      onChangeText={onChange}
                      style={[styles.textValue]}
                    />
                  </View>
                  <DashedLine style={{marginVertical: 10}} />
                </View>
              )}
            />
            <View style={styles.row}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.water.labelForm.usageCount)}
              </Text>
              <CTextInput
                containerStyle={{flex: 1}}
                value={'20'}
                style={[styles.textValue]}
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
        <BottomContainer>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button mode="outlined">
              {language.t(languageKeys.shared.button.back)}
            </Button>
            <Button mode="contained">
              {language.t(languageKeys.shared.button.save)}
            </Button>
          </View>
        </BottomContainer>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddWaterBillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ababab',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
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
});
