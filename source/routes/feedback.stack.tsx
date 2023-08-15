import React from 'react';

import FeedbackScreen from '@/screens/feedback/feedback.screen';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import CreateFeedbackScreen from '@/screens/feedback/create-feedback.screen';
import ChatFeedbackScreen from '@/screens/feedback/chat-feedback.screen';
import {TFeedback} from '@/modules/feedback/feedback.model';
import AssignFeeadbackScreen from '@/screens/feedback/assign-feeadback.screen';
export type FeedbackStackParamsList = {
  FeedBackScreen: {};
  CreateFeedbackScreen: {};
  ChatFeedbackScreen: {
    inforFeedback: TFeedback;
  };
  AssignFeedbackScreen: {
    feedbackId: number;
  };
};
const Stack = createStackNavigator<FeedbackStackParamsList>();

const FeedbackStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'FeedBackScreen'} component={FeedbackScreen} />
      <Stack.Screen
        name={'CreateFeedbackScreen'}
        component={CreateFeedbackScreen}
      />
      <Stack.Screen
        name={'ChatFeedbackScreen'}
        component={ChatFeedbackScreen}
      />
      <Stack.Screen
        name={'AssignFeedbackScreen'}
        component={AssignFeeadbackScreen}
      />
    </Stack.Navigator>
  );
};

export default FeedbackStack;
