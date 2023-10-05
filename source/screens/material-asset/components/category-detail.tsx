import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeModal from 'react-native-modal';
import {Controller, useForm} from 'react-hook-form';
import {genCode} from '@/utils/utils';
import {ECategoryType} from '@/screens/material-asset/services/material-asset.model';
import CTextInput from '@/components/text-input.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {useMutation, useQueryClient} from 'react-query';
import MaterialCategoryApi from '@/screens/material-asset/services/material-category.service';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
  type: ECategoryType;
  name: string;
};

const CategoryDetail = ({isVisible, onBackdropPress, type, name}: Props) => {
  const {control, reset, handleSubmit} = useForm({
    defaultValues: {
      code: genCode(8, 'MH-'),
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (isVisible) {
      reset({
        code: genCode(8, 'MH-'),
      });
    }
  }, [isVisible, reset]);

  const queryClient = useQueryClient();

  const {mutate: create} = useMutation({
    mutationFn: (params: {code: string; name: string; description: string}) =>
      MaterialCategoryApi.create(params),
    onSuccess: () => {
      queryClient.refetchQueries(['category', type]).then(() => {
        reset();
        onBackdropPress();
      });
    },
  });

  const onSubmit = (data: {
    code: string;
    name: string;
    description: string;
  }) => {
    create(data);
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{margin: 0}}>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          minHeight: '70%',
          marginTop: 'auto',
        }}>
        <View style={{paddingTop: 10, flex: 1}}>
          <Text style={styles.textTitle}>Them {name}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.category.code)}
            </Text>
            <View style={{flex: 1.6}}>
              <Controller
                control={control}
                name="code"
                rules={{
                  required: {
                    value: true,
                    message: language.t(
                      languageKeys.shared.form.requiredMessage,
                    ),
                  },
                }}
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <CTextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.textValue}
                    withError={false}
                    placeholder={error?.message}
                    placeholderTextColor={
                      error?.message ? '#FF6565' : '#ababab'
                    }
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.category.name)}
            </Text>
            <View style={{flex: 1.6}}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: {
                    value: true,
                    message: language.t(
                      languageKeys.shared.form.requiredMessage,
                    ),
                  },
                }}
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <CTextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.textValue}
                    withError={false}
                    placeholder={error?.message}
                    placeholderTextColor={
                      error?.message ? '#FF6565' : '#ababab'
                    }
                  />
                )}
              />
            </View>
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            ]}>
            <Text style={[styles.textLabel, {flex: undefined}]}>
              {language.t(languageKeys.materialAsset.category.description)}
            </Text>
            <Controller
              control={control}
              name="description"
              render={({field: {value, onChange}}) => (
                <CTextInput
                  value={value}
                  onChangeText={onChange}
                  withError={false}
                  multiline
                  style={[styles.textValue, {width: '100%', minHeight: 100}]}
                  containerStyle={{flexDirection: 'row', marginTop: 10}}
                />
              )}
            />
          </View>
        </View>
        <BottomContainer>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <Button mode="outlined" onPress={onBackdropPress}>
              {language.t(languageKeys.shared.button.cancel)}
            </Button>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              {language.t(languageKeys.shared.button.save)}
            </Button>
          </View>
        </BottomContainer>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  textValue: {
    ...globalStyles.text15Medium,
    backgroundColor: '#f1f2f8',
  },
  textLabel: {
    ...globalStyles.text15Bold,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textTitle: {
    ...globalStyles.text17Bold,
    marginLeft: 10,
  },
});
