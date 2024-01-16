import {StyleSheet} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import moment from 'moment';

type Props = React.ComponentProps<typeof ProgressBar> & {
  start: string;
  finish: string;
};

const TimeLine = ({start, finish, style, ...props}: Props) => {
  const [now, setNow] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      if (now.isBefore(moment(finish))) {
        setNow(moment());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [finish, now]);

  const timeProgress = useMemo(() => {
    const startTime = moment(start);
    const finishTime = moment(finish);
    if (!startTime.isBefore(finishTime)) {
      return 1;
    }
    if (now.isAfter(finishTime)) {
      return 1;
    } else {
      return startTime.diff(now) / startTime.diff(finishTime);
    }
  }, [finish, now, start]);

  return (
    <ProgressBar
      progress={timeProgress}
      style={[styles.progress, style]}
      color="#506EDF"
      {...props}
    />
  );
};

export default memo(TimeLine);

const styles = StyleSheet.create({
  progress: {
    width: '100%',
    borderRadius: 10,
    height: 8,
    marginTop: 5,
  },
});
