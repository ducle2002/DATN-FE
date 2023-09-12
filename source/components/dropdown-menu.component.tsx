import {
  Dimensions,
  FlatList,
  LayoutRectangle,
  ListRenderItem,
  Pressable,
  StatusBar,
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

const {width: sWidth} = Dimensions.get('screen');

export type TOptionItem = {
  label: string;
  id: any;
};

type Props = React.ComponentProps<typeof View> & {
  label?: string;
  labelStyle?: TextStyle;
  options: Array<TOptionItem>;
  selectedLabel: string | undefined;
  placeholder?: string;
  placeholderTextColor?: string;
  itemLabelStyle?: TextStyle;
  onSelected: Function;
  inputContainer?: ViewStyle;
  valueStyle?: TextStyle;
  disable?: boolean;
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

  useEffect(() => {
    setTimeout(() => {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        // console.log(Platform.OS, {x, y, width, height, pageX, pageY});
        // console.log(sWidth);

        setButtonPosition({
          height: height,
          width: width,
          x: pageX < sWidth ? (x > 0 ? x : pageX) : pageX - sWidth,
          y: pageY + (y > 0 ? y : StatusBar.currentHeight ?? 0),
        });
      });
    }, 500);
  }, []);

  return (
    <Pressable
      ref={ref}
      onPress={toggleIsVisible}
      style={[styles.container, props.style]}
      {...props}
      disabled={disable}>
      {label && (
        <View>
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
        <Icon type="Ionicons" name="chevron-forward" size={20} />
      </View>
      <ReactNativeModal
        useNativeDriverForBackdrop
        statusBarTranslucent
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
});
