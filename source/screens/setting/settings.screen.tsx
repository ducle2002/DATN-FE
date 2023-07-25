import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = StackScreenProps<AppStackParamsList, 'SETTING_SCREEN'>;

const SettingScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>SettingScreen</Text>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
