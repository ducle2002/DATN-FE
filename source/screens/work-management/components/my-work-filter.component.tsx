import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import language, {languageKeys} from '@/config/language/language';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {EWorkStatus} from '../services/work.model';
import globalStyles from '@/config/globalStyles';
type Props = {selected: EWorkStatus; select: (id: EWorkStatus) => void};

const MyWorkFilter = ({
  selected = EWorkStatus.DOING,
  select = () => {},
}: Props) => {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    if (selected === EWorkStatus.DOING) {
      sharedValue.value = withTiming(0);
    } else {
      sharedValue.value = withTiming(1);
    }
  }, [select, selected, sharedValue]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#5BA9EF',
      height: 3,
      width: '50%',
      position: 'absolute',
      bottom: 0,
      left: interpolate(sharedValue.value, [0, 1], [0, 50]) + '%',
    };
  });

  return (
    <Animated.View style={styles.container}>
      <Pressable
        onPress={() => {
          select(EWorkStatus.DOING);
        }}
        style={styles.buttonContainer}>
        <Text
          style={{
            ...styles.textLabel,
            color: selected === EWorkStatus.DOING ? '#5BA9EF' : '#ABABAB',
          }}>
          {language.t(languageKeys.workManagement.status[2])}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          select(EWorkStatus.COMPLETE);
        }}
        style={styles.buttonContainer}>
        <Text
          style={{
            ...styles.textLabel,
            color: selected === EWorkStatus.COMPLETE ? '#5BA9EF' : '#ABABAB',
          }}>
          {language.t(languageKeys.workManagement.status[4])}
        </Text>
      </Pressable>
      <Animated.View style={indicatorAnimatedStyle} />
    </Animated.View>
  );
};

export default MyWorkFilter;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textLabel: {
    ...globalStyles.text15Bold,
  },
});
