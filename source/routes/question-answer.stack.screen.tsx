import DetailScreen from '@/screens/question-answer/detail.screen';
import MainScreen from '@/screens/question-answer/main.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
export type QAStackParamsList = {
  MAIN_SCREEN: undefined;
  DETAIL_SCREEN: {id: number};
};

const Stack = createStackNavigator<QAStackParamsList>();

const QAStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="MAIN_SCREEN" component={MainScreen} />
      <Stack.Screen name="DETAIL_SCREEN" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default QAStack;
