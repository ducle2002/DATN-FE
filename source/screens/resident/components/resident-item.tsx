import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemCard from '@/components/item-card.component';
import {TResident} from '../services/resident.model';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import Button from '@/components/button.component';
type Props = {resident: TResident; viewItem: () => void};

const ResidentItem = ({resident, viewItem}: Props) => {
  return (
    <ItemCard style={styles.container} containerStyle={{paddingVertical: 5}}>
      <View style={styles.contentContainer}>
        <Text style={styles.textName}>{resident.fullName}</Text>
        <Text style={styles.textValue}>
          {language.t(languageKeys.residentLanguage.resident.buildingCode)}:{' '}
          {resident.buildingCode}
        </Text>
        <Text style={styles.textValue}>
          {language.t(languageKeys.residentLanguage.resident.apartmentCode)}:{' '}
          {resident.apartmentCode}
        </Text>
        <View style={styles.tag}>
          <Text style={styles.textTag}>
            {language.t(languageKeys.residentLanguage.state[resident.state])}
          </Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Button
          onPress={viewItem}
          mode="contained"
          style={{paddingVertical: 0}}>
          {language.t(languageKeys.shared.button.see)}
        </Button>
      </View>
    </ItemCard>
  );
};

export default ResidentItem;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 10,
  },
  textName: {
    ...globalStyles.text16Bold,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  textTag: {
    ...globalStyles.text12Bold,
    color: 'white',
  },
  tag: {
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
    backgroundColor: '#5BBAEF',
    width: 'auto',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  contentContainer: {
    width: '70%',
  },
  actionContainer: {
    width: '30%',
    justifyContent: 'space-around',
  },
});
