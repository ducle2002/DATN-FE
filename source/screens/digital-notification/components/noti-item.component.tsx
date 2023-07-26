import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HTMLParser from 'node-html-parser';
import globalStyles from '@/config/globalStyles';
type Props = {item: any; department?: string};

const NotiItem = ({item, department}: Props) => {
  const root = HTMLParser.parse(item.data);
  return (
    <View style={styles.container}>
      <Image source={{uri: item.fileUrl}} style={{width: 100, height: 100}} />
      <View style={styles.contentContainer}>
        <Text style={styles.textDepartment}>{department}</Text>
        <Text style={styles.textName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.textData} numberOfLines={2}>
          {root.textContent.trim()}
        </Text>
      </View>
    </View>
  );
};

export default NotiItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  textName: {
    ...globalStyles.text15Medium,
  },
  textData: {
    ...globalStyles.text15Regular,
    marginTop: 5,
  },
  textDepartment: {
    ...globalStyles.text12Regular,
    color: '#47A5FF',
  },
});
