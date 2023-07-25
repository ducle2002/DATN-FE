import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MainHeader from './components/main-header.component';
import OrganizationApi from '@/modules/organization/organization.service';

const NotificationScreen = () => {
  return (
    <View>
      <MainHeader />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
