import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '@/screens/chat/chat.screen';
import ChatboxScreen from '@/screens/chat/chatbox.screen';
import {TUserChat} from '@/modules/chat/chat.model';
export type ChatStackParamsList = {
  ChatScreen: {};
  ChatboxScreen: {
    userChat: TUserChat;
    organizationUnitId: number;
  };
};
const Stack = createStackNavigator<ChatStackParamsList>();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'ChatScreen'} component={ChatScreen} />
      <Stack.Screen name={'ChatboxScreen'} component={ChatboxScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
