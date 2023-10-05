import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import ScannerView from '@/components/scanner-view';
import Button from '@/components/button.component';
import {PhotoFile} from 'react-native-vision-camera';
import globalStyles from '@/config/globalStyles';
type Props = {isVisible: boolean; onBackdropPress: () => void};

const CheckoutWork = ({isVisible, onBackdropPress}: Props) => {
  const [image, setImage] = useState<PhotoFile>();
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{margin: 0}}>
      <SafeAreaView
        style={{backgroundColor: 'white', marginTop: 'auto', height: '100%'}}>
        <View style={{}}>
          <Text style={styles.textLabel}>Minh chứng</Text>
          <View style={styles.imageContainer}>
            <>
              {image ? (
                <>
                  <Image
                    source={{
                      uri: image?.path,
                    }}
                    style={{width: '100%', height: '100%'}}
                  />
                  <Button
                    onPress={() => {
                      setImage(undefined);
                    }}
                    style={{position: 'absolute'}}>
                    reset
                  </Button>
                </>
              ) : (
                <ScannerView
                  isReturnPhoto={true}
                  active={!image}
                  hasCaptureButton={true}
                />
              )}
            </>
          </View>
        </View>
        <Button onPress={onBackdropPress}>quay lai</Button>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default CheckoutWork;

const styles = StyleSheet.create({
  imageContainer: {
    width: '60%',
    aspectRatio: 1,
    backgroundColor: '#ababab',
    alignSelf: 'center',
    marginTop: 10,
  },
  textLabel: {
    ...globalStyles.text16Bold,
  },
});
