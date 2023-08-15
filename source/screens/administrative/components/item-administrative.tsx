import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from '@/components/icon.component';
import {TAdministrativeOrder} from '@/modules/administrative/administrative.model';
import moment from 'moment';
import AdministrativeIcon from '@assets/icons/administrative.svg';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
const {width} = Dimensions.get('screen');
type Props = {
  item: TAdministrativeOrder;
  onPress: (event: GestureResponderEvent) => void;
};
const ItemAdministrative = ({item, onPress}: Props) => {
  const {t} = useTranslation();
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 8,
        }}>
        <Pressable
        //  onPress={onPressDelete}
        >
          <View style={styles.btnSwipe}>
            <Icon
              type="Ionicons"
              name="trash-outline"
              size={20}
              color="#bd1f36"
            />
            <Text style={styles.txtBtnSwipe}>
              {t(languageKeys.administrative.main.delete)}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      //   containerStyle={{marginBottom: 10}}
      enabled={item.state !== 4 && item.state !== 5 && item.state !== 3}>
      <TouchableOpacity style={styles.itemOrder} onPress={onPress}>
        <View style={styles.iconContainer}>
          <AdministrativeIcon width={24} height={24} />
        </View>
        <View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: '#2D2E31',
            }}
            numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 13,
              color: '#2D2E31',
            }}>
            {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemAdministrative;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2%',
    borderBottomWidth: 0.5,
    borderColor: '#DADADA',
    paddingHorizontal: '3%',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  txtDate: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 10,
    paddingRight: 10,
    fontSize: 12,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#9d0208',
    borderRadius: 16,
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBadge: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  btnSwipe: {
    // backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  txtBtnSwipe: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  iconContainer: {
    backgroundColor: '#2874CE',
    borderRadius: 20,
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
  },
  itemOrder: {
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    backgroundColor: 'white',
    marginBottom: '3%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
