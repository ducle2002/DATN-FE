import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useMemo} from 'react';
import HTMLParser from 'node-html-parser';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import Icon from '@/components/icon.component';
import FastImage from 'react-native-fast-image';
import {SelectNotiContext} from '../context/digital-noti.context';
import {RadioButton} from 'react-native-paper';
import Animated, {SlideInLeft, SlideOutLeft} from 'react-native-reanimated';
type Props = {
  item: any;
  department?: string;
  onPress?: Function;
};

const NotiItem = ({item, department, onPress = () => {}}: Props) => {
  const root = HTMLParser.parse(item.data);

  const {select, selected} = useContext(SelectNotiContext);

  const isSelected = useMemo(
    () => selected.includes(item.id),
    [item.id, selected],
  );

  return (
    <Pressable
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
      style={[
        styles.container,
        {
          backgroundColor: isSelected ? '#f1f2f8' : 'white',
        },
      ]}>
      {isSelected && (
        <Animated.View
          entering={SlideInLeft}
          exiting={SlideOutLeft}
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <RadioButton.Android value={''} status="checked" />
        </Animated.View>
      )}
      <FastImage source={{uri: item.fileUrl}} style={styles.image} />
      <View style={styles.contentContainer}>
        <Icon
          type="Ionicons"
          name="ellipsis-horizontal"
          style={{marginLeft: 'auto'}}
          size={30}
          color="#BDB7B7"
        />
        <Text style={styles.textDepartment}>{department}</Text>
        <Text style={styles.textName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.textData} numberOfLines={2}>
          {root.textContent.trim() + '\n'}
        </Text>
        <Text style={styles.textTime}>
          {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
    </Pressable>
  );
};

export default NotiItem;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    aspectRatio: 1,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    marginBottom: 20,
    width: '100%',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  textName: {
    ...globalStyles.text15Medium,
  },
  textData: {
    ...globalStyles.text15Regular,
    marginTop: 5,
    marginBottom: 10,
  },
  textDepartment: {
    ...globalStyles.text12Regular,
    color: '#47A5FF',
    marginBottom: 5,
  },
  textTime: {
    ...globalStyles.text12Regular,
    color: '#4f4f4f',
    marginTop: 'auto',
    marginLeft: 'auto',
  },
});
