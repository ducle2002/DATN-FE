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
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from '@/components/icon.component';
import {Divider} from 'react-native-paper';

const {width: sWidth, height: sHeight} = Dimensions.get('screen');

export type TOptionItem = {
  label: string;
  id?: any;
  hint?: string;
};

type Props = React.ComponentProps<typeof View> & {
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
  preLabel?: string;
};

const SelectTimes = ({
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
  preLabel,
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
          {backgroundColor: !pressed ? 'white' : '#f8f8f8'},
        ]}
        onPress={() => {
          onSelected(item.id);
          toggleIsVisible();
        }}>
        <View style={[styles.itemOption]}>
          <Text style={[styles.itemLabelText, itemLabelStyle]}>
            {preLabel}
            {item.label}
          </Text>
          <Text style={[styles.hint]}>{item.hint}</Text>
        </View>

        <Divider />
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
        {rotate: interpolate(sharedValue.value, [0, 1], [0, 180]) + 'deg'},
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
      <View style={[styles.inputContainer, inputContainer]}>
        <View style={[{alignItems: 'center'}]}>
          <Text style={[styles.textValue, valueStyle]}>
            {selectedLabel ? (
              <Text>
                {'Lượt thực hiện: '}
                <Text style={{color: '#2E9BFF'}}>{selectedLabel}</Text>
              </Text>
            ) : (
              <Text style={{color: placeholderTextColor}}>{placeholder}</Text>
            )}
          </Text>
          {options?.find(val => val.label === selectedLabel)?.hint && (
            <Text style={[styles.hint]}>
              {options.find(val => val.label === selectedLabel)?.hint}
            </Text>
          )}
        </View>

        <Animated.View style={animatedStyle}>
          <Icon type="Ionicons" name="chevron-down-outline" size={20} />
        </Animated.View>
      </View>
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

export default memo(SelectTimes);

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
    maxHeight: 300,
    minWidth: 0.4 * sWidth,
  },
  itemOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemLabelText: {
    ...globalStyles.text14Medium,
  },
  hint: {
    fontSize: 12,
    paddingTop: 4,
    color: 'gray',
  },
});
