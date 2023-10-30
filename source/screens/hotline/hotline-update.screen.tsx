import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HotlineStackParamsList} from '@/routes/hotline.stack';
import {THotlineProperty} from './services/hotline.model';
import {Controller, FormProvider, useForm, useWatch} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import {useAllOrganizationUnitByUser} from '@/modules/organization/organization.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {useAllUrban} from '@/modules/urban/urban.hook';
import {useListBuilding} from '@/modules/building/building.hook';
import AddHotline from './components/add-hotline.component';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {useCreateOrUpdateHotLine, useDeleteHotline} from './hook/hotline.hook';
import {useAppSelector} from '@/hooks/redux.hook';
import {checkPermission} from '@/utils/utils';
import {Dialog} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';
type Props = StackScreenProps<HotlineStackParamsList, 'UPDATE'>;

const HotlineUpdateScreen = ({navigation, route}: Props) => {
  const hotline = route.params?.hotline;
  const properties: THotlineProperty[] = JSON.parse(
    hotline?.properties ?? '[]',
  );
  const [isVisible, setIsVisible] = useState(false);
  const {listOrganizations} = useAllOrganizationUnitByUser();
  const {urbans} = useAllUrban({});

  const methods = useForm({
    defaultValues: {
      ...hotline,
      properties: properties,
    },
  });

  const urbanId = useWatch({
    control: methods.control,
    name: 'urbanId',
  });

  useEffect(() => {
    // @ts-ignore
    methods.setValue('buildingId', null);
  }, [methods, urbanId]);

  const {buildings} = useListBuilding({urbanId: urbanId});
  const {mutate: createOrUpDate} = useCreateOrUpdateHotLine({
    onSuccessCallback: () => {
      navigation.goBack();
    },
  });
  const {mutate: deleteHotline} = useDeleteHotline({
    onSuccessCallback: () => {
      navigation.goBack();
    },
  });

  const {tenantId} = useAppSelector(state => state.auth);
  const {grantedPermissions} = useAppSelector(state => state.config);
  const onSubmit = (data: any) => {
    createOrUpDate({
      ...data,
      properties: JSON.stringify(data.properties),
      tenantId: tenantId,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{paddingHorizontal: 10}}>
        <Controller
          control={methods.control}
          name="name"
          render={({field: {value, onChange}}) => (
            <View style={styles.inputContainer}>
              <CTextInput
                label="Tên đơn vị"
                value={value}
                onChangeText={onChange}
                withError={false}
                labelStyle={{marginBottom: 0}}
                labelContainerStyle={styles.labelContainer}
                style={styles.input}
              />
            </View>
          )}
        />
        <Controller
          control={methods.control}
          name="urbanId"
          render={({field: {value, onChange}}) => (
            <DropdownMenuComponent
              label="Khu đô thị"
              options={urbans.map(u => ({id: u.id, label: u.displayName}))}
              selectedLabel={urbans.find(u => u.id === value)?.displayName}
              onSelected={(id: any) => onChange(id)}
              style={styles.inputContainer}
              labelContainerStyle={styles.labelContainer}
              inputContainer={styles.input}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="buildingId"
          render={({field: {value, onChange}}) => (
            <DropdownMenuComponent
              label="Tòa nhà"
              options={buildings.map(u => ({id: u.id, label: u.displayName}))}
              selectedLabel={buildings.find(u => u.id === value)?.displayName}
              onSelected={(id: any) => onChange(id)}
              style={styles.inputContainer}
              labelContainerStyle={styles.labelContainer}
              inputContainer={styles.input}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="organizationUnitId"
          render={({field: {value, onChange}}) => (
            <DropdownMenuComponent
              label="Phòng ban"
              options={listOrganizations.map(o => ({
                id: o.organizationUnitId,
                label: o.displayName,
              }))}
              selectedLabel={
                listOrganizations.find(o => o.organizationUnitId === value)
                  ?.displayName
              }
              onSelected={(id: any) => onChange(id)}
              style={styles.inputContainer}
              labelContainerStyle={styles.labelContainer}
              inputContainer={styles.input}
            />
          )}
        />
        <FormProvider {...methods}>
          <AddHotline />
        </FormProvider>
      </ScrollView>
      <BottomContainer>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {checkPermission(grantedPermissions, [
            'Pages.Digitals.Hotline.Delete',
          ]) &&
            hotline && (
              <Button
                onPress={() => {
                  // deleteHotline(hotline.id);
                  setIsVisible(true);
                }}>
                {language.t(languageKeys.shared.button.delete)}
              </Button>
            )}
          <Button onPress={methods.handleSubmit(onSubmit)} mode="contained">
            {language.t(languageKeys.shared.button.save)}
          </Button>
        </View>
      </BottomContainer>
      {hotline && (
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>
            <Text style={[styles.textValue, {flex: 0}]}>Bạn có muốn xóa</Text>
          </Dialog.Title>
          <Dialog.Actions>
            <Button
              mode="contained-tonal"
              style={styles.button}
              onPress={() => setIsVisible(false)}>
              {language.t(languageKeys.shared.button.cancel)}
            </Button>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => {
                deleteHotline(hotline.id);
              }}>
              {language.t(languageKeys.shared.button.delete)}
            </Button>
          </Dialog.Actions>
        </Dialog>
      )}
    </View>
  );
};

export default HotlineUpdateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  labelContainer: {
    width: '33%',
  },
  input: {
    width: '67%',
    backgroundColor: '#f1f2f8',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textLabel: {
    flex: 1,
    ...globalStyles.text16Medium,
  },
  textValue: {
    flex: 1,
    ...globalStyles.text16Bold,
  },
  button: {
    paddingHorizontal: 10,
    marginLeft: 20,
  },
});
