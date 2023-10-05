import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const FilterWork = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>FilterWork</Text>
    </View>
  );
};

export default FilterWork;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f8',
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
