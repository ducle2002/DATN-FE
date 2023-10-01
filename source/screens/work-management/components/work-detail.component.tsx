import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import moment from 'moment';
import BottomContainer from '@/components/bottom-container.component';
import language, {languageKeys} from '@/config/language/language';
import Button from '@/components/button.component';

type Props = {
  isVisible: boolean;
  onBackdropPress: () => void;
  work?: any;
};

const WorkDetail = ({isVisible, onBackdropPress, work}: Props) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.2}
      style={{margin: 0}}>
      <SafeAreaView
        style={{marginTop: 'auto', backgroundColor: 'white', minHeight: '60%'}}>
        {work && (
          <SafeAreaView>
            <Text>{work.label}</Text>
            <Text>Loại công việc: Tuần tra</Text>
            <Text>
              Thời gian bắt đầu: {moment().format('HH:mm DD/MM/YYYY')}
            </Text>
            <Text>Người giám sát: Kien</Text>
          </SafeAreaView>
        )}
        <BottomContainer>
          <Button>{language.t(languageKeys.shared.button.back)}</Button>
        </BottomContainer>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default WorkDetail;

const styles = StyleSheet.create({});
