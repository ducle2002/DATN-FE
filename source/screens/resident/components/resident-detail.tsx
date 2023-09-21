import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import language, {languageKeys} from '@/config/language/language';
import {TResident} from '../services/resident.model';
import moment from 'moment';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  resident?: TResident;
};

const ResidentDetail = ({isVisible, closeModal, resident}: Props) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}
      style={{margin: 0}}
      useNativeDriverForBackdrop={true}>
      {resident && (
        <View style={styles.container}>
          <Text>Thongtinkhaibao</Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.buildingCode)}:{' '}
            {resident.buildingCode}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.apartmentCode)}:{' '}
            {resident.apartmentCode}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.fullName)}:{' '}
            {resident.fullName}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.dateOfBirth)}:{' '}
            {moment(resident.dateOfBirth).format('DD/MM/YYYY')}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.gender)}:{' '}
            {resident.gender}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.phoneNumber)}:{' '}
            {resident.phoneNumber}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.email)}:{' '}
            {resident.email}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.identityNumber)}:{' '}
            {resident.identityNumber}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.relationship)}:{' '}
            {resident.relationShip}
          </Text>
          <Text>
            {language.t(languageKeys.residentLanguage.resident.nationality)}:{' '}
            {resident.nationality}
          </Text>
          <BottomContainer>
            <View>
              <Button>{language.t(languageKeys.shared.button.back)}</Button>
            </View>
          </BottomContainer>
        </View>
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
});
