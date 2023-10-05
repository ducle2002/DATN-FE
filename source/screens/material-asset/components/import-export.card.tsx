import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {TImportExportDocs} from '@/screens/material-asset/services/material-asset.model';
import ItemCard from '@/components/item-card.component';
import Icon from '@/components/icon.component';
import {useInventoryName} from '../hooks/hook';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import language, {languageKeys} from '@/config/language/language';

type Props = {doc: TImportExportDocs; onPress: () => void};

const ImportExportCard = ({doc, onPress}: Props) => {
  const inventoryName = useInventoryName(doc.toInventoryId);

  return (
    <ItemCard
      onPress={onPress}
      style={{height: '100%'}}
      containerStyle={{
        height: '100%',
        paddingVertical: 5,
        overflow: 'hidden',
      }}>
      <View style={styles.container}>
        <Icon name="document-text" type="Ionicons" size={50} color="#64C6DD" />
        <View style={styles.content}>
          <Text style={styles.textCode}>{doc.code}</Text>
          <Text style={styles.textValue}>
            {language.t(languageKeys.materialAsset.docs.creationTime)}:{' '}
            {moment(doc.creationTime).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.textValue}>
            {language.t(languageKeys.materialAsset.docs.amount)}:{' '}
            {doc.totalAmount}
          </Text>
          <Text style={styles.textValue}>
            {language.t(languageKeys.materialAsset.docs.desInventory)}:{' '}
            {inventoryName}
          </Text>
        </View>
        <View
          style={[
            styles.tag,
            {backgroundColor: doc.isApproved ? '#557A46' : '#ffcc00'},
          ]}>
          <Text style={styles.textTag}>
            {language.t(
              languageKeys.materialAsset.docs[
                doc.isApproved ? 'approved' : 'waiting'
              ],
            )}
          </Text>
        </View>
      </View>
    </ItemCard>
  );
};

export default memo(ImportExportCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  content: {
    marginLeft: 10,
  },
  textCode: {
    ...globalStyles.text15Bold,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  textTag: {
    ...globalStyles.text12Bold,
    color: 'white',
  },
  tag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
  },
});
