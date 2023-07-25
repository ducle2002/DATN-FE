import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/screens/authentication/login.screen';
import RegisterScreen from '@/screens/authentication/register.screen';

export type AuthenticationStackParamsList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<AuthenticationStackParamsList>();

const AuthenticationStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
