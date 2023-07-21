import {APP_ROUTE} from '@/config/constants/app.route';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '@/screens/home/home.screen';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={APP_ROUTE.HOME_SCREEN}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
