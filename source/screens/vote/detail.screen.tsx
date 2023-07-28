import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomContainer from '@/components/bottom-container.component';

type Props = {};

const DetailScreen = (props: Props) => {
  return (
    <View>
      <ScrollView>
        <Text>DetailScreen</Text>
      </ScrollView>
      <BottomContainer />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
