import {
  FlatList,
  LayoutRectangle,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {useHeaderHeight} from '@react-navigation/elements';
import globalStyles from '@/config/globalStyles';
import Icon from './icon.component';

export type TOptionItem = {
  label: string;
  id: any;
};

type Props = React.ComponentProps<typeof View> & {
  label: string;
  labelStyle?: TextStyle;
  options: Array<TOptionItem>;
  selectedLabel: string | undefined;
  placeholder: string;
  itemLabelStyle?: TextStyle;
  onSelected: Function;
  inputContainer?: ViewStyle;
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
  ...props
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const [buttonPossion, setButtonPossion] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    y: 0,
    x: 0,
  });

  const headerHeight = useHeaderHeight();

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

  return (
    <Pressable
      onLayout={({nativeEvent}) => {
        setButtonPossion(nativeEvent.layout);
      }}
      onPress={toggleIsVisible}
      style={[styles.container, props.style]}
      {...props}>
      <View>
        <Text style={[styles.textLabel, labelStyle]}>{label}</Text>
      </View>
      <View style={[styles.inputContainer, inputContainer]}>
        <Text style={styles.textValue}>{selectedLabel ?? placeholder}</Text>
        <Icon type="Ionicons" name="chevron-forward" size={20} />
      </View>
      <ReactNativeModal
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
              // position: 'absolute',
              top: buttonPossion.height + buttonPossion.y + headerHeight,
              width: buttonPossion.width,
              left: buttonPossion.x,
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

export default DropdownMenu;

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
  },
  listOption: {
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 5,
  },
  itemOption: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemLabelText: {
    ...globalStyles.text14Medium,
  },
});
