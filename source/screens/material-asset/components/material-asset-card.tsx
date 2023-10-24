import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TAssetDetail} from '@/screens/material-asset/services/material-asset.model';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from '@/components/icon.component';
import {useTheme} from 'react-native-paper';

type Props = {
  item: TAssetDetail;
  navigation: StackNavigationProp<MaterialAssetStackParamsList, 'MAIN_SCREEN'>;
  onPress: () => void;
};

const MaterialCard = ({item, onPress}: Props) => {
  const {colors} = useTheme();
  return (
    <ItemCard onPress={onPress}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            backgroundColor: colors.primaryContainer,
            borderRadius: 8,
            overflow: 'hidden',
            padding: 5,
          }}>
          {/* <FastImage
            style={{height: '100%', aspectRatio: 1}}
            source={{uri: item.imageUrl}}
          /> */}
          <Icon
            type="MaterialIcons"
            name="inventory"
            size={60}
            color={colors.onPrimary}
          />
        </View>
        {item.trangThaiText && (
          <View style={styles.tag}>
            <Text style={styles.textTag}>{item.trangThaiText}</Text>
          </View>
        )}
        <View style={{marginLeft: 10, flex: 1}}>
          <Text style={styles.textName}>{item.title}</Text>
          <Text style={styles.textCode}>{item.code}</Text>
          <Text style={styles.textProducer}>{item.nhomTaiSanText}</Text>
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
    bottom: 0,
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
