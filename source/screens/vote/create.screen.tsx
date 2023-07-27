import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import BottomButton from '@/components/bottom-button.component';
import CTextInput from '@/components/text-input.component';
import {Controller, useForm} from 'react-hook-form';
import {StackScreenProps} from '@react-navigation/stack';
import {VoteStackParamsList} from '@/routes/vote.stack';
import CreateOptionButton from './components/create-option-button';
import {TOption} from '@/modules/vote/vote.model';
import {useMutation} from 'react-query';
import VoteApi from '@/modules/vote/vote.service';
import {useAppSelector} from '@/hooks/redux.hook';
import moment from 'moment';
import DateTimePicker from '@/components/datetime-picker';
import TimePicker from './components/time-picker.component';
import globalStyles from '@/config/globalStyles';

type Props = StackScreenProps<VoteStackParamsList, 'CREATE_SCREEN'>;

const CreateScreen = ({navigation, route}: Props) => {
  const vote = route.params?.vote;

  const {listOrganizations} = useAppSelector(state => state.organizationUnit);

  const {mutate: createOrUpdate} = useMutation({
    mutationFn: params => VoteApi.createOrUpdateRequest(params),
  });

  const [options, setOptions] = useState<Array<TOption>>([]);

  const {control, handleSubmit} = useForm({
    defaultValues: {
      name: vote?.name,
      description: vote?.description,
      startTime: moment(vote?.startTime).toISOString(),
      finishTime: moment(vote?.finishTime).toISOString(),
    },
  });

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
    createOrUpdate({
      ...data,
      voteOptions: options,
      options: JSON.stringify(options),
      organizationUnitId: listOrganizations[0].organizationUnitId,
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingHorizontal: 10, paddingTop: 5}}>
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <CTextInput value={value} onChangeText={onChange} label="name" />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value}
              onChangeText={onChange}
              label="description"
              multiline
              style={{height: 120, textAlignVertical: 'top'}}
            />
          )}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Controller
            control={control}
            name="startTime"
            render={({field: {value, onChange}}) => (
              <TimePicker
                date={moment(value ? value : undefined).toDate()}
                onConfirm={date => onChange(date.toISOString())}
                label="Batdau"
              />
            )}
          />

          <Controller
            control={control}
            name="finishTime"
            render={({field: {value, onChange}}) => (
              <TimePicker
                date={moment(value ? value : undefined).toDate()}
                onConfirm={date => onChange(date.toISOString())}
                label="Ketthuc"
              />
            )}
          />
        </View>
        <View>
          <Text style={styles.textLabel}>Options</Text>
          {options.map(o => (
            <CreateOptionButton
              deleteOption={deleteOptionHandle}
              containerStyle={styles.optionItem}
              option={o}
              key={o.id}
            />
          ))}
          <CreateOptionButton
            onAddOption={(option: TOption) => addOptionHandle(option)}
          />
        </View>
      </ScrollView>
      <BottomButton onPress={handleSubmit(onSubmit)}>tao vote</BottomButton>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  optionItem: {
    // marginBottom: 10,
  },
  textLabel: {
    ...globalStyles.text15Medium,
    marginTop: 20,
    marginBottom: 10,
  },
});
