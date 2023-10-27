import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  AssetFilterContext,
  useAllAssetEnums,
  useAllAssetGroup,
  useAllSystemCode,
} from '../hooks/hook';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import language, {languageKeys} from '@/config/language/language';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';

type Props = {isVisible: boolean; onBackdropPress: () => void};

const AssetFilter = ({isVisible, onBackdropPress = () => {}}: Props) => {
  const {systemCodes} = useAllSystemCode();
  const {assetStatus, assetForm} = useAllAssetEnums();
  const {assetGroups} = useAllAssetGroup({systemCode: undefined});
  const {filters, setFilters} = useContext(AssetFilterContext);
  return (
    <ReactNativeModal
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}
      style={{margin: 0}}>
      <SafeAreaView style={styles.container}>
        <View style={{width: '100%'}}>
          <View style={{paddingHorizontal: 20}}>
            <DropdownMenuComponent
              label={language.t(
                languageKeys.materialAsset.materialDetail.systemCode,
              )}
              options={systemCodes.map(c => ({id: c.id, label: c.title}))}
              onSelected={(id: number) =>
                setFilters({...filters, systemCode: id})
              }
              selectedLabel={
                systemCodes.find(s => s.id === filters?.systemCode)?.title
              }
              style={styles.dropdownContainer}
              inputContainer={styles.dropdownInputContainer}
              labelContainerStyle={{flex: 0.5}}
              useClear={true}
            />
            <DropdownMenuComponent
              label={language.t(
                languageKeys.materialAsset.materialDetail.status,
              )}
              options={assetStatus}
              onSelected={(id: number) => {
                setFilters({...filters, status: id});
              }}
              selectedLabel={
                assetStatus.find(s => s.id === filters?.status)?.label
              }
              style={styles.dropdownContainer}
              inputContainer={styles.dropdownInputContainer}
              labelContainerStyle={{flex: 0.5}}
              useClear={true}
            />
            <DropdownMenuComponent
              label={language.t(languageKeys.materialAsset.materialDetail.form)}
              options={assetForm}
              onSelected={(id: number) => {
                setFilters({...filters, form: id});
              }}
              selectedLabel={assetForm.find(s => s.id === filters?.form)?.label}
              style={styles.dropdownContainer}
              inputContainer={styles.dropdownInputContainer}
              labelContainerStyle={{flex: 0.5}}
              useClear={true}
            />
            <DropdownMenuComponent
              label={language.t(
                languageKeys.materialAsset.materialDetail.assetGroup,
              )}
              options={assetGroups.map(g => ({id: g.id, label: g.title}))}
              onSelected={(id: number) => {
                setFilters({...filters, group: id});
              }}
              selectedLabel={
                assetGroups.find(s => s.id === filters?.group)?.title
              }
              style={styles.dropdownContainer}
              inputContainer={styles.dropdownInputContainer}
              labelContainerStyle={{flex: 0.5}}
              useClear={true}
            />
          </View>
          <BottomContainer>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button mode="contained" onPress={() => onBackdropPress()}>
                {language.t(languageKeys.shared.button.filter)}
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => setFilters(undefined)}>
                {language.t(languageKeys.shared.button.resetFilter)}
              </Button>
            </View>
          </BottomContainer>
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default AssetFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 1,
    shadowOpacity: 0.2,
    marginTop: 'auto',
    height: '60%',
  },
  dropdownContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownInputContainer: {
    flex: 1,
    backgroundColor: '#f1f2f8',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
