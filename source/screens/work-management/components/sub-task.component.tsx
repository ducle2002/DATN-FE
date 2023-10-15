import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ItemCard from '@/components/item-card.component';
import {Checkbox} from 'react-native-paper';
import {TWorkDetail} from '../services/work.model';
import globalStyles from '@/config/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import Icon from '@/components/icon.component';
import {TWorkLogTime} from '../services/logtime.model';

type Props = {
  item: TWorkDetail;
  workId: number;
  setModalAttachProps: Function;
  logTimeInfo?: TWorkLogTime;
  onChangeSelect: Function;
  turnWorkId?: number;
  disable?: boolean;
};

const SubTaskItem = ({
  item,
  workId,
  setModalAttachProps,
  logTimeInfo,
  onChangeSelect,
  turnWorkId,
  disable = false,
}: Props) => {
  const navigation = useNavigation<NavigationProp<WorkStackParamsList>>();

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
      <TouchableOpacity
        disabled={disable}
        onPress={() => {
          onChangeSelect();
        }}
        style={[
          styles.btnRow,
          {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
        ]}>
        <Checkbox.Android status={logTimeInfo ? 'checked' : 'unchecked'} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingLeft: 10,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderColor: '#F1F1F1',
        }}>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <Text style={styles.textValue}>{item.description}</Text>
        </View>
      </View>
      <TouchableOpacity
        disabled={!logTimeInfo || disable}
        onPress={() => {
          setModalAttachProps({
            visible: true,
            workDetail: item,
          });
        }}
        style={[
          styles.btnRow,
          {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        ]}>
        <Icon
          type="Ionicons"
          name="document-attach"
          size={24}
          color={logTimeInfo ? '#0096c7' : '#ced4da'}
        />
      </TouchableOpacity>
    </ItemCard>
  );
};

export default SubTaskItem;

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
});
