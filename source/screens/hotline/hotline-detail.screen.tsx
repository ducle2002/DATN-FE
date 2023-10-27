import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HotlineStackParamsList} from '@/routes/hotline.stack';
import {THotlineProperty} from './services/hotline.model';

type Props = StackScreenProps<HotlineStackParamsList, 'DETAIL'>;

const HotlineDetailScreen = ({navigation, route}: Props) => {
  const hotline = route.params.hotline;
  const properties: THotlineProperty[] = JSON.parse(hotline.properties);
  return (
    <View>
      <Text>HotlineDetailScreen</Text>
    </View>
  );
};

export default HotlineDetailScreen;

const styles = StyleSheet.create({});
