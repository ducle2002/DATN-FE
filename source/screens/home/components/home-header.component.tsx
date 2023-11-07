import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from '@/components/icon.component';
import {HomeScreenProps} from '../home.screen';
import {Avatar} from 'react-native-paper';
import {useAppSelector} from '@/hooks/redux.hook';
import globalStyles from '@/config/globalStyles';
import BackgroundHeader from '@/components/background-header.component';
import {useToast} from 'react-native-toast-notifications';
const {height} = Dimensions.get('screen');

const HomeHeader = ({navigation}: HomeScreenProps) => {
  const {imageUrl, fullName} = useAppSelector(state => state.user);
  const toast = useToast();
  return (
    <BackgroundHeader>
      <View style={styles.contentContainer}>
        <View style={styles.headerIconContainer}>
          <Icon
            type="Ionicons"
            name="notifications"
            size={30}
            color={'white'}
            style={styles.icon}
            onPress={() => toast.show('Chức năng đang phát triển')}
          />
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar.Image source={{uri: imageUrl}} size={72} />
          <View style={styles.textContainer}>
            <Text style={styles.textWelcome}>Welcome</Text>
            <Text style={styles.textName}>{fullName}</Text>
          </View>
        </View>
      </View>
    </BackgroundHeader>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.2,
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
  },
  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
