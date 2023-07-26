import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import Button from '@/components/button.component';
import {useLogout} from '@/modules/auth/auth.hook';

type Props = StackScreenProps<AppStackParamsList, 'SETTING_SCREEN'>;

const SettingScreen = ({navigation}: Props) => {
  const {logout} = useLogout();
  return (
    <View>
      <Button
        onPress={() => {
          logout();
        }}>
        <Text>SettingScreen</Text>
      </Button>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
