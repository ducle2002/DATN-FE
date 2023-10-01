import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {WorkManagementDrawerParamsList} from '@/routes/work-management.stack';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = CompositeScreenProps<
  DrawerScreenProps<WorkManagementDrawerParamsList, 'MANAGEMENT'>,
  StackScreenProps<AppStackParamsList, 'WORK_MANAGEMENT'>
>;

const AssignmentScreen = ({navigation}: Props) => {
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({title: 'Assignment'});
  }, [navigation]);
  return (
    <View>
      <Text>AssignmentScreen</Text>
    </View>
  );
};

export default AssignmentScreen;

const styles = StyleSheet.create({});
