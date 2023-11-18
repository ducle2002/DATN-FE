import {
  FlatList,
  LayoutRectangle,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native';

import React, {useMemo, useRef, useState} from 'react';
import CTextInput from './text-input.component';
import ReactNativeModal from 'react-native-modal';
import globalStyles from '@/config/globalStyles';
type Props = React.ComponentProps<typeof CTextInput> & {
  valueSuggest?: string[];
};

const TextInputSuggestion = ({valueSuggest, ...props}: Props) => {
  const ref = useRef<TextInput>(null);
  const refSuggest = useRef<TextInput>(null);
  const [layout, setLayout] = useState<LayoutRectangle>();

  const [isVisible, setIsVisible] = useState(false);
  const [inputDimension, setInputDimension] = useState<
    LayoutRectangle | undefined
  >();

  const onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    setInputDimension(nativeEvent.layout);
  };

  ref.current?.measure((x, y, width, height, pageX, pageY) => {
    if (layout?.x !== pageX || layout.y !== pageY) {
      setLayout({
        height: height,
        width: width,
        x: pageX,
        y: pageY,
      });
    }
  });

  return (
    <>
      <CTextInput
        onFocus={() => {
          setIsVisible(true);
          ref.current?.blur();
          setTimeout(() => refSuggest.current?.focus(), 100);
        }}
        withError={false}
        ref={ref}
        onLayout={onLayout}
        {...props}
      />
      <ReactNativeModal
        isVisible={isVisible}
        backdropOpacity={0}
        style={{margin: 0}}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={10}
        onBackdropPress={() => {
          refSuggest.current?.blur();
          setIsVisible(false);
        }}>
        <View
          style={{
            width: layout?.width,
            height: layout?.height,
            top: layout?.y,
            left: layout?.x,
            position: 'absolute',
            flexDirection: 'column-reverse',
          }}>
          <CTextInput
            ref={refSuggest}
            withError={false}
            {...props}
            label=""
            placeholderTextColor={'#cdcdcd'}
          />
          <View
            style={[
              styles.suggestionContainer,
              {
                width: layout?.width,
              },
            ]}>
            <ListSuggestedValue
              width={inputDimension?.width}
              inputValue={props.value}
              onSelectValue={(v: string) => {
                if (props.onChangeText) {
                  props.onChangeText(v);
                }
              }}
              valueSuggest={valueSuggest}
            />
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};
const ListSuggestedValue = ({
  width,
  inputValue,
  onSelectValue,
  valueSuggest,
}: {
  width?: number;
  inputValue?: string;
  onSelectValue: (value: string) => void;
  valueSuggest?: string[];
}) => {
  const suggestedData = useMemo(
    () =>
      valueSuggest
        ? inputValue
          ? valueSuggest?.filter(
              v =>
                inputValue?.toLowerCase() !== v.toLowerCase() &&
                v.toLowerCase().includes(inputValue?.toLowerCase()),
            )
          : valueSuggest
        : [],
    [inputValue, valueSuggest],
  );

  return (
    <FlatList
      style={{
        width: width,
        minHeight: suggestedData?.length > 1 ? 100 : 0,
        maxHeight: suggestedData?.length > 1 ? 100 : 0,
      }}
      data={suggestedData}
      renderItem={({item, index}) => (
        <Pressable
          style={[
            styles.pressable,
            {
              backgroundColor: index % 2 === 0 ? '#fefefe' : 'white',
            },
          ]}
          key={item}
          onPress={() => onSelectValue(item)}>
          <Text
            style={{
              ...globalStyles.text13Medium,
              color: 'black',
            }}>
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
};
export default TextInputSuggestion;

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  suggestionContainer: {
    elevation: 1,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
