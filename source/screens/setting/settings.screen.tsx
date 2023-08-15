import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import Button from '@/components/button.component';
import {useLogout} from '@/modules/auth/auth.hook';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@/components/icon.component';
import {SettingStackParamsList} from '@/routes/settings.stack';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';

type Props = StackScreenProps<SettingStackParamsList, 'SettingScreen'>;

const SettingScreen = ({navigation}: Props) => {
  const {logout} = useLogout();
  const {t} = useTranslation();
  const func_setting = [
    {
      name: t(languageKeys.setting.main.language),
      icon: (
        <Icon type="Ionicons" name="earth-sharp" color={'#2B5783'} size={24} />
      ),
      type: 1,
    },
    {
      name: t(languageKeys.setting.main.security),
      icon: (
        <Icon type="Ionicons" name="lock-open" color={'#2B5783'} size={24} />
      ),
      type: 2,
    },
    {
      name: t(languageKeys.setting.main.aboutUs),
      icon: (
        <Icon
          type="Ionicons"
          name="information-circle"
          color={'#2B5783'}
          size={24}
        />
      ),
      type: 3,
    },
    {
      name: t(languageKeys.setting.main.logOut),
      icon: (
        <Icon type="Ionicons" name="power-sharp" color={'#2B5783'} size={24} />
      ),
      type: 4,
    },
  ];
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            type="Ionicons"
            name="chevron-back"
            size={24}
            color={'#2B5783'}
          />
        </Pressable>
        <Text style={styles.txtHeader}>
          {t(languageKeys.setting.main.title)}
        </Text>
        <View />
      </View>
      <View
        style={{
          paddingHorizontal: '5%',
        }}>
        {func_setting.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: '5%',
              }}
              onPress={() => {
                switch (item.type) {
                  case 1:
                    navigation.navigate('LanguageScreen', {});
                    return;
                  case 2:
                    navigation.navigate('ChangePasswordScreen', {});
                    return;
                  case 3:
                    return;
                  case 4:
                    logout();
                    break;
                  default:
                    return;
                }
              }}>
              <View style={styles.btnicon}>{item.icon}</View>
              <Text style={styles.txtLabel}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  btnicon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    backgroundColor: '#DBE4EA',
    borderRadius: 36,
  },
  txtLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2B5783',
    paddingLeft: '4%',
  },
});
