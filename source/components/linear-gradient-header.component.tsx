import React from 'react';
import {StackHeaderProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  headerProps: StackHeaderProps;
  children: React.ReactNode;
};
const LinearGradientHeader = ({children}: Props) => {
  return (
    <LinearGradient colors={['#65B5FF', '#0E3394']}>
      <SafeAreaView edges={['top']} style={{paddingBottom: 10}}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LinearGradientHeader;
