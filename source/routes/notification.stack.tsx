import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationScreen from '@/screens/digital-notification/notification.screen';
import CreateNotificationScreen from '@/screens/digital-notification/create.screen';
import {TDigitalNoti} from '@/screens/digital-notification/services/digital-noti.model';
import language, {languageKeys} from '@/config/language/language';
import DetailScreen from '@/screens/digital-notification/detail.screen';
import ListCommentScreen from '@/screens/digital-notification/list-comments.screen';

export type NotificationStackParamsList = {
  MAIN_SCREEN: undefined;
  DETAIL_SCREEN: {noti: TDigitalNoti};
  CREATE_SCREEN: {noti?: TDigitalNoti};
  LIST_COMMENT_SCREEN: {id: number};
};

const Stack = createStackNavigator<NotificationStackParamsList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MAIN_SCREEN"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CREATE_SCREEN"
        component={CreateNotificationScreen}
        options={({route}) => ({
          title: language.t(
            route.params?.noti
              ? languageKeys.digitalNoti.header.edit
              : languageKeys.digitalNoti.header.create,
          ),
        })}
      />
      <Stack.Screen name="DETAIL_SCREEN" component={DetailScreen} />
      <Stack.Screen
        name="LIST_COMMENT_SCREEN"
        component={ListCommentScreen}
        options={{
          headerTitle: language.t(languageKeys.digitalNoti.header.comment),
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
