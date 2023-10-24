import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  TAssetDetail,
  assetDetailDefault,
} from '@/screens/material-asset/services/material-asset.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import Button from '@/components/button.component';
import CTextInput from '@/components/text-input.component';
import {Controller, useForm, useWatch} from 'react-hook-form';
import BottomContainer from '@/components/bottom-container.component';
import {useMaterialCategory} from '@/screens/material-asset/hooks/material-category.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';
import {
  useAllAssetEnums,
  useAllAssetGroup,
  useAllSystemCode,
  useAssetById,
  useCreateAsset,
  useUpdateAsset,
} from '../hooks/hook';
import DatePickerComponent from '@/screens/work-management/components/date-picker.component';

type Props = {
  materialId?: number;
  onBackdropPress: () => void;
};

const MaterialDetail = ({materialId, onBackdropPress}: Props) => {
  // const schema = useMemo(
  //   () =>
  //     yup.object({
  //       name: yup
  //         .string()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //       code: yup
  //         .string()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //       groupId: yup
  //         .number()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //       typeId: yup
  //         .number()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //       unitId: yup
  //         .number()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //       producerId: yup
  //         .number()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //       price: yup
  //         .number()
  //         .required(language.t(languageKeys.shared.form.requiredMessage)),
  //     }),
  //   [],
  // );
  const material = useAssetById(materialId);

  const [editable] = useState(true);

  useMaterialCategory();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<TAssetDetail>({
    defaultValues: assetDetailDefault,
    // resolver: yupResolver(schema) as any,
  });

  const systemCode = useWatch({
    control: control,
    name: 'maHeThongId',
  });

  const {systemCodes} = useAllSystemCode();

  const {assetGroups} = useAllAssetGroup({systemCode: systemCode});

  const {assetForm, assetStatus} = useAllAssetEnums();

  const {updateAsset} = useUpdateAsset({
    onSuccessCallback: () => {
      onBackdropPress();
    },
  });

  const {createAsset} = useCreateAsset({
    onSuccessCallback: () => {
      onBackdropPress();
    },
  });

  useEffect(() => {
    reset(material);
  }, [material, reset]);

  const onSubmit = (data: TAssetDetail) => {
    if (materialId && materialId > 0) {
      updateAsset({
        ...material,
        ...data,
      });
    } else {
      createAsset({
        ...material,
        ...data,
      });
    }
  };

  return (
    <ReactNativeModal
      statusBarTranslucent
      swipeDirection={!editable ? 'down' : undefined}
      propagateSwipe={true}
      onSwipeComplete={() => {
        if (!editable) {
          onBackdropPress();
        }
      }}
      backdropOpacity={0.2}
      style={{margin: 0}}
      onBackdropPress={() => {
        if (!editable) {
          onBackdropPress();
        }
      }}
      isVisible={!!materialId}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
          style={styles.contentContainer}>
          {/* tên tài sản */}
          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.assetName,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="title"
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    style={[styles.textValue]}
                    placeholder={errors.title?.message}
                    placeholderTextColor={
                      errors.title?.message ? '#FF6565' : '#ababab'
                    }
                    editable={editable}
                    onChangeText={onChange}
                    withError={false}
                  />
                )}
              />
            </View>
          </View>

          {/* mã tài sản */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.assetCode,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="code"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    style={[styles.textValue, {backgroundColor: '#f1f2f8'}]}
                    editable={editable}
                    withError={false}
                    placeholder={errors.code?.message}
                    placeholderTextColor={
                      errors.code?.message ? '#FF6565' : '#ababab'
                    }
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>

          {/* loại tài sản - mã hệ thống */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.systemCode,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="maHeThongId"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={
                      systemCodes?.find(c => c.id === value)?.title ??
                      material?.nhomTaiSanText
                    }
                    placeholder={errors.maHeThongId?.message}
                    placeholderTextColor={
                      errors.maHeThongId?.message ? '#FF6565' : '#ababab'
                    }
                    onSelected={onChange}
                    disable={!editable}
                    options={
                      systemCodes.map(c => ({
                        id: c.id,
                        label: c.title,
                      })) ?? []
                    }
                  />
                )}
              />
            </View>
          </View>

          {/** Nhóm tài sản */}
          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.assetGroup,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="nhomTaiSanId"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={
                      assetGroups?.find(c => c.id === value)?.title ??
                      material?.nhomTaiSanText
                    }
                    placeholder={errors.nhomTaiSanId?.message}
                    placeholderTextColor={
                      errors.nhomTaiSanId?.message ? '#FF6565' : '#ababab'
                    }
                    onSelected={onChange}
                    disable={!editable}
                    options={
                      assetGroups?.map(c => ({
                        id: c.id,
                        label: c.title,
                      })) ?? []
                    }
                  />
                )}
              />
            </View>
          </View>

          {/**
           * Hinhthuc
           */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.form)}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="hinhThuc"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={
                      assetForm.find(c => c.id === value)?.label ??
                      material?.hinhThucText
                    }
                    disable={!editable}
                    onSelected={onChange}
                    placeholder={errors.hinhThuc?.message}
                    placeholderTextColor={
                      errors.hinhThuc?.message ? '#FF6565' : '#ababab'
                    }
                    options={assetForm}
                  />
                )}
              />
            </View>
          </View>

          {/**
           * Trang thai
           */}
          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.status)}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="trangThai"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    disable={!editable}
                    selectedLabel={
                      assetStatus.find(c => c.id === value)?.label ??
                      material?.trangThaiText
                    }
                    placeholder={errors.trangThai?.message}
                    placeholderTextColor={
                      errors.trangThai?.message ? '#FF6565' : '#ababab'
                    }
                    onSelected={onChange}
                    options={assetStatus}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.startDate,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="ngayBatDau"
                render={({field: {value, onChange}}) => (
                  <DatePickerComponent
                    value={value ?? ''}
                    onChange={onChange}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.endDate)}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="ngayKetThuc"
                render={({field: {value, onChange}}) => (
                  <DatePickerComponent
                    value={value ?? ''}
                    onChange={onChange}
                  />
                )}
              />
            </View>
          </View>

          {/* giá tài sản */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.totalPrice,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="giaTriTaiSan"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={
                      !editable
                        ? Intl.NumberFormat('vi', {
                            style: 'currency',
                            currency: 'vnd',
                          }).format(value)
                        : value?.toString()
                    }
                    placeholder={errors.giaTriTaiSan?.message}
                    placeholderTextColor={
                      errors.giaTriTaiSan?.message ? '#FF6565' : '#ababab'
                    }
                    style={[styles.textValue, {backgroundColor: '#f1f2f8'}]}
                    editable={editable}
                    withError={false}
                    onChangeText={onChange as any}
                    keyboardType="numbers-and-punctuation"
                  />
                )}
              />
            </View>
          </View>

          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.amount)}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="soLuong"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    placeholder={errors.giaTriTaiSan?.message}
                    placeholderTextColor={
                      errors.giaTriTaiSan?.message ? '#FF6565' : '#ababab'
                    }
                    style={[styles.textValue, {backgroundColor: '#f1f2f8'}]}
                    editable={editable}
                    withError={false}
                    onChangeText={onChange as any}
                    keyboardType="numbers-and-punctuation"
                  />
                )}
              />
            </View>
          </View>

          {/** Mô tả tài sản */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.description,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="ghiChu"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value ? value : ''}
                    style={[styles.textValue, {backgroundColor: '#f1f2f8'}]}
                    editable={editable}
                    withError={false}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
        <BottomContainer>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <>
              <Button
                style={{flex: 0.4}}
                mode="contained-tonal"
                onPress={() => {
                  reset();
                  onBackdropPress();
                }}>
                {language.t(languageKeys.shared.button.cancel)}
              </Button>
              <Button
                style={{flex: 0.4}}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                {language.t(languageKeys.shared.button.save)}
              </Button>
            </>
          </View>
        </BottomContainer>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default memo(MaterialDetail);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 'auto',
    maxHeight: '100%',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  cellLeft: {
    flex: 1,
  },
  cellRight: {
    flex: 1.5,
  },
  textLabel: {
    ...globalStyles.text16SemiBold,
  },
  textValue: {
    ...globalStyles.text16Medium,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
