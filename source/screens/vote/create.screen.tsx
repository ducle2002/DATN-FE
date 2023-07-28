import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import BottomButton from '@/components/bottom-button.component';
import CTextInput from '@/components/text-input.component';
import {Controller, useForm} from 'react-hook-form';
import {StackScreenProps} from '@react-navigation/stack';
import {VoteStackParamsList} from '@/routes/vote.stack';
import CreateOptionButton from './components/create-option-button';
import {TOption} from '@/modules/vote/vote.model';
import {useMutation, useQueryClient} from 'react-query';
import VoteApi from '@/modules/vote/vote.service';
import {useAppSelector} from '@/hooks/redux.hook';
import moment from 'moment';
import TimePicker from './components/time-picker.component';
import globalStyles from '@/config/globalStyles';
import {useToast} from 'react-native-toast-notifications';
import language, {languageKeys} from '@/config/language/language';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type Props = StackScreenProps<VoteStackParamsList, 'CREATE_SCREEN'>;
const voteSchema = yup.object({
  name: yup
    .string()
    .required(language.t(languageKeys.shared.form.requiredMessage)),
  description: yup.string(),
  startTime: yup.string(),
  finishTime: yup.string(),
});

const CreateScreen = ({navigation, route}: Props) => {
  const toast = useToast();
  const vote = route.params?.vote;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: language.t(languageKeys.vote.header[vote ? 'update' : 'create']),
    });
  }, [navigation, vote]);

  const {listOrganizations} = useAppSelector(state => state.organizationUnit);
  const queryClient = useQueryClient();

  const {mutate: createOrUpdate} = useMutation({
    mutationFn: params => VoteApi.createOrUpdateRequest(params),
    onSuccess: () => {
      toast.show(
        language.t(
          languageKeys.vote.toastNoti[vote ? 'updateSuccess' : 'createSuccess'],
        ),
      );
      queryClient.refetchQueries(['list-vote']);
      navigation.navigate('MAIN_PAGE');
    },
    onError: () => {
      toast.show(
        language.t(
          languageKeys.vote.toastNoti[vote ? 'updateFail' : 'createFail'],
        ),
      );
    },
  });

  const [options, setOptions] = useState<Array<TOption>>(
    vote?.voteOptions ?? [],
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      name: vote?.name,
      description: vote?.description,
      startTime: moment(vote?.startTime).toISOString(),
      finishTime: moment(vote?.finishTime).toISOString(),
    },
    resolver: yupResolver(voteSchema),
  });

  const startTime = watch('startTime');

  const addOptionHandle = (option: TOption) => {
    const index = options.findIndex(o => o.id === option.id);
    let l = options;
    if (index === -1) {
      setOptions([...options, option]);
    } else {
      l.splice(index, 1, option);
      setOptions(l);
    }
  };

  const deleteOptionHandle = (option: TOption) => {
    setOptions(options.filter(o => o.id !== option.id));
  };

  const onSubmit = (data: any) => {
    if (options.length > 0) {
      createOrUpdate({
        ...vote,
        ...data,
        voteOptions: options,
        options: JSON.stringify(options),
        organizationUnitId: listOrganizations[0].organizationUnitId,
        finishTime:
          moment(data.finishTime).format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z',
        startTime:
          moment(data.startTime).format('YYYY-MM-DDTHH:mm:ss.sss') + 'Z',
      });
    } else {
      toast.show(language.t(languageKeys.vote.toastNoti.optionRequired));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 5}}>
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value}
              onChangeText={onChange}
              label={language.t(languageKeys.vote.create.name)}
              style={styles.textInput}
              labelSyle={styles.textLabel}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value}
              onChangeText={onChange}
              label={language.t(languageKeys.vote.create.description)}
              labelSyle={styles.textLabel}
              multiline
              style={{
                ...styles.textInput,
                height: 120,
                textAlignVertical: 'top',
              }}
            />
          )}
        />
        <View>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.vote.create.time)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Controller
              control={control}
              name="startTime"
              render={({field: {value, onChange}}) => (
                <TimePicker
                  date={moment(value ? value : undefined).toDate()}
                  onConfirm={date => onChange(date.toISOString())}
                  textContainerStyle={styles.textInput}
                  minimumDate={moment().toDate()}
                />
              )}
            />
            <Text style={{...styles.textLabel, marginTop: 0}}>
              {language.t(languageKeys.vote.create.to)}
            </Text>

            <Controller
              control={control}
              name="finishTime"
              render={({field: {value, onChange}}) => (
                <TimePicker
                  date={moment(value ? value : undefined).toDate()}
                  onConfirm={date => onChange(date.toISOString())}
                  textContainerStyle={styles.textInput}
                  minimumDate={moment(startTime).toDate()}
                  // label="Ketthuc"
                />
              )}
            />
          </View>
        </View>
        <View>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.vote.create.options)}
          </Text>
          {options.map(o => (
            <CreateOptionButton
              deleteOption={deleteOptionHandle}
              onAddOption={(option: TOption) => addOptionHandle(option)}
              containerStyle={styles.textInput}
              option={o}
              key={o.id}
            />
          ))}
          <CreateOptionButton
            onAddOption={(option: TOption) => addOptionHandle(option)}
            containerStyle={styles.textInput}
          />
        </View>
      </ScrollView>
      <BottomButton onPress={handleSubmit(onSubmit)}>
        {language.t(languageKeys.vote.create[vote ? 'update' : 'create'])}
      </BottomButton>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  optionItem: {
    // marginBottom: 10,
    backgroundColor: 'red',
  },
  textLabel: {
    ...globalStyles.text15Bold,
    marginTop: 20,
    marginBottom: 10,
    color: '#5D81DC',
  },
  textInput: {backgroundColor: '#C3D1FF', borderRadius: 20},
});
