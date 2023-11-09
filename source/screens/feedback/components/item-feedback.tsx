import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {forwardRef} from 'react';
import {TFeedback} from '@/modules/feedback/feedback.model';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from '@/components/icon.component';
import ThumbnailImage from '@/components/thumbnail-image';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
const {width} = Dimensions.get('screen');
type Props = {
  item: TFeedback;
  onPress: (event: GestureResponderEvent) => void;
  onDelete?: (event: GestureResponderEvent) => void;
  onAssign?: (event: GestureResponderEvent) => void;
  onConfirm?: (event: GestureResponderEvent) => void;
  onComplete?: (event: GestureResponderEvent) => void;
  closeRow?: () => void;
};
const ItemFeedback = forwardRef(function (
  {item, onPress, onDelete, onAssign, closeRow, onConfirm, onComplete}: Props,
  ref: React.LegacyRef<Swipeable>,
) {
  const {t} = useTranslation();
  const rightSwipeActions = () => {
    return item.state !== 4 && item.state !== 5 && item.state !== 3 ? (
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 8,
        }}>
        {item.state === 2 ? (
          <Pressable onPress={onAssign}>
            <View style={styles.btnSwipe}>
              <Icon
                type="FontAwesome"
                name="mail-forward"
                size={20}
                color="#4AC3FB"
              />
              <Text style={styles.txtBtnSwipe}>
                {t(languageKeys.feedback.main.itemFeedback.assign)}
              </Text>
            </View>
          </Pressable>
        ) : null}
        {item.state === 2 ? (
          <Pressable onPress={onComplete}>
            <View style={styles.btnSwipe}>
              <Icon
                type="Ionicons"
                name="checkmark-done-circle"
                size={20}
                color="#2b9348"
              />
              <Text style={styles.txtBtnSwipe}>
                {t(languageKeys.feedback.main.itemFeedback.complete)}
              </Text>
            </View>
          </Pressable>
        ) : null}
        {item.state === 1 ? (
          <Pressable onPress={onConfirm}>
            <View style={styles.btnSwipe}>
              <Icon
                type="MaterialCommunityIcons"
                name="account-arrow-right"
                size={22}
                color="#4AC3FB"
              />
              <Text style={styles.txtBtnSwipe}>
                {t(languageKeys.feedback.main.itemFeedback.agree)}
              </Text>
            </View>
          </Pressable>
        ) : null}
        <Pressable onPress={onDelete}>
          <View style={styles.btnSwipe}>
            <Icon
              type="Ionicons"
              name="trash-outline"
              size={20}
              color="#bd1f36"
            />
            <Text style={styles.txtBtnSwipe}>
              {t(languageKeys.feedback.main.itemFeedback.delete)}
            </Text>
          </View>
        </Pressable>
      </View>
    ) : (
      <View />
    );
  };

  return (
    <Swipeable
      ref={ref}
      friction={1}
      overshootFriction={8}
      leftThreshold={80}
      rightThreshold={40}
      renderRightActions={rightSwipeActions}
      onSwipeableOpen={closeRow}
      containerStyle={{marginBottom: 10}}
      enabled={item.state !== 4 && item.state !== 5 && item.state !== 3}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <ThumbnailImage
          source={{uri: item.imageUrl}}
          style={styles.image}
          size="100x100"
        />
        <View
          style={{
            paddingLeft: '2%',
          }}>
          <Text style={styles.txtNormal}>
            {t(languageKeys.feedback.main.itemFeedback.name)}:{' '}
            {item.fullName ?? 'Đang cập nhật'}
          </Text>
          <Text style={styles.txtNormal}>
            {t(languageKeys.feedback.main.itemFeedback.feedback)}: {item.name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.txtNormal,
              {
                maxWidth: width * 0.7,
              },
            ]}>
            {t(languageKeys.feedback.main.itemFeedback.content)}: {item.data}
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
});

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
  txtNormal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
