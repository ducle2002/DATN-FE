import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import language, {languageKeys} from '@/config/language/language';
import {
  EResidentFormId,
  EResidentState,
  TResident,
} from '../services/resident.model';
import moment from 'moment';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import globalStyles from '@/config/globalStyles';
import {useQueryClient} from 'react-query';
import {useUpdateResidentState} from '../services/resident.hook';
import FastImage from 'react-native-fast-image';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  resident?: TResident;
  formId: EResidentFormId;
  keyword?: string;
};

const ResidentDetail = ({
  isVisible,
  closeModal,
  resident,
  formId,
  keyword,
}: Props) => {
  const queryClient = useQueryClient();
  const {updateState} = useUpdateResidentState(() => {
    queryClient.refetchQueries(['resident', formId, keyword]);
    closeModal();
  });

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}
      style={{margin: 0}}
      useNativeDriverForBackdrop={true}>
      {resident ? (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Text style={styles.textTitle}>
                {language.t(
                  languageKeys.residentLanguage.resident.residentInformation,
                )}
              </Text>
              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.buildingCode,
                  )}
                  : {resident.buildingCode}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.apartmentCode,
                  )}
                  : {resident.apartmentCode}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(languageKeys.residentLanguage.resident.fullName)}:{' '}
                  {resident.fullName}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.dateOfBirth,
                  )}
                  : {moment(resident.dateOfBirth).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(languageKeys.residentLanguage.resident.gender)}:{' '}
                  {resident.gender}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.phoneNumber,
                  )}
                  : {resident.phoneNumber}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(languageKeys.residentLanguage.resident.email)}:{' '}
                  {resident.email}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.identityNumber,
                  )}
                  : {resident.identityNumber}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.relationship,
                  )}
                  :{' '}
                  {language.t(
                    languageKeys.residentLanguage.relationship[
                      resident.relationShip
                    ],
                  )}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.nationality,
                  )}
                  : {resident.nationality}
                </Text>
              </View>
              <View>
                <Text style={styles.textContent}>
                  {language.t(
                    languageKeys.residentLanguage.resident.identityImages,
                  )}
                  :
                </Text>
                {resident.imageUrlsIdentity &&
                resident.imageUrlsIdentity.length > 0 ? (
                  <View style={styles.imagesContainer}>
                    {resident.imageUrlsIdentity.map(u => (
                      <View key={u} style={styles.imageContainer}>
                        <FastImage source={{uri: u}} style={styles.image} />
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text>Không cung cấp</Text>
                )}
              </View>
            </View>
          </ScrollView>
          <BottomContainer style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}>
              <Button
                onPress={closeModal}
                mode="contained-tonal"
                style={styles.button}>
                {language.t(languageKeys.shared.button.back)}
              </Button>
              {resident.state !== EResidentState.VERIFIED && (
                <>
                  <Button
                    onPress={() => {
                      updateState({
                        ...resident,
                        state: EResidentState.VERIFIED,
                      });
                    }}
                    style={styles.button}
                    mode="contained">
                    {language.t(languageKeys.shared.button.accept)}
                  </Button>
                  <Button
                    onPress={() => {
                      updateState({
                        ...resident,
                        state: EResidentState.MUST_EDIT,
                      });
                    }}
                    style={styles.button}
                    mode="contained">
                    {language.t(languageKeys.shared.button.requestEdit)}
                  </Button>
                </>
              )}
            </View>
          </BottomContainer>
        </SafeAreaView>
      ) : (
        <></>
      )}
    </ReactNativeModal>
  );
};

export default ResidentDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '80%',
    backgroundColor: 'white',
    marginTop: 'auto',
  },
  textTitle: {
    ...globalStyles.text16Bold,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  textContent: {
    ...globalStyles.text15Medium,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    marginVertical: 5,
  },
  imagesContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  imageContainer: {
    width: '50%',
    aspectRatio: 1.7,
    padding: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
