import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import HomeIcon from './home-icon.components';
import {TPermission} from 'types/type';
import {languageKeys} from '@/config/language/language';
import globalStyles from '@/config/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamsList} from '@/routes/app.stack';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  type: TPermission;
  iconContainerStyle?: ViewStyle;
};

const HomeFunction = ({type, style, iconContainerStyle, ...props}: Props) => {
  const navigation = useNavigation<NavigationProp<AppStackParamsList>>();
  const {t} = useTranslation();

  const toast = useToast();

  const onPress = () => {
    switch (type) {
      case 'Pages.Management.Digital.Notices':
        return navigation.navigate('NOTIFICATION_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.Management.Citizens.Reflects':
        return navigation.navigate('FEEDBACK_STACK', {
          screen: 'FeedBackScreen',
          params: {},
        });
      case 'Pages.Management.ChatCitizen':
        return navigation.navigate('CHAT_STACK', {
          screen: 'ChatScreen',
          params: {},
        });
      case 'Pages.Management.Citizens.Vote':
        return navigation.navigate('VOTE_STACK', {screen: 'MAIN_PAGE'});
      case 'Pages.Administrative':
        return navigation.navigate('ADMINISTRATIVE_STACK', {
          screen: 'AdministrativeScreen',
          params: {},
        });
      case 'Pages.Services.Local_Amenities.Create_Store':
        return navigation.navigate('LOCAL_SERVICE_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.Management.Question_Answer':
        return navigation.navigate('QUESTION_ANSWER_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.SmartCommunity.OperationManagement.Material':
        return navigation.navigate('MATERIAL_ASSET_STACK', {
          screen: 'MAIN_SCREEN',
          params: {type: 'Pages.SmartCommunity.OperationManagement.Material'},
        });
      case 'Pages.SmartCommunity.OperationManagement.MaterialCategory': {
        return navigation.navigate('MATERIAL_ASSET_STACK', {
          screen: 'CATEGORY_MANAGEMENT',
        });
      }
      case 'Pages.Residents.Verification':
        return navigation.navigate('RESIDENT_STACK');
      default:
        toast.show('Chức năng đang phát triển');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      {...props}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <HomeIcon type={type} />
      </View>
      <Text style={styles.text}>{t(languageKeys[type])}</Text>
    </TouchableOpacity>
  );
};

export default HomeFunction;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#2874CE',
    borderRadius: 20,
    width: 60,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  text: {
    ...globalStyles.text13SemiBold,
    marginTop: 5,
    textAlign: 'center',
  },
});
