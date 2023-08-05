import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {TCommentNoti} from '@/modules/digital-notification/digital-noti.model';
import moment from 'moment';
import {Avatar} from 'react-native-paper';
import globalStyles from '@/config/globalStyles';
import ItemCard from '@/components/item-card.component';
import {SelectItemContext} from '@/contexts/select-item.context';

type Props = {item: TCommentNoti};

const CommentItem = ({item}: Props) => {
  const {selected, select} = useContext(SelectItemContext);

  const isSelected = useMemo(
    () => selected.includes(item.id),
    [item.id, selected],
  );

  return (
    <ItemCard
      isSelected={isSelected}
      style={styles.container}
      onLongPress={() => {
        select(item.id);
      }}
      onPress={() => {
        select(item.id);
      }}>
      <Avatar.Image source={{uri: item.avatar}} size={40} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.textName}>{item.fullName}</Text>
          <Text style={styles.textTime}>
            {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
          </Text>
        </View>
        <Text style={styles.textContent}>{item.comment}</Text>
      </View>
    </ItemCard>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  content: {
    marginLeft: 10,
  },
  header: {
    marginBottom: 5,
  },
  textName: {
    ...globalStyles.text15Medium,
  },
  textTime: {
    ...globalStyles.text12Regular,
    color: '#909090',
  },
  textContent: {
    ...globalStyles.text14Medium,
  },
});
