import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useLogout} from '@/screens/authentication/services/auth.hook';
import Icon from '@/components/icon.component';
import {SettingStackParamsList} from '@/routes/settings.stack';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
import {useAppDispatch} from '@/hooks/redux.hook';
import {resetRole} from '../role/service/role.slice';

type Props = StackScreenProps<SettingStackParamsList, 'SettingScreen'>;

const SettingScreen = ({navigation}: Props) => {
  const {logout} = useLogout();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const func_setting = [
    {
      name: t(languageKeys.setting.main.role),
      icon: <Icon type="Entypo" name="cycle" color={'#2B5783'} size={24} />,
      onPress: () => {
        dispatch(resetRole());
      },
    },
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
      onPress: () => logout(),
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
});
