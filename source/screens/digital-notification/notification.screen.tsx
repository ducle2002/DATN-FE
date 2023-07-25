import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainHeader from './components/main-header.component';
import Button from '@/components/button.component';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';

type Props = StackScreenProps<NotificationStackParamsList, 'MAIN_SCREEN'>;

const NotificationScreen = ({navigation}: Props) => {
  return (
    <View>
      <MainHeader />
      <Button
        onPress={() => {
          navigation.navigate('CREATE_SCREEN', {});
        }}>
        <Text>Tao bai</Text>
      </Button>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
