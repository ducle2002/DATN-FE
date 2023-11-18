import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import ReactNativeModal from 'react-native-modal';
import BottomContainer from '@/components/bottom-container.component';
import {useAllUrban} from '@/modules/urban/urban.hook';
import {MeterFilterContext} from '../hooks/MeterFilterContext';
import {useListBuilding} from '@/modules/building/building.hook';
import globalStyles from '@/config/globalStyles';
import {useListApartments} from '@/modules/apartment/apartment.hook';
type Props = {};

const FilterMeter = ({}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const {urbans} = useAllUrban({});
  const {filters, setFilters} = useContext(MeterFilterContext);

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

  const {apartments} = useListApartments({...filters});

  const selectedApartment = useMemo(
    () =>
      apartments.find(u => u.apartmentCode === filters.apartmentCode)
        ?.apartmentCode ?? language.t(languageKeys.residentLanguage.formId[1]),
    [apartments, filters.apartmentCode],
  );

  return (
    <>
      <Button mode="contained-tonal" onPress={() => setIsVisible(true)}>
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
                setFilters(old => ({
                  ...old,
                  buildingId: id,
                  apartmentCode: undefined,
                }))
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
            <DropdownMenuComponent
              options={[
                {
                  id: undefined,
                  label: language.t(languageKeys.residentLanguage.formId[1]),
                },
                ...apartments.map(u => ({
                  id: u.apartmentCode,
                  label: u.apartmentCode,
                })),
              ]}
              selectedLabel={selectedApartment}
              onSelected={(id: string) =>
                setFilters(old => ({...old, apartmentCode: id}))
              }
              label={language.t(
                languageKeys.residentLanguage.resident.apartmentCode,
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
                    apartmentCode: undefined,
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

export default FilterMeter;

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
