import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useLogout} from '@/screens/authentication/services/auth.hook';
import Icon from '@/components/icon.component';
import {SettingStackParamsList} from '@/routes/settings.stack';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
import {Button, Dialog} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';

type Props = StackScreenProps<SettingStackParamsList, 'SettingScreen'>;

const SettingScreen = ({navigation}: Props) => {
  const {logout} = useLogout();
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const func_setting = [
    {
      name: t(languageKeys.setting.main.language),
      icon: (
        <Icon type="Ionicons" name="earth-sharp" color={'#2B5783'} size={24} />
      ),
      onPress: () => navigation.navigate('LanguageScreen'),
    },
    {
      name: t(languageKeys.setting.main.security),
      icon: (
        <Icon type="Ionicons" name="lock-open" color={'#2B5783'} size={24} />
      ),
      onPress: () => navigation.navigate('ChangePasswordScreen'),
    },
    {
      name: t(languageKeys.setting.main.logOut),
      icon: (
        <Icon type="Ionicons" name="power-sharp" color={'#2B5783'} size={24} />
      ),
      onPress: () => setIsVisible(true),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      {func_setting.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderTopWidth: index !== 0 ? 3 : 6,
              borderBottomWidth: index !== func_setting.length - 1 ? 3 : 6,
              borderColor: '#f1f2f8',
            }}
            onPress={() => {
              item.onPress();
            }}>
            <View style={styles.btnicon}>{item.icon}</View>
            <Text style={styles.txtLabel}>{item.name}</Text>
            <Icon
              type="Ionicons"
              name="chevron-forward"
              style={{marginLeft: 'auto'}}
              color={'#2B5783'}
            />
          </Pressable>
        );
      })}
      <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
        <Dialog.Title>
          <Text style={[styles.textValue, {flex: 0}]}>
            Bạn có muốn đăng xuất không
          </Text>
        </Dialog.Title>
        <Dialog.Actions>
          <Button
            mode="contained-tonal"
            style={styles.button}
            onPress={() => setIsVisible(false)}>
            {t(languageKeys.shared.button.cancel)}
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              logout();
            }}>
            {t(languageKeys.shared.button.logout)}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
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
  textLabel: {
    flex: 1,
    ...globalStyles.text16Medium,
  },
  textValue: {
    flex: 1,
    ...globalStyles.text16Bold,
  },
  button: {
    paddingHorizontal: 10,
    marginLeft: 20,
  },
});
