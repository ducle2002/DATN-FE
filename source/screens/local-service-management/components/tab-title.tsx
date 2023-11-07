import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
const TabTitle = ({name, focused}: {name: string; focused: boolean}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.tabTitle,
          color: focused ? '#339FD9' : '#2B5783',
          opacity: focused ? 1 : 0.5,
        }}>
        {name}
      </Text>
    </View>
  );
};
export default TabTitle;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  tabTitle: {
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    lineHeight: 16,
    fontSize: 14,
  },
});
