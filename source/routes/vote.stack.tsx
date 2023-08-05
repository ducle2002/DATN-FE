import language, {languageKeys} from '@/config/language/language';
import {TVote} from '@/modules/vote/vote.model';
import CreateScreen from '@/screens/vote/create.screen';
import DetailScreen from '@/screens/vote/detail.screen';
import MainPage from '@/screens/vote/vote.screen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type VoteStackParamsList = {
  MAIN_PAGE: undefined;
  DETAIL_SCREEN: {id: number};
  CREATE_SCREEN: {vote?: TVote};
};

const Stack = createStackNavigator<VoteStackParamsList>();

const VoteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        name="MAIN_PAGE"
        component={MainPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DETAIL_SCREEN"
        component={DetailScreen}
        options={{
          headerTitle: language.t(languageKeys.vote.header.detail),
        }}
      />
      <Stack.Screen name="CREATE_SCREEN" component={CreateScreen} />
    </Stack.Navigator>
  );
};

export default VoteStack;
