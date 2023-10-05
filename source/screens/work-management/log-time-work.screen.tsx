import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import language, {languageKeys} from '@/config/language/language';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
type Props = StackScreenProps<WorkStackParamsList, 'LOGTIME'>;
const LogTimeWorkScreen = ({route, navigation}: Props) => {
  return <View>{}</View>;
};

export default LogTimeWorkScreen;

const styles = StyleSheet.create({});
