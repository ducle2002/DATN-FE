import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useMemo} from 'react';
import HTMLParser from 'node-html-parser';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import Icon from '@/components/icon.component';
import FastImage from 'react-native-fast-image';
import {SelectItemContext} from '../../../contexts/select-item.context';
import ItemCard from '@/components/item-card.component';
type Props = {
  item: any;
  department?: string;
  onPress?: Function;
};

const NotiItem = ({item, department, onPress = () => {}}: Props) => {
  const {select, selected} = useContext(SelectItemContext);

  const root = useMemo(() => HTMLParser.parse(item?.data), [item?.data]);

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
      }}>
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
          {root?.textContent?.trim() + '\n'}
        </Text>
        <Text style={styles.textTime}>
          {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
    </ItemCard>
  );
};

export default NotiItem;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },

  contentContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    width: '100%',
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
