import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FilterWork from './components/filter';

type Props = {};

const ManagementScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <FilterWork />
    </View>
  );
};

export default ManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
