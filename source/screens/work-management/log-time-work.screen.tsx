import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import language, {languageKeys} from '@/config/language/language';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import {Button} from 'react-native-paper';
type Props = StackScreenProps<WorkStackParamsList, 'LOGTIME'>;
const LogTimeWorkScreen = ({route, navigation}: Props) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text>Lịch sử log time</Text>
      <View style={styles.containerBtn}>
        <Button
          mode="contained-tonal"
          style={styles.btnBottom}
          onPress={() => {
            navigation.navigate('CREATE_LOG_TIME', {
              detailWork: route.params.detailWork,
              workId: route.params.workId,
            });
          }}>
          Log time
        </Button>
      </View>
    </View>
  );
};

export default LogTimeWorkScreen;

const styles = StyleSheet.create({
  containerBtn: {
    backgroundColor: 'white',
    padding: '5%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnBottom: {
    borderRadius: 8,
    marginHorizontal: '5%',
  },
});
