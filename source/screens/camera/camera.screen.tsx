import {
  Dimensions,
  PixelRatio,
  StyleSheet,
  View,
  findNodeHandle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScannerView, createFragment} from '@/components/scanner-view';
import Button from '@/components/button.component';
import BottomContainer from '@/components/bottom-container.component';

const {width, height} = Dimensions.get('screen');

const CameraScreen = () => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    if (viewId) {
      createFragment(viewId);
    }
  }, []);

  const [code, setCode] = useState<String>();

  return (
    <View style={{backgroundColor: 'red', flex: 1}}>
      <ScannerView
        style={{
          height: PixelRatio.getPixelSizeForLayoutSize(height),
          width: PixelRatio.getPixelSizeForLayoutSize(width),
        }}
        ref={ref}
        onScanned={({message}) => {
          setCode(message);
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}>
        {code && (
          <BottomContainer>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <Button
                onPress={() => {
                  console.log(code);
                }}>
                direct
              </Button>
              <Button onPress={() => setCode(undefined)}>reset</Button>
            </View>
          </BottomContainer>
        )}
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
