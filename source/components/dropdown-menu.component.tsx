import {
  Dimensions,
  FlatList,
  LayoutRectangle,
  ListRenderItem,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import globalStyles from '@/config/globalStyles';
import Icon from './icon.component';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width: sWidth} = Dimensions.get('screen');

export type TOptionItem = {
  label: string;
  id?: any;
};

type Props = React.ComponentProps<typeof View> & {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  options: Array<TOptionItem>;
  selectedLabel: string | undefined;
  placeholder?: string;
  placeholderTextColor?: string;
  itemLabelStyle?: StyleProp<TextStyle>;
  onSelected: Function;
  inputContainer?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
  disable?: boolean;
  labelContainerStyle?: StyleProp<ViewStyle>;
  error?: string;
};

const DropdownMenu = ({
  label,
  options,
  placeholder,
  selectedLabel,
  onSelected,
  labelStyle,
  itemLabelStyle,
  inputContainer,
  valueStyle,
  disable = false,
  placeholderTextColor,
  labelContainerStyle,
  error,
  ...props
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const [buttonPosition, setButtonPosition] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    y: 0,
    x: 0,
  });

  const renderItemOption: ListRenderItem<TOptionItem> = ({item}) => {
    return (
      <Pressable
        style={({pressed}) => [
          styles.itemOption,
          {backgroundColor: !pressed ? 'white' : '#f8f8f8'},
        ]}
        onPress={() => {
          onSelected(item.id);
          toggleIsVisible();
        }}>
        <Text style={[styles.itemLabelText, itemLabelStyle]}>{item.label}</Text>
      </Pressable>
    );
  };

  const ref = useRef<View | null>(null);

  ref.current?.measure((x, y, width, height, pageX, pageY) => {
    if (buttonPosition.x !== pageX || buttonPosition.y !== pageY) {
      setButtonPosition({
        height: height,
        width: width,
        x: pageX,
        y: pageY,
      });
    }
  });

  const sharedValue = useSharedValue(0);
  useEffect(() => {
    if (isVisible) {
      sharedValue.value = withTiming(1);
    } else {
      sharedValue.value = withTiming(0);
    }
  }, [isVisible, sharedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: interpolate(sharedValue.value, [0, 1], [0, 90]) + 'deg'},
      ],
      marginLeft: 10,
    };
  });

  return (
    <Pressable
      ref={ref}
      onPress={toggleIsVisible}
      style={[styles.container, props.style]}
      {...props}
      disabled={disable}>
      {label && (
        <View style={labelContainerStyle}>
          <Text style={[styles.textLabel, labelStyle]}>{label}</Text>
        </View>
      )}
      <View style={[styles.inputContainer, inputContainer]}>
        <Text style={[styles.textValue, valueStyle]}>
          {selectedLabel ? (
            selectedLabel
          ) : (
            <Text style={{color: placeholderTextColor}}>{placeholder}</Text>
          )}
        </Text>
        <Animated.View style={animatedStyle}>
          <Icon type="Ionicons" name="chevron-forward" size={20} />
        </Animated.View>
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
      <ReactNativeModal
        useNativeDriverForBackdrop
        statusBarTranslucent={true}
        backdropOpacity={0.2}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={toggleIsVisible}
        isVisible={isVisible}
        style={{margin: 0}}>
        <Pressable
          onPress={toggleIsVisible}
          style={{
            height: '100%',
          }}>
          <View
            style={{
              top: buttonPosition.height + buttonPosition.y,
              width: buttonPosition.width,
              left: buttonPosition.x,
            }}>
            <FlatList
              style={styles.listOption}
              data={options}
              renderItem={renderItemOption}
            />
          </View>
        </Pressable>
      </ReactNativeModal>
    </Pressable>
  );
};

export default memo(DropdownMenu);

const styles = StyleSheet.create({
  container: {},
  textLabel: {
    ...globalStyles.text15Bold,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  inputContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listOption: {
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 5,
    // maxHeight: '60%',
    minWidth: 0.4 * sWidth,
  },
  itemOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemLabelText: {
    ...globalStyles.text14Medium,
  },
  textError: {
    ...globalStyles.text12Medium,
    color: 'red',
  },
});
