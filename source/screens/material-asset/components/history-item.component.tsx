import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TMaintenanceHistory} from '../services/material-asset.model';
import moment from 'moment';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
type Props = {item: TMaintenanceHistory};

const HistoryItem = ({item}: Props) => {
  return (
    <ItemCard>
      <View>
        <Text style={styles.textTitle}>{item.taiSanText}</Text>
        <Text style={styles.textValue}>
          Tạo: {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
        <Text style={styles.textValue}>
          Checklist: {moment(item.ngayCheckList).format('HH:mm DD/MM/YYYY')}
        </Text>
        <Text style={styles.textValue}>
          Nguoi kiem tra: {item.nguoiKiemTraText}
        </Text>
        <Text style={styles.textValue}>
          Bo phan theo doi: {item.boPhanTheoDoi}
        </Text>
      </View>
    </ItemCard>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  textTitle: {
    ...globalStyles.text16Bold,
  },
  textValue: {
    ...globalStyles.text16Medium,
  },
});
