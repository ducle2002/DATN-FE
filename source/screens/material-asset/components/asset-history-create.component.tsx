import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Button from '@/components/button.component';
import BottomContainer from '@/components/bottom-container.component';
import language, {languageKeys} from '@/config/language/language';
import {Controller, SubmitHandler, useForm, useWatch} from 'react-hook-form';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {
  useAllAccountOnDepartment,
  useAllDepartment,
} from '@/modules/department/department.hook';
import {useMutation, useQueryClient} from 'react-query';
import MaintenanceHistoryService from '../services/maintenance-history.service';
import {useAppSelector} from '@/hooks/redux.hook';
import DatePickerComponent from '@/screens/work-management/components/date-picker.component';
import globalStyles from '@/config/globalStyles';
type Props = {assetId: number};

const AssetHistoryCreate = ({assetId}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const {control, resetField, handleSubmit, reset} = useForm({
    defaultValues: {
      boPhanTheoDoiId: undefined,
      nguoiKiemTraId: undefined,
      ngayCheckList: '',
      ngayKiemTra: '',
    },
  });
  const departmentId = useWatch({
    control: control,
    name: 'boPhanTheoDoiId',
  });

  useEffect(() => {
    resetField('nguoiKiemTraId');
  }, [departmentId, resetField]);

  const departments = useAllDepartment();
  const {accounts} = useAllAccountOnDepartment({id: departmentId});

  const queryClient = useQueryClient();
  const {mutate: create} = useMutation({
    mutationFn: (params: any) => MaintenanceHistoryService.create(params),
    onSuccess: () => {
      reset();
      queryClient.refetchQueries(['asset-history', assetId]);
      setIsVisible(false);
    },
  });

  const {tenantId} = useAppSelector(state => state.auth);
  const onSubmit: SubmitHandler<{
    boPhanTheoDoiId: undefined;
    nguoiKiemTraId: undefined;
    ngayCheckList: string;
    ngayKiemTra: string;
  }> = data => {
    create({
      ...data,
      tenantId: tenantId,
      taiSanId: assetId,
      boPhanTheoDoi: departments?.find(d => d.id === data.boPhanTheoDoiId)
        ?.displayName,
    });
  };

  return (
    <>
      <Button onPress={() => setIsVisible(true)} mode="contained">
        Ghi nhật ký
      </Button>
      <ReactNativeModal
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        style={{margin: 0}}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
            <Controller
              control={control}
              name="boPhanTheoDoiId"
              rules={{
                required: {
                  value: true,
                  message: language.t(languageKeys.shared.form.requiredMessage),
                },
              }}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View style={{marginBottom: 15}}>
                  <DropdownMenuComponent
                    label="Bộ phận theo dõi*"
                    options={
                      departments?.map(d => ({
                        id: d.id,
                        label: d.displayName,
                      })) ?? []
                    }
                    onSelected={(id: any) => onChange(id)}
                    selectedLabel={
                      departments?.find(d => d.id === value)?.displayName
                    }
                    style={styles.dropdownContainer}
                    inputContainer={styles.dropdownInputContainer}
                    labelContainerStyle={styles.dropdownLabelContainer}
                  />
                  <Text style={styles.textError}>{error?.message}</Text>
                </View>
              )}
            />
            <Controller
              control={control}
              name="nguoiKiemTraId"
              rules={{
                required: {
                  value: true,
                  message: language.t(languageKeys.shared.form.requiredMessage),
                },
              }}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View style={{marginBottom: 15}}>
                  <DropdownMenuComponent
                    label="Người kiểm tra*"
                    options={
                      accounts?.map(a => ({
                        id: a.id,
                        label: a.displayName,
                      })) ?? []
                    }
                    onSelected={(id: any) => onChange(id)}
                    selectedLabel={
                      accounts?.find(d => d.id === value)?.displayName
                    }
                    style={styles.dropdownContainer}
                    inputContainer={styles.dropdownInputContainer}
                    labelContainerStyle={styles.dropdownLabelContainer}
                  />
                  <Text style={styles.textError}>{error?.message}</Text>
                </View>
              )}
            />

            <Controller
              control={control}
              name="ngayCheckList"
              rules={{
                required: {
                  value: true,
                  message: language.t(languageKeys.shared.form.requiredMessage),
                },
              }}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View style={{marginBottom: 15}}>
                  <DatePickerComponent
                    label="Ngày check list"
                    onChange={onChange}
                    value={value ?? ''}
                    inputContainerStyle={[
                      styles.dropdownInputContainer,
                      {paddingVertical: 0},
                    ]}
                    containerStyle={styles.dropdownContainer}
                    labelContainerStyle={styles.dropdownLabelContainer}
                  />
                  <Text style={styles.textError}>{error?.message}</Text>
                </View>
              )}
            />

            <Controller
              control={control}
              name="ngayKiemTra"
              rules={{
                required: {
                  value: true,
                  message: language.t(languageKeys.shared.form.requiredMessage),
                },
              }}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <View>
                  <DatePickerComponent
                    label="Ngày kiểm tra"
                    onChange={onChange}
                    value={value ?? ''}
                    inputContainerStyle={[
                      styles.dropdownInputContainer,
                      {paddingVertical: 0},
                    ]}
                    containerStyle={styles.dropdownContainer}
                    labelContainerStyle={styles.dropdownLabelContainer}
                  />
                  <Text style={styles.textError}>{error?.message}</Text>
                </View>
              )}
            />
          </View>
          <BottomContainer>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                onPress={() => {
                  reset();
                  setIsVisible(false);
                }}
                mode="outlined">
                {language.t(languageKeys.shared.button.back)}
              </Button>
              <Button onPress={handleSubmit(onSubmit)} mode="contained">
                {language.t(languageKeys.shared.button.add)}
              </Button>
            </View>
          </BottomContainer>
        </SafeAreaView>
      </ReactNativeModal>
    </>
  );
};

export default AssetHistoryCreate;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: '80%',
    marginTop: 'auto',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownInputContainer: {
    flex: 1,
    backgroundColor: '#f1f2f8',
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 20,
    paddingHorizontal: 10,
  },
  dropdownLabelContainer: {
    flex: 0.6,
  },
  textError: {
    ...globalStyles.text14Medium,
    color: '#F86F03',
  },
});
