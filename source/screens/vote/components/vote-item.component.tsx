import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';

type Props = {
  item: any;
  onPress?: Function;
  onLongPress?: Function;
};

const VoteItem = ({item, onPress = () => {}}: Props) => {
  return (
    <ItemCard
      onPress={() => {
        onPress();
      }}
      style={styles.container}>
      <Text style={styles.textName}>{item.name}</Text>
    </ItemCard>
  );
};

export default VoteItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textName: {
    ...globalStyles.text16Medium,
    color: '#1d52da',
  },
});
