import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import {useAllUrban} from '@/modules/urban/urban.hook';
import {useListBuilding} from '@/modules/building/building.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {Switch} from 'react-native-paper';
import {v4 as uuidv4} from 'uuid';
import 'react-native-get-random-values';

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

  const {mutate: createOrUpdate, status} = useMutation({
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
  const [destination, setDestination] = useState<{
    urbanId?: number;
    buildingId?: number;
  }>({
    buildingId: undefined,
    urbanId: undefined,
  });

  const onToggleOther = () => {
    setOptions(old => {
      const index = old.findIndex(option => option.isOptionOther);
      if (index === -1) {
        return [...old, {option: 'Khác', id: uuidv4(), isOptionOther: true}];
      }
      return old.filter(option => !option.isOptionOther);
    });
  };

  const urbans =
    useAllUrban({
      onSuccessCallback: () => {
        setDestination({
          ...destination,
          buildingId: undefined,
        });
      },
    }).data?.urbans ?? [];

  const buildings =
    useListBuilding({
      urbanId: destination?.urbanId,
      onSuccessCallback: () => {
        setDestination({
          ...destination,
        });
      },
    }).data?.buildings ?? [];

  const onSubmit = (data: any) => {
    if (!moment(data.startTime).isBefore(moment(data.finishTime))) {
      toast.show('Thời gian đã chọn không hợp lệ');
      return;
    }

    if (options.length > 0) {
      createOrUpdate({
        ...vote,
        ...data,
        voteOptions: options,
        options: JSON.stringify(options),
        organizationUnitId: listOrganizations[0]?.organizationUnitId,
        finishTime: moment(data.finishTime).toISOString(),
        startTime: moment(data.startTime).toISOString(),
      });
    } else {
      toast.show(language.t(languageKeys.vote.toastNoti.optionRequired));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : undefined}
      style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 5}}>
        <View style={{marginBottom: 10}}>
          <DropdownMenuComponent
            options={urbans.map(urban => ({
              id: urban.id,
              label: urban.displayName,
            }))}
            label={language.t(languageKeys.digitalNoti.create.selectUrban)}
            selectedLabel={
              urbans.find(u => u.id === destination?.urbanId)?.displayName ?? ''
            }
            onSelected={(id: number) =>
              setDestination({...destination, urbanId: id})
            }
            labelStyle={styles.textLabel}
            inputContainer={styles.textInput}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <DropdownMenuComponent
            options={buildings.map(building => ({
              id: building.id,
              label: building.displayName,
            }))}
            label={language.t(languageKeys.digitalNoti.create.building)}
            selectedLabel={
              buildings.find(u => u.id === destination?.buildingId)
                ?.displayName ?? ''
            }
            onSelected={(id: number) =>
              setDestination({
                ...destination,
                buildingId: id,
              })
            }
            labelStyle={styles.textLabel}
            inputContainer={styles.textInput}
          />
        </View>

        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value}
              onChangeText={onChange}
              label={language.t(languageKeys.vote.create.name)}
              style={styles.textInput}
              labelStyle={styles.textLabel}
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
              labelStyle={styles.textLabel}
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
                />
              )}
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.vote.create.options)}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Switch
                onChange={onToggleOther}
                value={options.findIndex(o => o.isOptionOther) >= 0}
                style={{marginRight: 5}}
              />
              <Text style={{...globalStyles.text13Medium, color: 'black'}}>
                Khác
              </Text>
            </View>
          </View>
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
      <BottomButton
        onPress={handleSubmit(onSubmit)}
        disabled={status === 'loading'}>
        {language.t(languageKeys.vote.create[vote ? 'update' : 'create'])}
      </BottomButton>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 5,
  },
  optionItem: {
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
