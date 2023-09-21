import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TImportExportMaterial} from '@/screens/material-asset/services/material-asset.model';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';

type Props = {
  material: TImportExportMaterial;
};

const ImportExportItemCard = ({material}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>
        {material.materialName} - {material.materialCode}
      </Text>
      <Text style={styles.textLabel}>
        {language.t(languageKeys.materialAsset.materialDetail.unit)}:{' '}
        <Text style={styles.textValue}>{material.unitName}</Text>
      </Text>
      <Text style={styles.textLabel}>
        {language.t(languageKeys.materialAsset.materialDetail.amount)}:{' '}
        <Text style={styles.textValue}>{material.amount}</Text>
      </Text>
      <Text style={styles.textLabel}>
        {language.t(languageKeys.materialAsset.materialDetail.totalPrice)}:{' '}
        <Text style={styles.textValue}>
          {Intl.NumberFormat('vi', {style: 'currency', currency: 'vnd'}).format(
            material.price,
          )}
        </Text>
      </Text>
    </View>
  );
};

export default ImportExportItemCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: '#a4a4a4',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: 'white',
  },
  textLabel: {
    ...globalStyles.text15SemiBold,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
});
