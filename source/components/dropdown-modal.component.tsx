import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import globalStyles from '@/config/globalStyles';
import Icon from './icon.component';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Searchbar} from 'react-native-paper';

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
  useClear?: boolean;
  iconCustom?: React.ReactNode;
  degAnimation?: number;
};

const DropdownModal = ({
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
  iconCustom,
  degAnimation = 90,
  useClear = false,
  ...props
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const renderItemOption: ListRenderItem<TOptionItem> = ({item}) => {
    return (
      <Pressable
        style={({pressed}) => [
          styles.itemOption,
          {
            backgroundColor:
              selectedLabel === item.label
                ? '#f1f2f8'
                : !pressed
                ? 'white'
                : '#f8f8f8',
          },
        ]}
        onPress={() => {
          onSelected(item.id);
          toggleIsVisible();
        }}>
        <Text style={[styles.itemLabelText, itemLabelStyle]}>{item.label}</Text>
      </Pressable>
    );
  };

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
        {
          rotate:
            interpolate(sharedValue.value, [0, 1], [0, degAnimation]) + 'deg',
        },
      ],
      marginLeft: 10,
    };
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <Pressable
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
        {selectedLabel && useClear && (
          <Icon
            type="Ionicons"
            name="close"
            size={20}
            color={'#ababab'}
            onPress={() => {
              onSelected(undefined);
            }}
          />
        )}
        <Text style={[styles.textValue, valueStyle]}>
          {selectedLabel ? (
            selectedLabel
          ) : (
            <Text style={{color: placeholderTextColor}}>{placeholder}</Text>
          )}
        </Text>
        <Animated.View style={animatedStyle}>
          {iconCustom ? (
            iconCustom
          ) : (
            <Icon type="Ionicons" name="chevron-down-outline" size={20} />
          )}
        </Animated.View>
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
      <ReactNativeModal
        useNativeDriverForBackdrop
        statusBarTranslucent={true}
        backdropOpacity={0.2}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        swipeDirection={'down'}
        onBackdropPress={toggleIsVisible}
        isVisible={isVisible}
        style={{margin: 0}}>
        <Pressable
          onPress={toggleIsVisible}
          style={{
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <View style={{backgroundColor: 'white', paddingBottom: '5%'}}>
            <FlatList
              style={styles.listOption}
              data={options.filter(el => el.label.includes(searchQuery))}
              renderItem={renderItemOption}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </Pressable>
      </ReactNativeModal>
    </Pressable>
  );
};

export default memo(DropdownModal);

const styles = StyleSheet.create({
  container: {},
  textLabel: {
    ...globalStyles.text15Bold,
  },
  textValue: {
    ...globalStyles.text15Medium,
    marginRight: 'auto',
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
    maxHeight: 200,
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
