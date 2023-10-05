import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import DatePickerComponent from './components/date-picker.component';
import CTextInput from '@/components/text-input.component';
import TextInputSuggestion from '@/components/text-input-suggestion';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {useQuery} from 'react-query';
import WorkTypeApi from './services/work-type.service';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';

type Props = StackScreenProps<WorkStackParamsList, 'CREATE_WORK'>;

const CreateWorkScreen = ({navigation}: Props) => {
  const {control} = useForm({
    defaultValues: {
      dateStart: '',
      dateExpected: '',
      title: '',
      content: '',
      workTypeId: '',
    },
  });

  const dateStart = useWatch({
    control: control,
    name: 'dateStart',
  });

  const {data} = useQuery({
    queryKey: ['work-type'],
    queryFn: () => WorkTypeApi.getAllNotPaging(),
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <DropdownMenuComponent
            label="Dự án"
            inputContainer={styles.inputContainerStyle}
            labelStyle={styles.labelStyle}
            style={{marginBottom: 20}}
          />
          <DropdownMenuComponent
            label="Phòng ban"
            inputContainer={styles.inputContainerStyle}
            labelStyle={styles.labelStyle}
            style={{marginBottom: 20}}
          />

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
            name="dateExpected"
            render={({field: {value, onChange}}) => (
              <DatePickerComponent
                value={value}
                onChange={onChange}
                label={language.t(
                  languageKeys.workManagement.work.dateExpected,
                )}
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
        </View>
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            name="workTypeId"
            render={({field: {value, onChange}}) => (
              <DropdownMenuComponent
                options={
                  data?.workType.map(type => ({
                    id: type.id,
                    label: type.name,
                  })) ?? []
                }
                onSelected={(id: number) => onChange(id.toString())}
                selectedLabel={
                  data?.workType.find(t => t.id.toString() === value)?.name
                }
                label={language.t(languageKeys.workManagement.work.workTypeId)}
                inputContainer={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                style={{marginBottom: 20}}
              />
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({field: {value, onChange}}) => (
              <CTextInput
                value={value}
                onChangeText={onChange}
                style={styles.inputContainerStyle}
                label={language.t(languageKeys.workManagement.work.title)}
                labelStyle={styles.labelStyle}
                withError={false}
                containerStyle={{marginBottom: 20}}
              />
            )}
          />
          <Controller
            control={control}
            name="content"
            render={({field: {value, onChange}}) => (
              <CTextInput
                value={value}
                onChangeText={onChange}
                style={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                label={language.t(languageKeys.workManagement.work.content)}
                containerStyle={{marginBottom: 20}}
                withError={false}
              />
            )}
          />

          <View>
            <TextInputSuggestion
              style={styles.inputContainerStyle}
              label={language.t(
                languageKeys.workManagement.work.recipientUsers,
              )}
              withError={false}
              containerStyle={{marginBottom: 20}}
              labelStyle={styles.labelStyle}
            />
          </View>
        </View>
      </ScrollView>
      <BottomContainer>
        <Button mode="contained">Save</Button>
      </BottomContainer>
    </View>
  );
};

export default CreateWorkScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
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
