import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import Button from '@/components/button.component';
import BottomContainer from '@/components/bottom-container.component';
import language, {languageKeys} from '@/config/language/language';

type Props = {};

const AssetHistoryCreate = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Button onPress={() => setIsVisible(true)}>Bảo trì</Button>
      <ReactNativeModal
        onBackdropPress={() => setIsVisible(false)}
        isVisible={isVisible}
        style={{margin: 0}}>
        <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
          <View>
            <Text>AssetHistoryCreate</Text>
          </View>
          <BottomContainer>
            <Button onPress={() => setIsVisible(false)}>
              {language.t(languageKeys.shared.button.back)}
            </Button>
          </BottomContainer>
        </SafeAreaView>
      </ReactNativeModal>
    </>
  );
};

export default AssetHistoryCreate;

const styles = StyleSheet.create({});
