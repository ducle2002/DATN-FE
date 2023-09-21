import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  TImportExportDocs,
  TInventory,
} from '@/screens/material-asset/services/material-asset.model';
import {useAllInventory} from '../hooks/hook';
import language, {languageKeys} from '@/config/language/language';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {Controller, useForm, useWatch} from 'react-hook-form';
import CTextInput from '@/components/text-input.component';
import globalStyles from '@/config/globalStyles';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {find, propEq} from 'ramda';
import ImportExportItemCard from './import-export-item.card';
import {useMutation, useQueryClient} from 'react-query';
import MaterialImportExportApi from '@/screens/material-asset/services/material-import-export.service';

type Props = {
  doc: TImportExportDocs | undefined;
  onBackdropPress: () => void;
};

const ImportExportDetail = ({doc, onBackdropPress}: Props) => {
  const {allInventory} = useAllInventory();

  const {control, reset} = useForm({defaultValues: doc});

  const queryClient = useQueryClient();

  const {mutate: approve} = useMutation({
    mutationFn: (params: {id: string; isImport: boolean}) =>
      MaterialImportExportApi.approve(params),
    onSuccess: () => {
      queryClient
        .refetchQueries([
          'data-import-export',
          doc?.isImport ? 'IMPORT' : 'EXPORT',
        ])
        .then(() => {
          onBackdropPress();
        });
    },
  });

  const watchedValue = useWatch({
    control: control,
    name: ['fromInventoryId', 'toInventoryId'],
  });

  const {fromName, toName} = useMemo(() => {
    const from = find<TInventory>(propEq(watchedValue[0], 'id'))(
      allInventory ?? [],
    )?.name;
    const to = find<TInventory>(propEq(watchedValue[1], 'id'))(
      allInventory ?? [],
    )?.name;
    return {
      fromName: from,
      toName: to,
    };
  }, [allInventory, watchedValue]);

  const optionInventory = useMemo(
    () =>
      allInventory?.map(i => ({
        id: i.id,
        label: i.name,
      })) ?? [],
    [allInventory],
  );

  useEffect(() => {
    reset(doc);
  }, [doc, reset]);

  return (
    <ReactNativeModal
      onBackdropPress={onBackdropPress}
      isVisible={!!doc}
      backdropOpacity={0.2}
      style={{margin: 0}}>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={styles.container}>
          <Text
            style={[
              styles.textStatus,
              {backgroundColor: doc?.isApproved ? '#557A46' : '#ffcc00'},
            ]}>
            {language.t(
              languageKeys.materialAsset.docs[
                doc?.isApproved ? 'approved' : 'waiting'
              ],
            )}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.docs.code)}
            </Text>
            <View style={{flex: 1.5}}>
              <Controller
                control={control}
                name="code"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.textValue}
                    withError={false}
                    editable={false}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.docs.from)}
            </Text>
            <View style={{flex: 1.5}}>
              <Controller
                control={control}
                name="fromInventoryId"
                render={({field: {onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={fromName}
                    onSelected={onChange}
                    options={optionInventory}
                    style={[styles.textValue, styles.dropdownInput]}
                    disable={true}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.docs.from)}
            </Text>
            <View style={{flex: 1.5}}>
              <Controller
                control={control}
                name="toInventoryId"
                render={({field: {onChange}}) => (
                  <DropdownMenuComponent
                    selectedLabel={toName}
                    onSelected={onChange}
                    style={[styles.textValue, styles.dropdownInput]}
                    options={optionInventory}
                    disable={true}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.docs.EITime)}
            </Text>
            <View style={{flex: 1.5}}>
              <Controller
                control={control}
                name="importExportDate"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.textValue}
                    withError={false}
                    editable={false}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.materialAsset.docs.reason)}
            </Text>
            <View style={{flex: 1.5}}>
              <Controller
                control={control}
                name="description"
                render={({field: {value, onChange}}) => (
                  <CTextInput
                    value={value}
                    onChangeText={onChange}
                    style={styles.textValue}
                    editable={false}
                    withError={false}
                  />
                )}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <Text style={[styles.textLabel, {flex: undefined}]}>
              {language.t(languageKeys.materialAsset.docs.listMaterial)}
            </Text>
            <View style={{marginTop: 10}}>
              {doc?.materialViews.map(m => (
                <ImportExportItemCard material={m} key={m.id} />
              ))}
            </View>
          </View>
        </View>
        <BottomContainer>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <Button onPress={onBackdropPress} mode="outlined">
              {language.t(languageKeys.shared.button.back)}
            </Button>
            {!doc?.isApproved && (
              <Button
                onPress={() => {
                  if (doc) {
                    approve({id: doc?.id, isImport: doc?.isImport});
                  }
                }}
                mode="contained">
                {language.t(languageKeys.shared.button.accept)}
              </Button>
            )}
          </View>
        </BottomContainer>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default ImportExportDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownInput: {
    borderRadius: 8,
    paddingVertical: 5,
  },
  textLabel: {
    ...globalStyles.text15Bold,
    flex: 1,
  },
  textValue: {
    ...globalStyles.text15Medium,
    paddingVertical: 0,
    backgroundColor: '#f1f2f8',
  },
  textStatus: {
    ...globalStyles.text16Bold,
    textAlign: 'center',
    paddingVertical: 10,
    color: 'white',
  },
});
