import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from '@/screens/setting/settings.screen';
import LanguageScreen from '@/screens/setting/language.screen';
import ChangePasswordScreen from '@/screens/setting/change-password';
export type SettingStackParamsList = {
  SettingScreen: {};
  LanguageScreen: {};
  ChangePasswordScreen: {};
};
const Stack = createStackNavigator<SettingStackParamsList>();

const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'SettingScreen'} component={SettingScreen} />
      <Stack.Screen name={'LanguageScreen'} component={LanguageScreen} />
      <Stack.Screen
        name={'ChangePasswordScreen'}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;
