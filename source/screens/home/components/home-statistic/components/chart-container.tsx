import {ImageBackground, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
};

const ChartContainer = ({children, containerStyle}: Props) => {
  return (
    <ImageBackground
      style={[containerStyle, {borderRadius: 10, overflow: 'hidden'}]}
      source={require('@assets/images/chart-background.png')}>
      {children}
    </ImageBackground>
  );
};

export default ChartContainer;
