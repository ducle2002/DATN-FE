import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AUTHENTICATION_ROUTE from '@/modules/auth/auth.route';
import LoginScreen from '@/screens/authentication/login.screen';
import RegisterScreen from '@/screens/authentication/register.screen';

export type AuthenticationStackParamsList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator();

const AuthenticationStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AUTHENTICATION_ROUTE.LOGIN_SCREEN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AUTHENTICATION_ROUTE.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
