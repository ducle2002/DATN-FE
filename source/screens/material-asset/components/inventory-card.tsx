import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemCard from '@/components/item-card.component';
import {TInventory} from '@/modules/material-asset/material-asset.model';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import Icon from '@/components/icon.component';

type Props = {
  inventory: TInventory;
  onPress: () => void;
};

const InventoryCard = ({inventory, onPress}: Props) => {
  return (
    <ItemCard onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="inventory"
          type="MaterialIcons"
          size={60}
          color={'#dbdbdb'}
        />
        <View
          style={{
            justifyContent: 'space-between',
            marginLeft: 10,
            height: '100%',
            paddingVertical: 10,
          }}>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.inventory.name)}{' '}
            <Text style={styles.textValue}>{inventory.name}</Text>
          </Text>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.inventory.totalCount)}{' '}
            <Text style={styles.textValue}>{inventory.countAmount}</Text>
          </Text>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.inventory.totalType)}{' '}
            <Text style={styles.textValue}>{inventory.countMaterial}</Text>
          </Text>
          <Text style={styles.textLabel}>
            {language.t(languageKeys.materialAsset.inventory.code)}{' '}
            <Text style={styles.textValue}>{inventory.code}</Text>
          </Text>
        </View>
      </View>
    </ItemCard>
  );
};

export default InventoryCard;

const styles = StyleSheet.create({
  textLabel: {
    ...globalStyles.text16Bold,
  },
  textValue: {
    ...globalStyles.text16Medium,
  },
});
