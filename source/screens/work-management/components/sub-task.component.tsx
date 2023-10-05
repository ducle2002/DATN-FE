import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemCard from '@/components/item-card.component';
import {Checkbox} from 'react-native-paper';
import {TWorkDetail} from '../services/work.model';
import globalStyles from '@/config/globalStyles';

type Props = {
  item: TWorkDetail;
};

const SubTaskItem = ({item}: Props) => {
  return (
    <ItemCard
      style={{
        shadowOpacity: 0,
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: '#F1F1F1',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Checkbox.Android status="checked" />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={styles.textTitle}>{item.name}</Text>
          <Text style={styles.textValue}>{item.description}</Text>
        </View>
      </View>
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
});
