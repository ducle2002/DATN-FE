import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';
import {TOption} from '@/modules/vote/vote.model';

type Props = React.ComponentProps<typeof CTextInput> & {
  onAddOption?: Function;
  option?: TOption;
  containerStyle?: ViewStyle;
  deleteOption?: Function;
};

const CreateOptionButton = ({
  onAddOption = () => {},
  deleteOption = () => {},
  option,
  containerStyle,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({defaultValues: {option: option?.option}});

  const onSubmit = (data: any) => {
    onAddOption({option: data.option, id: option?.id ?? uuidv4()});
    if (!option?.id) {
      reset();
    }
  };

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <Controller
          control={control}
          name="option"
          rules={{
            required: {
              value: true,
              message: language.t(languageKeys.shared.form.requiredMessage),
            },
          }}
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value}
              onChangeText={onChange}
              containerStyle={{
                flex: 1,
                flexDirection: 'row',
              }}
              style={{
                backgroundColor: 'transparent',
              }}
              onSubmitEditing={handleSubmit(onSubmit)}
              onBlur={handleSubmit(onSubmit)}
            />
          )}
        />
        {!option ? (
          <Button onPress={handleSubmit(onSubmit)}>
            {language.t(languageKeys.vote.create.add)}
          </Button>
        ) : (
          <Button onPress={() => deleteOption(option)}>
            {language.t(languageKeys.vote.create.delete)}
          </Button>
        )}
      </View>
      <Text style={styles.textError}>{errors?.option?.message}</Text>
    </>
  );
};

export default CreateOptionButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textError: {
    ...globalStyles.text12Medium,
    color: 'red',
    marginTop: 2,
    marginBottom: 5,
  },
});
