import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import ItemCard from '@/components/item-card.component';
import globalStyles from '@/config/globalStyles';
import {TVote} from '@/modules/vote/vote.model';
import {ProgressBar} from 'react-native-paper';
import moment from 'moment';

type Props = {
  item: TVote;
  onPress?: Function;
  onLongPress?: Function;
};

const VoteItem = ({item, onPress = () => {}}: Props) => {
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      if (now.isBefore(moment(item.finishTime))) {
        setNow(moment());
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [item.finishTime, now]);

  const timeProgress = useMemo(() => {
    const start = moment(item.startTime);
    const end = moment(item.finishTime);
    if (now.isAfter(end)) {
      return 1;
    } else {
      return start.diff(now) / start.diff(end);
    }
  }, [item.finishTime, item.startTime, now]);

  return (
    <ItemCard
      onPress={() => {
        onPress();
      }}
      style={styles.container}>
      <View style={{flex: 1}}>
        <View>
          <Text numberOfLines={1} style={styles.textName}>
            {item.name}
          </Text>
          {item.description && (
            <Text numberOfLines={2} style={styles.textContent}>
              {item.description}
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
        <ProgressBar
          progress={timeProgress}
          style={styles.progress}
          color="#506EDF"
        />
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
