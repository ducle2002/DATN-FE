import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  TLocalService,
  TServiceProperties,
} from '@/modules/local-service/local-service.model';
import ItemCard from '@/components/item-card.component';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/config/globalStyles';
import Icon from '@/components/icon.component';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LocalServiceStackParamsList} from '@/routes/local-service.stack';

type Props = {
  item: TLocalService;
  onPress: Function;
};

const ServiceItem = ({item, onPress}: Props) => {
  const navigation =
    useNavigation<NavigationProp<LocalServiceStackParamsList>>();
  const properties: TServiceProperties = JSON.parse(item.properties);
  return (
    <ItemCard onPress={() => onPress()}>
      <FastImage
        source={{uri: properties.storeInfo.imageUrl[0] ?? ''}}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.textName}>
          {item.name}
        </Text>
        <Text numberOfLines={1}>{properties.storeInfo.address?.trim()}</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon type="Ionicons" name="star" size={15} color="#FFDF00" />
          <Text>{item.countRate}</Text>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate('BOOKING_SCREEN', {storeId: item.id})
          }
          style={styles.newOrder}>
          <Text style={styles.textNewOrder}>{item.countNewOrder}</Text>
        </Pressable>
      </View>
    </ItemCard>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  textName: {
    ...globalStyles.text16Medium,
  },
  textAddress: {
    ...globalStyles.text15Regular,
  },
  newOrder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#64C6DD',
    alignSelf: 'flex-end',
  },
  textRate: {
    ...globalStyles.text13Medium,
  },
  textNewOrder: {
    ...globalStyles.text14Bold,
  },
});
