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
      case 'Pages.Digitals.Notifications.GetAll':
        return navigation.navigate('NOTIFICATION_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.Digitals.Reflects.GetAll':
        return navigation.navigate('FEEDBACK_STACK', {
          screen: 'FeedBackScreen',
          params: {},
        });
      case 'Pages.Digitals.Communications':
        return navigation.navigate('CHAT_STACK', {
          screen: 'ChatScreen',
          params: {},
        });
      case 'Pages.Digitals.Surveys.GetAll':
        return navigation.navigate('VOTE_STACK', {screen: 'MAIN_PAGE'});
      case 'Pages.AdministrationService.Configurations':
        return navigation.navigate('ADMINISTRATIVE_STACK', {
          screen: 'AdministrativeScreen',
          params: {},
        });
      case 'Pages.LocalAmenities.List':
        return navigation.navigate('LOCAL_SERVICE_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.Digitals.QnA.GetAll':
        return navigation.navigate('QUESTION_ANSWER_STACK', {
          screen: 'MAIN_SCREEN',
        });
      case 'Pages.Assets.AssetCatalog.GetAll':
        return navigation.navigate('MATERIAL_ASSET_STACK', {
          screen: 'MAIN_SCREEN',
          params: {type: 'Pages.SmartCommunity.OperationManagement.Material'},
        });
      case 'Pages.Assets.AssetParameters.GetAll': {
        return navigation.navigate('MATERIAL_ASSET_STACK', {
          screen: 'CATEGORY_MANAGEMENT',
        });
      }
      case 'Pages.Citizen.Verifications.GetAll':
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
      <Text style={styles.text}>{t(languageKeys[type] ?? '')}</Text>
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
