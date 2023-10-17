import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from '@/screens/setting/settings.screen';
import LanguageScreen from '@/screens/setting/language.screen';
import ChangePasswordScreen from '@/screens/setting/change-password';
import {languageKeys} from '@/config/language/language';
import {useTranslation} from 'react-i18next';
export type SettingStackParamsList = {
  SettingScreen: undefined;
  LanguageScreen: undefined;
  ChangePasswordScreen: undefined;
};
const Stack = createStackNavigator<SettingStackParamsList>();

const SettingStack = () => {
  const language = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name={'SettingScreen'}
        component={SettingScreen}
        options={{
          title: language.t(languageKeys.setting.main.title),
        }}
      />
      <Stack.Screen
        name={'LanguageScreen'}
        component={LanguageScreen}
        options={{
          title: language.t(languageKeys.setting.main.language),
        }}
      />
      <Stack.Screen
        name={'ChangePasswordScreen'}
        component={ChangePasswordScreen}
        options={{
          title: language.t(languageKeys.setting.main.security),
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
