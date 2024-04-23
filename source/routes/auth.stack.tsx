import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/screens/authentication/login.screen';
import RegisterScreen from '@/screens/authentication/register.screen';
import PrivatePolicyScreen from '@/screens/authentication/private-policy.screen';
import {languageKeys} from '@/config/language/language';
import {useTranslation} from 'react-i18next';

export type AuthenticationStackParamsList = {
  LOGIN: undefined;
  REGISTER: undefined;
  PRIVACY: undefined;
};

const Stack = createStackNavigator<AuthenticationStackParamsList>();

const AuthenticationStack = (): JSX.Element => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="LOGIN"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="REGISTER"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PRIVACY"
        component={PrivatePolicyScreen}
        options={{
          title: t(languageKeys.auth.privacy.privacyPolicy),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
