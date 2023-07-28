import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';

type Props = React.ComponentProps<typeof View> & {
  containerStyle?: ViewStyle | Array<ViewStyle>;
  onPress?: Function;
  onLongPress?: Function;
};

const ItemCard = ({
  children,
  containerStyle,
  style,
  onPress = () => {},
  onLongPress = () => {},
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
      <View style={[styles.contentContainer, style]} {...props}>
        {children}
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
    marginBottom: 20,
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
