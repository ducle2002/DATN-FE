import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import ItemCard from '@/components/item-card.component';
import {Button, Checkbox, Chip, Divider, Menu} from 'react-native-paper';
import {ELogTimeStatus, TWorkDetail} from '../services/work.model';
import globalStyles from '@/config/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import Icon from '@/components/icon.component';
import {TWorkLogTime} from '../services/logtime.model';

type Props = {
  item: TWorkDetail;
  workId: number;
  setModalAttachProps: Function;
  listLogTimeInfo?: TWorkLogTime[];
  turnWorkId?: number;
  disable?: boolean;
  updateWorkLogTime?: (data: {
    workTurnId: number;
    listLogTimeIdsDelete?: number[];
    listLogTimeCreate?: TWorkLogTime[];
    listLogTimeUpdate?: TWorkLogTime[];
  }) => void;
};

const SubTaskCheckItem = ({
  item,
  workId,
  setModalAttachProps,
  listLogTimeInfo,
  disable = false,
  turnWorkId,
  updateWorkLogTime,
}: Props) => {
  const navigation = useNavigation<NavigationProp<WorkStackParamsList>>();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const checkEnableWithLogTime = useMemo(() => {
    if (listLogTimeInfo && listLogTimeInfo.length > 0) {
      return false;
    }
    return true;
  }, [listLogTimeInfo]);
  const statusWorkDetail = useMemo(() => {
    if (listLogTimeInfo && listLogTimeInfo.length > 0) {
      for (let i = 0; i < listLogTimeInfo.length; i++) {
        if (listLogTimeInfo[i].status === ELogTimeStatus.DONE_SUPERVISOR) {
          return ELogTimeStatus.DONE_SUPERVISOR;
        }
        if (listLogTimeInfo[i].status === ELogTimeStatus.NOT_DONE) {
          return ELogTimeStatus.NOT_DONE;
        }
      }
      return 0;
    }
    return -1;
  }, [listLogTimeInfo]);
  return (
    <ItemCard
      style={{
        shadowOpacity: 0,
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: '#F1F1F1',
        paddingVertical: 0,
        paddingHorizontal: 0,
      }}
      onPress={() => {
        if (!disable && !!turnWorkId) {
          navigation.navigate('LOGTIME', {
            workTurnId: turnWorkId,
            workId: workId,
            workDetail: item,
          });
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingLeft: 10,
          borderRightWidth: 2,
          borderColor: '#F1F1F1',
        }}>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <Text style={styles.textValue}>{item.description}</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 4,
            }}>
            <View
              style={{
                backgroundColor:
                  statusWorkDetail === ELogTimeStatus.DONE_SUPERVISOR
                    ? '#2b9348'
                    : statusWorkDetail === ELogTimeStatus.NOT_DONE
                    ? '#9d0208'
                    : statusWorkDetail === 0
                    ? '#0077b6'
                    : '#adb5bd',
                paddingHorizontal: 4,
                paddingVertical: 4,
                borderRadius: 4,
              }}>
              <Text style={styles.txtStatus}>
                {statusWorkDetail === ELogTimeStatus.DONE_SUPERVISOR
                  ? 'Hoàn thành tốt'
                  : statusWorkDetail === ELogTimeStatus.NOT_DONE
                  ? 'Không đạt'
                  : statusWorkDetail === 0
                  ? 'Chưa đánh giá'
                  : 'Chưa thực hiện'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{
          backgroundColor: 'white',
        }}
        contentStyle={{
          backgroundColor: 'white',
        }}
        anchor={
          <TouchableOpacity
            disabled={disable || checkEnableWithLogTime}
            onPress={() => {
              //   setModalAttachProps({
              //     visible: true,
              //     workDetail: item,
              //   });
              openMenu();
            }}
            style={[
              styles.btnRow,
              {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
              },
            ]}>
            <Icon
              type="FontAwesome6"
              name="calendar-check"
              size={24}
              color={
                statusWorkDetail === ELogTimeStatus.DONE_SUPERVISOR
                  ? '#2b9348'
                  : statusWorkDetail === ELogTimeStatus.NOT_DONE
                  ? '#9d0208'
                  : statusWorkDetail === 0
                  ? '#0077b6'
                  : '#adb5bd'
              }
            />
          </TouchableOpacity>
        }>
        <Menu.Item
          leadingIcon={() => (
            <Icon
              type="AntDesign"
              name="checksquare"
              size={24}
              color={'#2b9348'}
            />
          )}
          onPress={() => {
            closeMenu();
            if (
              turnWorkId &&
              listLogTimeInfo &&
              !!updateWorkLogTime &&
              statusWorkDetail !== ELogTimeStatus.DONE_SUPERVISOR
            ) {
              const submitData = {
                workTurnId: turnWorkId,
                listLogTimeUpdate:
                  listLogTimeInfo?.map(el => {
                    let logTime = {
                      ...el,
                      status: ELogTimeStatus.DONE_SUPERVISOR,
                    };
                    return logTime;
                  }) ?? [],
              };
              updateWorkLogTime(submitData);
            }
          }}
          title="Đã đạt"
        />
        <Divider />
        <Menu.Item
          leadingIcon={() => (
            <Icon
              type="AntDesign"
              name="closesquare"
              size={24}
              color={'#9d0208'}
            />
          )}
          onPress={() => {
            if (
              turnWorkId &&
              listLogTimeInfo &&
              !!updateWorkLogTime &&
              statusWorkDetail !== ELogTimeStatus.NOT_DONE
            ) {
              const submitData = {
                workTurnId: turnWorkId,
                listLogTimeUpdate:
                  listLogTimeInfo?.map(el => {
                    let logTime = {
                      ...el,
                      status: ELogTimeStatus.NOT_DONE,
                    };
                    return logTime;
                  }) ?? [],
              };
              updateWorkLogTime(submitData);
            }
            closeMenu();
          }}
          title="Không đạt"
        />
        <Divider />
      </Menu>
    </ItemCard>
  );
};

export default SubTaskCheckItem;

const styles = StyleSheet.create({
  textTitle: {
    ...globalStyles.text16Medium,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
  btnRow: {
    height: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStatus: {
    ...globalStyles.text14Medium,
    color: 'white',
  },
});
