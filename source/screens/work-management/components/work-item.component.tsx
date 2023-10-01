import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
type Props = {
  item: any;
  onPress: () => void;
};

const WorkItem = ({item, onPress}: Props) => {
  return (
    <ItemCard onPress={onPress} style={{paddingVertical: 15}}>
      <View>
        <Text style={styles.textLabel}>{item.label}</Text>
        <Text>Loại công việc: Tuần tra</Text>
        <Text>Thời gian bắt đầu: {moment().format('HH:mm DD/MM/YYYY')}</Text>
      </View>
    </ItemCard>
  );
};

export default memo(WorkItem);

const styles = StyleSheet.create({
  textLabel: {
    ...globalStyles.text16Bold,
  },
});
