import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import DatePickerComponent from './components/date-picker.component';
import CTextInput from '@/components/text-input.component';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {useMutation, useQueryClient} from 'react-query';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import WorkManagementApi from './services/work-management.service';
import {PersonnelPickerContext, useWorkType} from './services/hook';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import PersonnelPicker from './components/personnel-picker.component';
import {TPersonnel} from './services/work.model';
import {useToast} from 'react-native-toast-notifications';

type Props = StackScreenProps<WorkStackParamsList, 'CREATE_WORK'>;
const CreateWorkScreen = ({navigation, route}: Props) => {
  const [supervisorUsers, setSupervisorUsers] = useState<TPersonnel[]>([]);
  const [recipientUsers, setRecipientUsers] = useState<TPersonnel[]>([]);

  const schema = yup.object({
    dateStart: yup.string(),
    dateExpected: yup.string(),
    title: yup.string().required(),
    content: yup.string(),
    workTypeId: yup.string().required(),
  });

  const {control, handleSubmit} = useForm({
    defaultValues: {
      dateStart: '',
      dateExpected: '',
      title: '',
      content: '',
      workTypeId: '',
    },
    resolver: yupResolver(schema),
  });

  const dateStart = useWatch({
    control: control,
    name: 'dateStart',
  });

  const {workType} = useWorkType();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: (params: any) => WorkManagementApi.create(params),
    onSuccess: () => {
      toast.show('Tạo công việc thành công');
      queryClient.refetchQueries([
        'my-work',
        route.params?.status,
        route.params?.formId,
      ]);
      navigation.goBack();
    },
    onError: error => {
      console.log(error);
    },
  });

  const onSubmit = (data: any) => {
    mutate({
      ...data,
      imageUrls: [],
      workTypeId: parseInt(data.workTypeId, 10),
      supervisorIds: supervisorUsers.map(s => s.id),
      recipientIds: recipientUsers.map(s => s.id),
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <PersonnelPickerContext.Provider
            value={{
              selected: supervisorUsers,
              onSelect: setSupervisorUsers,
            }}>
            <PersonnelPicker
              label={language.t(
                languageKeys.workManagement.work.supervisorUsers,
              )}
              containerStyle={{
                marginBottom: 20,
              }}
            />
          </PersonnelPickerContext.Provider>

          <PersonnelPickerContext.Provider
            value={{
              selected: recipientUsers,
              onSelect: setRecipientUsers,
            }}>
            <PersonnelPicker
              label={language.t(
                languageKeys.workManagement.work.recipientUsers,
              )}
              containerStyle={{
                marginBottom: 20,
              }}
            />
          </PersonnelPickerContext.Provider>

          <Controller
            control={control}
            name="dateStart"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <DatePickerComponent
                value={value ?? ''}
                onChange={onChange}
                label={language.t(languageKeys.workManagement.work.dateStart)}
                labelStyle={styles.labelStyle}
                inputContainerStyle={[
                  styles.inputContainerStyle,
                  {paddingVertical: 0},
                ]}
                containerStyle={{marginBottom: 20}}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dateExpected"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <DatePickerComponent
                value={value ?? ''}
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
                errorMessage={error?.message}
              />
            )}
          />
        </View>
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            name="workTypeId"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <DropdownMenuComponent
                options={
                  workType?.map(type => ({
                    id: type.id,
                    label: type.name,
                  })) ?? []
                }
                onSelected={(id: number) => onChange(id.toString())}
                selectedLabel={
                  workType?.find(t => t.id.toString() === value)?.name
                }
                label={language.t(languageKeys.workManagement.work.workTypeId)}
                inputContainer={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                style={{marginBottom: 20}}
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <CTextInput
                value={value}
                onChangeText={onChange}
                style={styles.inputContainerStyle}
                label={language.t(languageKeys.workManagement.work.title)}
                labelStyle={[styles.labelStyle]}
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="content"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <CTextInput
                value={value}
                onChangeText={onChange}
                style={styles.inputContainerStyle}
                labelStyle={[styles.labelStyle, {marginTop: 10}]}
                label={language.t(languageKeys.workManagement.work.content)}
                errorMessage={error?.message}
              />
            )}
          />
        </View>
      </ScrollView>
      <BottomContainer>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
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
