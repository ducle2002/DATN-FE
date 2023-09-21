import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {TMaterialAsset} from '@/screens/material-asset/services/material-asset.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import Button from '@/components/button.component';
import CTextInput from '@/components/text-input.component';
import {Controller, useForm} from 'react-hook-form';
import BottomContainer from '@/components/bottom-container.component';
import {useMaterialCategory} from '@/screens/material-asset/services/material-category.hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  useCreateMaterial,
  useDeleteMaterial,
  useUpdateMaterial,
} from '../hooks/hook';
type Props = {
  material?: TMaterialAsset;
  onBackdropPress: () => void;
};

const MaterialDetail = ({material, onBackdropPress}: Props) => {
  const schema = useMemo(
    () =>
      yup.object({
        materialName: yup
          .string()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
        materialCode: yup
          .string()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
        groupId: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
        typeId: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
        unitId: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
        producerId: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
        price: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage)),
      }),
    [],
  );

  const [editable, setEditable] = useState(!material?.id);
  const {categoryGroup, categoryProducer, categoryType, categoryUnit} =
    useMaterialCategory();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm<TMaterialAsset>({
    defaultValues: material,
    resolver: yupResolver(schema) as any,
  });

  const {updateMaterial} = useUpdateMaterial(() => {
    setEditable(false);
    onBackdropPress();
  });

  const {createMaterial} = useCreateMaterial(() => {
    setEditable(false);
    onBackdropPress();
  });

  const {deleteMaterial} = useDeleteMaterial(() => {
    setEditable(false);
    onBackdropPress();
  });

  useEffect(() => {
    setEditable(!material?.id);
    reset(material);
  }, [material, reset]);

  const onSubmit = (data: TMaterialAsset) => {
    if (material?.id) {
      updateMaterial({
        ...material,
        ...data,
      });
    } else {
      createMaterial({
        ...material,
        ...data,
      });
    }
  };

  return (
    <ReactNativeModal
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
      isVisible={!!material}>
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
                name="materialName"
                rules={{required: true}}
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    style={[styles.textValue]}
                    placeholder={errors.materialName?.message}
                    placeholderTextColor={
                      errors.materialName?.message ? '#FF6565' : '#ababab'
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
                name="materialCode"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    style={[styles.textValue, {backgroundColor: '#f1f2f8'}]}
                    editable={editable}
                    withError={false}
                    placeholder={errors.materialName?.message}
                    placeholderTextColor={
                      errors.materialCode?.message ? '#FF6565' : '#ababab'
                    }
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>

          {/* số serial tài sản */}
          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.serialNumber,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="serialNumber"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value as string}
                    style={[styles.textValue]}
                    editable={editable}
                    withError={false}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
          </View>

          {/* loại tài sản */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(
                  languageKeys.materialAsset.materialDetail.assetType,
                )}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="typeId"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={
                      categoryType.data?.dataFilter.find(c => c.id === value)
                        ?.name ?? material?.typeName
                    }
                    placeholder={errors.typeId?.message}
                    placeholderTextColor={
                      errors.materialCode?.message ? '#FF6565' : '#ababab'
                    }
                    onSelected={onChange}
                    disable={!editable}
                    options={
                      categoryType.data?.dataFilter.map(c => ({
                        id: c.id,
                        label: c.name,
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
                name="groupId"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={
                      categoryGroup.data?.dataFilter.find(c => c.id === value)
                        ?.name ?? material?.groupName
                    }
                    placeholder={errors.groupId?.message}
                    placeholderTextColor={
                      errors.groupId?.message ? '#FF6565' : '#ababab'
                    }
                    onSelected={onChange}
                    disable={!editable}
                    options={
                      categoryGroup.data?.dataFilter.map(c => ({
                        id: c.id,
                        label: c.name,
                      })) ?? []
                    }
                  />
                )}
              />
            </View>
          </View>

          {/**
           * Nhà sản xuất
           */}
          <View style={[styles.row, {backgroundColor: '#f1f2f8'}]}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.producer)}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="producerId"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={
                      categoryProducer.data?.dataFilter.find(
                        c => c.id === value,
                      )?.name ?? material?.producerName
                    }
                    disable={!editable}
                    onSelected={onChange}
                    placeholder={errors.producerId?.message}
                    placeholderTextColor={
                      errors.producerId?.message ? '#FF6565' : '#ababab'
                    }
                    options={
                      categoryProducer.data?.dataFilter.map(c => ({
                        id: c.id,
                        label: c.name,
                      })) ?? []
                    }
                  />
                )}
              />
            </View>
          </View>

          {/**
           * Đơn vị
           */}
          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.unit)}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="unitId"
                render={({field: {value, onChange}}) => (
                  <DropdownMenuComponent
                    disable={!editable}
                    selectedLabel={
                      categoryUnit.data?.dataFilter.find(c => c.id === value)
                        ?.name ?? material?.unitName
                    }
                    placeholder={errors.unitId?.message}
                    placeholderTextColor={
                      errors.unitId?.message ? '#FF6565' : '#ababab'
                    }
                    onSelected={onChange}
                    options={
                      categoryUnit.data?.dataFilter.map(c => ({
                        id: c.id,
                        label: c.name,
                      })) ?? []
                    }
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
                name="price"
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
                    placeholder={errors.price?.message}
                    placeholderTextColor={
                      errors.price?.message ? '#FF6565' : '#ababab'
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

          {/* trạng thái tài sản */}
          <View style={styles.row}>
            <View style={styles.cellLeft}>
              <Text style={styles.textLabel}>
                {language.t(languageKeys.materialAsset.materialDetail.status)}{' '}
              </Text>
            </View>
            <View style={styles.cellRight}>
              <Controller
                control={control}
                name="status"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    style={[styles.textValue]}
                    editable={editable}
                    withError={false}
                    onChangeText={onChange}
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
                name="description"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
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
            {!editable ? (
              <>
                <Button
                  onPress={() => {
                    setTimeout(() => {
                      reset();
                      onBackdropPress();
                    }, 100);
                    setEditable(false);
                  }}
                  mode="contained-tonal">
                  {language.t(languageKeys.shared.button.back)}
                </Button>
                <Button
                  mode="outlined"
                  style={{flex: 0.4}}
                  onPress={() => {
                    if (material?.id) {
                      deleteMaterial(material.id);
                    }
                  }}>
                  {language.t(languageKeys.shared.button.delete)}
                </Button>
                <Button
                  style={{flex: 0.4}}
                  mode="contained"
                  onPress={() => {
                    setEditable(true);
                  }}>
                  {language.t(languageKeys.shared.button.edit)}
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{flex: 0.4}}
                  mode="contained-tonal"
                  onPress={() => {
                    setTimeout(() => {
                      reset();
                      if (!material?.id) {
                        onBackdropPress();
                      }
                    }, 100);
                    setEditable(false);
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
            )}
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
