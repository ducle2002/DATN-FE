import {StyleSheet, View, SafeAreaView} from 'react-native';
import React, {memo, useContext, useMemo, useState} from 'react';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {EResidentFormId} from '../services/resident.model';
import language, {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import Button from '@/components/button.component';
import ReactNativeModal from 'react-native-modal';
import BottomContainer from '@/components/bottom-container.component';
import {useAllUrban} from '@/modules/urban/urban.hook';
import {ResidentFilterContext} from '../hooks/ResidentFilterContext';
import {useListBuilding} from '@/modules/building/building.hook';

type Props = {};

const ResidentFilter = ({}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const {filters, setFilters} = useContext(ResidentFilterContext);

  const options = Object.values(EResidentFormId)
    .filter(v => typeof v === 'number')
    .map(value => ({
      id: value,
      label: language.t(
        languageKeys.residentLanguage.formId[
          value as keyof typeof languageKeys.residentLanguage.formId
        ],
      ),
    }));

  const selectedFormId = useMemo(
    () => options.find(o => o.id === filters.formId)?.label,
    [filters.formId, options],
  );

  const {urbans} = useAllUrban({});

  const selectedUrban = useMemo(
    () =>
      urbans.find(u => u.id === filters.urbanId)?.displayName ??
      language.t(languageKeys.residentLanguage.formId[1]),
    [filters.urbanId, urbans],
  );

  const {buildings} = useListBuilding({urbanId: filters.urbanId});

  const selectedBuilding = useMemo(
    () =>
      buildings.find(u => u.id === filters.buildingId)?.displayName ??
      language.t(languageKeys.residentLanguage.formId[1]),
    [filters.buildingId, buildings],
  );

  return (
    <>
      <Button mode="contained" onPress={() => setIsVisible(true)}>
        {language.t(languageKeys.shared.button.filter)}
      </Button>
      <ReactNativeModal
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        style={{margin: 0}}
        swipeDirection={['down']}
        useNativeDriverForBackdrop={true}
        onSwipeComplete={() => setIsVisible(false)}
        swipeThreshold={100}>
        <SafeAreaView
          style={{height: '60%', backgroundColor: 'white', marginTop: 'auto'}}>
          <View style={styles.container}>
            <DropdownMenuComponent
              options={options}
              selectedLabel={selectedFormId}
              onSelected={(id: EResidentFormId) =>
                setFilters(old => ({...old, formId: id}))
              }
              label={language.t(languageKeys.qa.state.state)}
              labelStyle={{...globalStyles.text15Medium}}
              style={styles.filterContainer}
              valueStyle={{...globalStyles.text15Bold}}
              labelContainerStyle={styles.labelContainer}
              inputContainer={styles.inputContainer}
            />
            <DropdownMenuComponent
              options={[
                {
                  id: undefined,
                  label: language.t(languageKeys.residentLanguage.formId[1]),
                },
                ...urbans.map(u => ({id: u.id, label: u.displayName})),
              ]}
              selectedLabel={selectedUrban}
              onSelected={(id: number) =>
                setFilters(old => ({
                  ...old,
                  urbanId: id,
                  buildingId: undefined,
                }))
              }
              label={language.t(languageKeys.residentLanguage.resident.urban)}
              labelStyle={{...globalStyles.text15Medium}}
              style={styles.filterContainer}
              valueStyle={{...globalStyles.text15Bold}}
              labelContainerStyle={styles.labelContainer}
              inputContainer={styles.inputContainer}
            />
            <DropdownMenuComponent
              options={[
                {
                  id: undefined,
                  label: language.t(languageKeys.residentLanguage.formId[1]),
                },
                ...buildings.map(u => ({id: u.id, label: u.displayName})),
              ]}
              selectedLabel={selectedBuilding}
              onSelected={(id: number) =>
                setFilters(old => ({...old, buildingId: id}))
              }
              label={language.t(
                languageKeys.residentLanguage.resident.building,
              )}
              labelStyle={{...globalStyles.text15Medium}}
              style={styles.filterContainer}
              valueStyle={{...globalStyles.text15Bold}}
              labelContainerStyle={styles.labelContainer}
              inputContainer={styles.inputContainer}
            />
          </View>
          <BottomContainer>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button mode="contained" onPress={() => setIsVisible(false)}>
                {language.t(languageKeys.shared.button.filter)}
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => {
                  setFilters(old => ({
                    ...old,
                    urbanId: undefined,
                    buildingId: undefined,
                    formId: EResidentFormId.ALL,
                  }));
                  setTimeout(() => {
                    setIsVisible(false);
                  }, 500);
                }}>
                {language.t(languageKeys.shared.button.resetFilter)}
              </Button>
            </View>
          </BottomContainer>
        </SafeAreaView>
      </ReactNativeModal>
    </>
  );
};

export default memo(ResidentFilter);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 1,
    shadowOpacity: 0.2,
    marginTop: 'auto',
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#f1f2f8',
    borderRadius: 10,
    flex: 1,
  },
  labelContainer: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
