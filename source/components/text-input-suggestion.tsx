import {LayoutRectangle, StyleSheet, TextInput, View} from 'react-native';

import React, {useEffect, useRef, useState} from 'react';
import CTextInput from './text-input.component';
import ReactNativeModal from 'react-native-modal';

type Props = React.ComponentProps<typeof CTextInput>;

const TextInputSuggestion = (props: Props) => {
  const ref = useRef<TextInput>(null);
  const refSuggest = useRef<TextInput>(null);
  const [layout, setLayout] = useState<LayoutRectangle>();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.measure((x, y, w, h, pageX, pageY) => {
        setLayout({
          width: w,
          height: h,
          x: pageX,
          y: pageY,
        });
      });
    }, 500);
  }, []);

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
        {...props}
      />
      <ReactNativeModal
        isVisible={isVisible}
        backdropOpacity={0}
        style={{margin: 0}}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={10}
        onBackdropPress={() => setIsVisible(false)}>
        <View
          style={{
            width: layout?.width,
            height: layout?.height,
            top: layout?.y,
            left: layout?.x,
            position: 'absolute',
            flexDirection: 'column-reverse',
          }}>
          <CTextInput ref={refSuggest} withError={false} {...props} label="" />
          <View
            style={[
              styles.suggestionContainer,
              {
                width: layout?.width,
              },
            ]}
          />
        </View>
      </ReactNativeModal>
    </>
  );
};

export default TextInputSuggestion;

const styles = StyleSheet.create({
  suggestionContainer: {
    height: 200,
    backgroundColor: 'white',
    elevation: 1,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
