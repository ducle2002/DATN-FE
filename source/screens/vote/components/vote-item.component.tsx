import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import {TVote} from '@/modules/vote/vote.model';
import moment from 'moment';
import {SelectItemContext} from '@/contexts/select-item.context';
import TimeLineComponent from './time-line.component';
import HTMLParser from 'node-html-parser';

type Props = {
  item: TVote;
  onPress?: Function;
  onLongPress?: Function;
};

const VoteItem = ({item, onPress = () => {}}: Props) => {
  const [now, setNow] = useState(moment());
  const {select, selected} = useContext(SelectItemContext);
  const root = useMemo(
    () => HTMLParser.parse(item?.description ?? ''),
    [item?.description],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (now.isBefore(moment(item.finishTime))) {
        setNow(moment());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [item.finishTime, now]);

  const isSelected = useMemo(
    () => selected.includes(item.id),
    [item.id, selected],
  );

  return (
    <ItemCard
      isSelected={isSelected}
      onLongPress={() => {
        select(item.id);
      }}
      onPress={() => {
        if (selected.length === 0) {
          onPress();
        } else {
          select(item.id);
        }
      }}
      style={styles.container}>
      <View style={{flex: 1}}>
        <View>
          <Text numberOfLines={1} style={styles.textName}>
            {item.name}
          </Text>
          {item.description && (
            <Text numberOfLines={2} style={styles.textContent}>
              {root?.textContent?.trim() + '\n'}
            </Text>
          )}
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.textTime}>
            {moment(item.startTime).format('HH:mm DD/MM/YYYY')}
          </Text>
          <Text style={styles.textTime}>
            {moment(item.finishTime).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>
        <TimeLineComponent start={item.startTime} finish={item.finishTime} />
      </View>
    </ItemCard>
  );
};

export default VoteItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textName: {
    ...globalStyles.text16Bold,
    color: '#1d52da',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTime: {
    ...globalStyles.text13Regular,
    color: '#808694',
    marginTop: 10,
  },
  textContent: {
    ...globalStyles.text15Medium,
  },
  progress: {
    width: '100%',
    borderRadius: 10,
    height: 8,
    marginTop: 5,
  },
});
