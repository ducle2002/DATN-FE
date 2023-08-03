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
import {TFeedback} from '@/modules/feedback/feedback.model';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from '@/components/icon.component';
const {width} = Dimensions.get('screen');
type Props = {
  item: TFeedback;
  onPress: (event: GestureResponderEvent) => void;
};
const ItemFeedback = ({item, onPress}: Props) => {
  const rightSwipeActions = () => {
    return item.state !== 4 && item.state !== 5 && item.state !== 3 ? (
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 8,
        }}>
        {item.state === 1 ||
        item.state === 6 ||
        item.state === 7 ||
        item.state === 8 ? (
          <Pressable>
            <View style={styles.btnSwipe}>
              <Icon
                type="FontAwesome"
                name="mail-forward"
                size={20}
                color="#4AC3FB"
              />
              <Text style={styles.txtBtnSwipe}>Phân công</Text>
            </View>
          </Pressable>
        ) : null}
        {item.state === 1 ||
        item.state === 6 ||
        item.state === 7 ||
        item.state === 8 ? (
          <Pressable>
            <View style={styles.btnSwipe}>
              <Icon
                type="MaterialCommunityIcons"
                name="account-arrow-right"
                size={22}
                color="#4AC3FB"
              />
              <Text style={styles.txtBtnSwipe}>Tiếp nhận</Text>
            </View>
          </Pressable>
        ) : null}
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
            <Text style={styles.txtBtnSwipe}>Xóa</Text>
          </View>
        </Pressable>
      </View>
    ) : (
      <View />
    );
  };
  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      containerStyle={{marginBottom: 10}}
      enabled={item.state !== 4 && item.state !== 5 && item.state !== 3}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <FastImage source={{uri: item.imageUrl}} style={styles.image} />
        <View
          style={{
            paddingLeft: '2%',
          }}>
          <Text>Tên: {item.fullName ?? 'Đang cập nhật'}</Text>
          <Text>Phản ánh: {item.name}</Text>
          <Text
            numberOfLines={1}
            style={{
              maxWidth: width * 0.7,
            }}>
            Nội dung: {item.data}
          </Text>
        </View>
        <Text style={styles.txtDate}>
          {moment(item.creationTime).format('DD/MM/YY hh:mm')}
        </Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.txtBadge}>
            {item.countUnreadComment < 99 ? item.countUnreadComment : 99}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemFeedback;

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
    backgroundColor: 'white',
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
});
