import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const CollapsableContainer = ({
  children,
  expanded,
  containerStyle,
  style,
}: {
  children: React.ReactNode;
  expanded: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded]);
  return (
    <Animated.View
      style={[collapsableStyle, {overflow: 'hidden'}, containerStyle]}>
      <View style={{position: 'absolute', ...style}} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export default CollapsableContainer;

const styles = StyleSheet.create({});
