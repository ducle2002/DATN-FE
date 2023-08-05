import React from 'react';

import FeedbackScreen from '@/screens/feedback/feedback.screen';
import {createStackNavigator} from '@react-navigation/stack';
export type FeedbackStackParamsList = {
  FeedBackScreen: undefined;
};
const Stack = createStackNavigator<FeedbackStackParamsList>();

const FeedbackStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'FeedBackScreen'} component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export default FeedbackStack;
