import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TMaterialAsset} from '@/screens/material-asset/services/material-asset.model';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import FastImage from 'react-native-fast-image';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  item: TMaterialAsset;
  navigation: //  CompositeNavigationProp<
  // MaterialTopTabNavigationProp<MaterialTabParamsList, 'LIST'>,
  StackNavigationProp<MaterialAssetStackParamsList, 'MAIN_SCREEN'>;
  onPress: () => void;
};

const MaterialCard = ({item, onPress}: Props) => {
  return (
    <ItemCard onPress={onPress}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            backgroundColor: '#dbdbdb',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <FastImage
            style={{height: '100%', aspectRatio: 1}}
            source={{uri: item.imageUrl}}
          />
        </View>
        {item.status && (
          <View style={styles.tag}>
            <Text style={styles.textTag}>{item.status}</Text>
          </View>
        )}
        <View style={{marginLeft: 10}}>
          <Text style={styles.textName}>{item.materialName}</Text>
          <Text style={styles.textCode}>{item.materialCode}</Text>
          <Text style={styles.textProducer}>{item.producerName}</Text>
        </View>
      </View>
    </ItemCard>
  );
};

export default MaterialCard;

const styles = StyleSheet.create({
  tag: {
    borderRadius: 10,
    backgroundColor: '#235195',
    position: 'absolute',
    right: 0,
    padding: 2,
    paddingHorizontal: 5,
  },
  textTag: {
    ...globalStyles.text12Bold,
    color: 'white',
  },
  textName: {
    ...globalStyles.text15Bold,
  },
  textProducer: {
    ...globalStyles.text15Medium,
  },
  textCode: {
    ...globalStyles.text13Medium,
  },
});
