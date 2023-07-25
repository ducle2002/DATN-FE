import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {Controller, useForm} from 'react-hook-form';
import {RichEditor} from 'react-native-pell-rich-editor';
import Button from '@/components/button.component';
import {useAppSelector} from '@/hooks/redux.hook';
import DropdownMenu from '@/components/dropdown-menu.component';
import {TOrganizationUnit} from '@/modules/organization/organization.model';
import CTextInput from '@/components/text-input.component';
import PRadioButtonGroup, {
  TRadioItem,
} from '@/components/radio-button-group.component';
import globalStyles from '@/config/globalStyles';

type Props = StackScreenProps<NotificationStackParamsList, 'CREATE_SCREEN'>;

const CreateNotificationScreen = ({navigation, route}: Props) => {
  const noti = route.params?.noti;

  const {control, handleSubmit} = useForm({
    defaultValues: {
      data: noti?.data ?? '',
      name: noti?.name ?? '',
    },
  });

  const editorRef = useRef(null);

  const onSubmit = (data: {data: string}) => {
    console.log(data);
  };

  const {listOrganizations} = useAppSelector(state => state.organizationUnit);
  const {tenantId} = useAppSelector(state => state.auth);

  const listOption: Array<TRadioItem> = [
    {value: true, label: 'co'},
    {value: false, label: 'khong'},
  ];

  const [seletedOrganization, setSeletedOrganization] = useState<
    TOrganizationUnit | undefined
  >(listOrganizations[0]);

  const [allowComment, setAllowComment] = useState<boolean>(false);

  const onSelected = (id: number) => {
    setSeletedOrganization(
      listOrganizations[
        listOrganizations.findIndex(o => o.organizationUnitId === id)
      ],
    );
  };

  return (
    <View style={styles.container}>
      <DropdownMenu
        onSelected={onSelected}
        options={[
          ...listOrganizations.map(o => ({
            label: o.displayName,
            id: o.organizationUnitId,
          })),
        ]}
        label="Phong ban"
        placeholder="chonphongban"
        selectedLabel={seletedOrganization?.displayName}
        labelStyle={styles.textLabel}
        itemLabelStyle={styles.textValue}
        inputContainer={styles.dataInput}
      />

      <PRadioButtonGroup
        onSelection={(value: boolean) => {
          setAllowComment(value);
        }}
        listOptions={listOption}
        seletedOption={listOption[allowComment ? 0 : 1]}
        label="Chophepbinhluan"
        labelStyle={styles.textLabel}
        style={[styles.sectionContainer]}
        contentContainer={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      />

      <View style={styles.sectionContainer}>
        <Text style={styles.textLabel}>Tieude</Text>
        <Controller
          control={control}
          name="name"
          render={({field: {value, onChange}}) => (
            <CTextInput value={value} onChangeText={onChange} />
          )}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.textLabel}>Noidung</Text>
        <Controller
          control={control}
          name="data"
          render={({field: {value, onChange}}) => (
            <View
              style={{height: 200, backgroundColor: 'white', borderRadius: 10}}>
              <RichEditor
                androidLayerType="software"
                ref={editorRef}
                initialContentHTML={value}
                containerStyle={styles.dataInput}
                onChange={onChange}
              />
            </View>
          )}
        />
      </View>

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
};

export default CreateNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  sectionContainer: {
    marginTop: 20,
  },
  dataInput: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textLabel: {
    ...globalStyles.text15Bold,
    marginBottom: 5,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
});
