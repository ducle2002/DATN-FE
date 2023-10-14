import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TWorkComment} from '../services/work.model';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/config/globalStyles';
type Props = {
  item: TWorkComment;
};

const WorkCommentItem = ({item}: Props) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: 'https://imaxtek.s3.ap-southeast-1.amazonaws.com/public/1680657760154-2679.jpg',
        }}
        style={{width: 50, height: 50, borderRadius: 50}}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.textName}>{item.fullName}</Text>
        <Text style={styles.textTime}>
          {moment(item.creationTime).format('HH:mm:ss DD/MM/YYYY')}
        </Text>
        <View style={styles.content}>
          <Text style={styles.textContent}>{item.content}</Text>
        </View>
      </View>
    </View>
  );
};

export default WorkCommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentContainer: {
    marginLeft: 10,
    flex: 1,
  },
  textName: {
    ...globalStyles.text16Bold,
  },
  textTime: {
    ...globalStyles.text15Regular,
    color: '#ababab',
    marginTop: 5,
  },
  textContent: {
    ...globalStyles.text16SemiBold,
  },
  content: {
    backgroundColor: '#f1f2f8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },
});
