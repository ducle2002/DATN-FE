import {
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import NotificationService, {TNotification} from '../services/notification';
import {useTheme} from 'react-native-paper';
import moment from 'moment';
import globalStyles from '@/config/globalStyles';
import {useMutation, useQueryClient} from 'react-query';
type Props = {
  notification: TNotification;
  containerStyle?: StyleProp<ViewStyle>;
};

const NotificationItem = ({notification, containerStyle}: Props) => {
  const theme = useTheme();

  const queryClient = useQueryClient();

  const {mutate: readNotification} = useMutation({
    mutationFn: (params: {id: string}) =>
      NotificationService.readNotification(params),
    onSuccess: (_, params) => {
      queryClient.setQueryData(['notifications'], (old: any) => {
        return {
          ...old,
          pages:
            old?.pages?.map((page: any) => ({
              ...page,
              unreadCount: page?.unreadCount - 1,
              notifications:
                page?.notifications?.map((item: TNotification) =>
                  item.id !== params.id ? item : {...item, state: 1},
                ) ?? [],
            })) ?? [],
        };
      });
    },
  });

  const onPress = () => {
    try {
      Linking.openURL(notification.notification?.data?.detailUrlApp);
    } catch (error) {
      console.log(error);
    } finally {
      readNotification({id: notification.id});
    }
  };

  const {width} = useWindowDimensions();

  return (
    <Pressable onPress={onPress} style={[{width: width - 32}, containerStyle]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              notification.state === 0
                ? theme.colors.secondaryContainer
                : 'white',
            borderColor:
              notification.state === 0
                ? theme.colors.secondaryContainer
                : '#f1f2f8',
          },
        ]}>
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle}>
            {notification.notification?.notificationName}
          </Text>
          <Text style={{...styles.textContent}} numberOfLines={3}>
            {notification.notification.data?.message}
          </Text>
          <Text style={{...styles.textContent, fontSize: 10}}>
            {moment().diff(
              moment(notification.notification.creationTime),
              'hour',
            ) < 5
              ? moment(notification.notification.creationTime).fromNow()
              : moment(notification.notification.creationTime).format(
                  'HH:mm DD-MM-YYYY',
                )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
  },
  textContent: {
    ...globalStyles.text14Medium,
  },
  textTitle: {
    ...globalStyles.text15Medium,
  },
});
