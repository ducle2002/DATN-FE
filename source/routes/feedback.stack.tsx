import FeedbackScreen from '@/screens/feedback/feedback.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type FeedbackStackParamsList = {
  MAIN_SCREEN: undefined;
};

const Stack = createStackNavigator<FeedbackStackParamsList>();

const FeedbackStack = () => {
  return (
    <Stack.Navigator initialRouteName="MAIN_SCREEN">
      <Stack.Screen name="MAIN_SCREEN" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export default FeedbackStack;
