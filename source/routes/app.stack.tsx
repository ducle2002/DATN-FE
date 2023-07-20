import HomeScreen from '@/screens/home/home.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
