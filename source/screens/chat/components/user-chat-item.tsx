import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {TUserChat} from '@/modules/chat/chat.model';
import AvatarImage from '@/components/avatar-image';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ChatStackParamsList} from '@/routes/chat.stack';
const {width} = Dimensions.get('screen');
type Props = {
  data: TUserChat;
  organizationUnitId: number;
};
const UserChatItem = ({data, organizationUnitId}: Props) => {
  const navigation = useNavigation<NavigationProp<ChatStackParamsList>>();
  const today = moment.now();

  const checkTypeLastMess = () => {
    if (!data.lastMessage?.message) {
      return 'Bắt đâu nhắn tin';
    }
    switch (data.lastMessage.typeMessage) {
      case 1:
        return data.lastMessage?.message;
      case 5:
        return '[Hình ảnh]';
      case 2:
        return '[Hình ảnh]';
      case 4:
        return '[Tệp tin]';
      default:
        return data.lastMessage?.message;
    }
  };
  const getTime = () => {
    const dayMess = moment(data.lastMessage?.creationTime);
    const days = dayMess.diff(today, 'days');
    if (days) {
      return moment(data.lastMessage?.creationTime).format(
        days < -365 ? 'DD/MM/YYYY' : 'DD/MM',
      );
    } else {
      const hours = dayMess.diff(today, 'hours');
      if (hours) {
        return `${-hours} giờ`;
      }
      const minutes = dayMess.diff(today, 'minutes');
      return minutes ? `${-minutes} phút` : 'Bây giờ';
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('ChatboxScreen', {
          userChat: data,
          organizationUnitId: organizationUnitId,
        });
      }}>
      <AvatarImage
        source={
          data?.friendProfilePictureId
            ? {uri: data.friendProfilePictureId}
            : require('@assets/images/login.background.png')
        }
        size={52}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{data.friendUserName}</Text>
        <Text
          style={[
            styles.lastMess,
            {
              fontWeight: data.unreadMessageCount ? '500' : '300',
            },
          ]}>
          {checkTypeLastMess()}
        </Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.txtDate}>{getTime()}</Text>
      </View>
      {!!data.unreadMessageCount && (
        <View style={styles.bagde}>
          <Text style={styles.txtBagde}>
            {data.unreadMessageCount > 99 ? '99+' : data.unreadMessageCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default UserChatItem;

const styles = StyleSheet.create({
  bagde: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderRadius: 100,
    width: width * 0.07,
    aspectRatio: 1,
    backgroundColor: '#9d0208',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBagde: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    borderBottomWidth: 1,
    borderColor: '#DADADA',
  },
  content: {
    paddingLeft: '3%',
    justifyContent: 'space-around',
    paddingVertical: '2%',
  },
  date: {
    position: 'absolute',
    right: width * 0.03,
    top: width * 0.03,
  },
  txtDate: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  name: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },
  lastMess: {
    fontSize: 13,
    color: '#333',
  },
});
