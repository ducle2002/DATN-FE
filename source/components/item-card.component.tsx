import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

type Props = React.ComponentProps<typeof View> & {
  containerStyle?: ViewStyle | Array<ViewStyle>;
  onPress?: Function;
  onLongPress?: Function;
  isSelected?: boolean;
};

const ItemCard = ({
  children,
  containerStyle,
  style,
  onPress = () => {},
  onLongPress = () => {},
  isSelected = false,
  ...props
}: Props) => {
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      onLongPress={() => {
        onLongPress();
      }}
      style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: !isSelected ? 'white' : '#f1f2f8'},
          style,
        ]}
        {...props}>
        {isSelected && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <RadioButton.Android value={''} status="checked" />
          </Animated.View>
        )}
        <Animated.View style={{flexDirection: 'row', flex: 1}}>
          {children}
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 1,
    },
    borderRadius: 20,
  },
});
export default ItemCard;
