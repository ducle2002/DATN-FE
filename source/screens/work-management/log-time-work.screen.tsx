import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import language, {languageKeys} from '@/config/language/language';
import {StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import {Button} from 'react-native-paper';
import LogTimeApi from './services/logtime.service';
import {useQuery} from 'react-query';
import FastImage from 'react-native-fast-image';
import {ELogTimeStatus} from './services/work.model';
import Icon from '@/components/icon.component';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
type Props = StackScreenProps<WorkStackParamsList, 'LOGTIME'>;
const LogTimeWorkScreen = ({route, navigation}: Props) => {
  const {data: logTimeWork, refetch: refetchLogTime} = useQuery({
    queryKey: ['logTimeDetail', route.params.workId, route.params.workTurnId],
    queryFn: () =>
      LogTimeApi.getAllByTurn({
        WorkId: route.params.workId,
        WorkTurnId: route.params.workTurnId,
        maxResultCount: 1000,
      }),
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{padding: 8, backgroundColor: 'white'}}>
        <Text style={styles.txtLabel}>
          Công việc: {route.params.workDetail.name}
        </Text>
        <Text style={styles.txtLabel}>
          {route.params.workDetail.description}
        </Text>
      </View>
      <ScrollView>
        {logTimeWork
          ?.filter(item => item.workDetailId === route.params.workDetail.id)
          ?.map((item, index) => {
            return (
              <View key={index} style={styles.containerLogTime}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    type="AntDesign"
                    name={
                      item.status === ELogTimeStatus.DONE_SUPERVISOR
                        ? 'checksquare'
                        : item.status === ELogTimeStatus.NOT_DONE
                        ? 'closesquare'
                        : 'minussquare'
                    }
                    size={24}
                    color={
                      item.status === ELogTimeStatus.DONE_SUPERVISOR
                        ? '#2b9348'
                        : item.status === ELogTimeStatus.NOT_DONE
                        ? '#9d0208'
                        : '#adb5bd'
                    }
                  />
                  <Text style={[styles.txtLabel, {paddingLeft: 4}]}>
                    {item.status === ELogTimeStatus.DONE_SUPERVISOR
                      ? 'Đã hoàn thành tốt'
                      : item.status === ELogTimeStatus.NOT_DONE
                      ? 'Không đạt'
                      : 'Chưa đánh giá'}
                  </Text>
                </View>
                <Text style={styles.txtLabel}>
                  Thời gian:{' '}
                  <Text style={styles.txtValue}>
                    {moment(item.dateStart).format('DD/MM/YYYY HH:mma')}
                  </Text>
                </Text>
                <Text style={styles.txtLabel}>
                  Người xử lý:{' '}
                  <Text style={styles.txtValue}>{item.fullName}</Text>
                </Text>
              </View>
            );
          })}
        {(!logTimeWork ||
          logTimeWork?.filter(
            item => item.workDetailId === route.params.workDetail.id,
          ).length === 0) && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '30%',
            }}>
            <Icon type="Entypo" name={'archive'} size={52} color={'#adb5bd'} />
            <Text
              style={{
                ...globalStyles.text17Bold,
                color: '#adb5bd',
              }}>
              Chưa thực hiện
            </Text>
          </View>
        )}
      </ScrollView>

      {/* <View style={styles.containerBtn}>
        <Button
          mode="contained-tonal"
          style={styles.btnBottom}
          onPress={() => {}}>
          Lưu
        </Button>
      </View> */}
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
  containerLogTime: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  txtLabel: {
    ...globalStyles.text14SemiBold,
  },
  txtValue: {
    ...globalStyles.text14Regular,
  },
});
