import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ItemBillStatistic = ({
  title,
  content,
  bold,
}: {
  title: string;
  content: string;
  bold?: boolean;
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Text
          style={[
            styles.txtLabel,
            {
              fontWeight: bold ? '600' : '500',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.txtVal,
            {
              fontWeight: bold ? '600' : '500',
            },
          ]}>
          {content}
        </Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default ItemBillStatistic;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#737677',
  },
  txtLabel: {
    color: '#333861',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  },
  txtVal: {
    color: '#151522',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
  },
});
