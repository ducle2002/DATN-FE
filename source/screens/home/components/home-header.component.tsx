import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Icon from '@/components/icon.component';
import {HomeScreenProps} from '../home.screen';
import {Avatar, Badge} from 'react-native-paper';
import {useAppSelector} from '@/hooks/redux.hook';
import globalStyles from '@/config/globalStyles';
import BackgroundHeader from '@/components/background-header.component';
import {useGetNumberUnread} from '@/screens/notification/services/hook';

const HomeHeader = ({navigation}: HomeScreenProps) => {
  const {imageUrl, fullName} = useAppSelector(state => state.user);
  const {height} = useWindowDimensions();
  useGetNumberUnread();
  const {unreadCount} = useAppSelector(state => state.notification);
  return (
    <BackgroundHeader>
      <View style={[styles.contentContainer, {height: height * 0.12}]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Avatar.Image source={{uri: imageUrl}} size={72} />
          <View style={styles.textContainer}>
            <Text style={styles.textWelcome}>Welcome</Text>
            <Text style={styles.textName}>{fullName}</Text>
          </View>
        </View>
        <View style={styles.headerIconContainer}>
          <Pressable onPress={() => navigation.navigate('NOTIFICATION')}>
            <Icon
              type="Ionicons"
              name="notifications"
              size={30}
              color={'white'}
              style={styles.icon}
            />
            {unreadCount > 0 && (
              <Badge style={{position: 'absolute'}}>{unreadCount}</Badge>
            )}
          </Pressable>
          <Icon
            type="Ionicons"
            name="qr-code-outline"
            size={30}
            color={'white'}
            style={styles.icon}
            onPress={() => navigation.navigate('CAMERA_SCREEN')}
          />
          <Icon
            type="Ionicons"
            name="settings-sharp"
            size={30}
            color={'white'}
            style={styles.icon}
            onPress={() => {
              navigation.navigate('SETTING_SCREEN');
            }}
          />
        </View>
      </View>
    </BackgroundHeader>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  headerIconContainer: {
    flexDirection: 'row',
  },
  icon: {
    padding: 5,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  textWelcome: {
    ...globalStyles.text17SemiBold,
    color: 'white',
    lineHeight: 30,
  },
  textName: {
    ...globalStyles.text16Medium,
    color: 'white',
  },
});
