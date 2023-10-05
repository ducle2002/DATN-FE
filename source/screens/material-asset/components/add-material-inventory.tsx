import {
  Dimensions,
  FlatList,
  InputAccessoryView,
  Keyboard,
  ListRenderItem,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useCreateInventory, useListMaterialAssets} from '../hooks/hook';
import ReactNativeModal from 'react-native-modal';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TMaterialAsset} from '@/screens/material-asset/services/material-asset.model';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import {Controller, useForm, useWatch} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
const {width} = Dimensions.get('screen');
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
  inventoryId: number;
};

const AddMaterialInventory = ({
  isVisible,
  onBackdropPress,
  inventoryId,
}: Props) => {
  const {dataProvider, fetchNextPage} = useListMaterialAssets();

  const [selectedItem, selectItem] = useState<TMaterialAsset>();

  const schema = useMemo(
    () =>
      yup.object({
        amount: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage))
          .min(1, language.t(languageKeys.shared.form.minValue) + '1'),
        price: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage))
          .min(1, language.t(languageKeys.shared.form.minValue) + '1'),
        totalPrice: yup
          .number()
          .required(language.t(languageKeys.shared.form.requiredMessage))
          .min(1, language.t(languageKeys.shared.form.minValue) + '1'),
        status: yup.string(),
      }),
    [],
  );

  const {control, reset, setValue, handleSubmit} = useForm({
    defaultValues: {
      amount: 0,
      price: selectedItem?.price,
      totalPrice: 0,
      status: '',
    },
    resolver: yupResolver(schema),
  });

  const sharedValue = useSharedValue(0);

  useEffect(() => {
    if (!selectedItem) {
      sharedValue.value = withTiming(0);
    } else {
      sharedValue.value = withTiming(1);
      reset({
        amount: 0,
        price: selectedItem.price,
        totalPrice: 0,
        status: '',
      });
    }
  }, [reset, selectedItem, sharedValue]);

  const onSelectItem = (item: TMaterialAsset) => {
    if (selectedItem?.id === item.id) {
      selectItem(undefined);
    } else {
      selectItem(item);
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: interpolate(sharedValue.value, [0, 1], [0, -width])},
      ],
    };
  });

  const watchedValue = useWatch({
    control: control,
    name: ['amount', 'price'],
  });

  useEffect(() => {
    setValue('totalPrice', watchedValue[0] * (watchedValue[1] ?? 0));
  }, [setValue, watchedValue]);

  const renderItem: ListRenderItem<TMaterialAsset> = ({item}) => (
    <Pressable onPress={() => onSelectItem(item)} style={styles.itemContainer}>
      <Text style={styles.textValue}>{item.materialName}</Text>
    </Pressable>
  );

  const onEndReached = () => {
    fetchNextPage();
  };

  const {createInventory} = useCreateInventory(() => {
    onBackdropPress();
    selectItem(undefined);
  });

  const onSubmit = (data: {
    amount: number;
    price: number;
    totalPrice: number;
    status: string | undefined;
  }) => {
    if (selectedItem?.id) {
      createInventory({
        ...data,
        inventoryId: inventoryId,
        materialId: selectedItem?.id,
      });
    }
  };

  return (
    <ReactNativeModal
      style={{margin: 0}}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
        <View style={{flex: 1, backgroundColor: '#f1f2f8'}}>
          <Animated.View style={[animatedStyles, styles.container]}>
            <FlatList
              onEndReached={onEndReached}
              data={dataProvider.getAllData()}
              renderItem={renderItem}
              ListHeaderComponent={
                <Text style={[styles.textValue]}>
                  {language.t(languageKeys.materialAsset.inventory.selectAsset)}
                </Text>
              }
              style={{maxWidth: width}}
            />
            <View
              style={[
                styles.halfViewContainer,
                {flexDirection: 'row', flexWrap: 'wrap'},
              ]}>
              <View style={[styles.inputContainer, {paddingRight: 5}]}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.materialAsset.materialDetail.amount)}
                </Text>
                <Controller
                  control={control}
                  name="amount"
                  render={({field: {value, onChange}, fieldState: {error}}) => (
                    <CTextInput
                      value={value?.toString()}
                      onChangeText={onChange as any}
                      keyboardType="numeric"
                      style={styles.textValue}
                      inputAccessoryViewID="bottom-view"
                      errorMessage={error?.message}
                    />
                  )}
                />
              </View>

              <View style={[styles.inputContainer, {paddingLeft: 5}]}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.materialAsset.materialDetail.value)}
                </Text>
                <Controller
                  control={control}
                  name="price"
                  render={({field: {value, onChange}, fieldState: {error}}) => (
                    <CTextInput
                      value={value?.toString()}
                      onChangeText={onChange as any}
                      inputAccessoryViewID="bottom-view"
                      errorMessage={error?.message}
                    />
                  )}
                />
              </View>

              <View style={[styles.inputContainer, {paddingRight: 5}]}>
                <Text style={styles.textLabel}>
                  {language.t(
                    languageKeys.materialAsset.materialDetail.totalValue,
                  )}
                </Text>
                <Controller
                  control={control}
                  name="totalPrice"
                  render={({field: {value, onChange}, fieldState: {error}}) => (
                    <CTextInput
                      value={value?.toString()}
                      onChangeText={onChange as any}
                      inputAccessoryViewID="bottom-view"
                      errorMessage={error?.message}
                    />
                  )}
                />
              </View>
              <View style={[styles.inputContainer, {paddingLeft: 5}]}>
                <Text style={styles.textLabel}>
                  {language.t(languageKeys.materialAsset.materialDetail.status)}
                </Text>
                <Controller
                  control={control}
                  name="status"
                  render={({field: {value, onChange}}) => (
                    <DropdownMenuComponent
                      inputContainer={{
                        backgroundColor: 'white',
                        paddingVertical: 8,
                        borderRadius: 8,
                      }}
                      onSelected={onChange}
                      options={[{id: 'using', label: 'using'}]}
                      selectedLabel={value}
                    />
                  )}
                />
              </View>
            </View>
          </Animated.View>
        </View>
        {Platform.OS === 'ios' && (
          <InputAccessoryView
            style={{paddingBottom: 10}}
            backgroundColor={'white'}
            nativeID="bottom-view">
            <BottomContainer>
              {selectedItem ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <Button
                    mode="outlined"
                    onPress={() => {
                      selectItem(undefined);
                    }}>
                    {language.t(languageKeys.shared.button.back)}
                  </Button>
                  <Button onPress={handleSubmit(onSubmit)} mode="contained">
                    {language.t(languageKeys.shared.button.save)}
                  </Button>
                </View>
              ) : (
                <Button
                  mode="contained-tonal"
                  onPress={() => {
                    onBackdropPress();
                    selectItem(undefined);
                    Keyboard.dismiss();
                  }}>
                  {language.t(languageKeys.shared.button.cancel)}
                </Button>
              )}
            </BottomContainer>
          </InputAccessoryView>
        )}
        <BottomContainer>
          {selectedItem ? (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
              }}>
              <Button
                mode="outlined"
                onPress={() => {
                  selectItem(undefined);
                }}>
                {language.t(languageKeys.shared.button.back)}
              </Button>
              <Button onPress={handleSubmit(onSubmit)} mode="contained">
                {language.t(languageKeys.shared.button.save)}
              </Button>
            </View>
          ) : (
            <Button
              mode="contained-tonal"
              onPress={() => {
                onBackdropPress();
                selectItem(undefined);
                Keyboard.dismiss();
              }}>
              {language.t(languageKeys.shared.button.cancel)}
            </Button>
          )}
        </BottomContainer>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default AddMaterialInventory;

const styles = StyleSheet.create({
  container: {
    width: 2 * width,
    flexDirection: 'row',
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  textValue: {
    ...globalStyles.text15SemiBold,
  },
  textLabel: {
    ...globalStyles.text15Bold,
    marginBottom: 5,
  },
  halfViewContainer: {
    width: width,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputContainer: {
    width: '50%',
    marginBottom: 10,
  },
});
