import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
};

const AddNotifications = ({isVisible, onBackdropPress}: Props) => {
  return (
    <ReactNativeModal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View>
        <Text>AddNotifications</Text>
      </View>
    </ReactNativeModal>
  );
};

export default AddNotifications;

const styles = StyleSheet.create({});
