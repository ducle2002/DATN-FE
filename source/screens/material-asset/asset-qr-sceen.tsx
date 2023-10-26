import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScannerView from '@/components/scanner-view';

type Props = {};

const AssetQRScreen = (props: Props) => {
  return (
    <ScannerView>
      <Text>AssetQRScreen</Text>
    </ScannerView>
  );
};

export default AssetQRScreen;

const styles = StyleSheet.create({});
