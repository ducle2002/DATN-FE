import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller, useFieldArray, useFormContext} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import globalStyles from '@/config/globalStyles';
import Icon from '@/components/icon.component';
import {useTheme} from 'react-native-paper';
import language, {languageKeys} from '@/config/language/language';
import Button from '@/components/button.component';

const AddHotline = () => {
  const {control} = useFormContext();
  const {append, fields, remove} = useFieldArray({
    control: control,
    name: 'properties',
  });

  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.textTitle}>Hotline</Text>
      </View>
      {fields.map((field, index) => {
        return (
          <View key={field.id} style={styles.inputGroup}>
            <Icon
              type="Ionicons"
              name="remove"
              style={{
                position: 'absolute',
                backgroundColor: colors.primaryContainer,
                borderRadius: 100,
                top: -10,
                right: 0,
              }}
              onPress={() => remove(index)}
            />
            <Controller
              control={control}
              name={`properties[${index}].name`}
              render={({field: {value, onChange}}) => (
                <View style={styles.inputContainer}>
                  <CTextInput
                    value={value}
                    label="Tên"
                    style={styles.input}
                    withError={false}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name={`properties[${index}].phone`}
              render={({field: {value, onChange}}) => (
                <View style={styles.inputContainer}>
                  <CTextInput
                    value={value}
                    label="Số điện thoại"
                    style={styles.input}
                    withError={false}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
            <Controller
              control={control}
              name={`properties[${index}].note`}
              render={({field: {value, onChange}}) => (
                <View style={styles.inputContainer}>
                  <CTextInput
                    value={value}
                    label="Ghi chú"
                    style={styles.input}
                    withError={false}
                    onChangeText={onChange}
                  />
                </View>
              )}
            />
          </View>
        );
      })}
      <Button
        onPress={() =>
          append({
            name: '',
            note: '',
            phone: '',
          })
        }>
        {language.t(languageKeys.shared.button.add)}
      </Button>
    </View>
  );
};

export default AddHotline;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  inputGroup: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f1f2f8',
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputContainer: {
    width: '50%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#f1f2f8',
  },
  textTitle: {
    ...globalStyles.text15Bold,
  },
});
