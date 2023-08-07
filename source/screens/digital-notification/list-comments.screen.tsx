import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {TCommentNoti} from '@/modules/digital-notification/digital-noti.model';
import CommentItem from './components/comment-item.component';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {SelectItemContext} from '@/contexts/select-item.context';
import language, {languageKeys} from '@/config/language/language';
import {useMutation, useQuery} from 'react-query';
import DigitalNotiApi from '@/modules/digital-notification/digital-noti.service';

type Props = StackScreenProps<
  NotificationStackParamsList,
  'LIST_COMMENT_SCREEN'
>;

const ListCommentScreen = ({route}: Props) => {
  const [seletedComment, setSeletedComment] = useState<Array<number>>([]);

  const {notiId} = route.params;

  const {data, refetch} = useQuery({
    queryKey: ['comment-noti', notiId],
    queryFn: () => DigitalNotiApi.getCommentRequest(notiId),
  });

  const renderItem: ListRenderItem<TCommentNoti> = useCallback(
    ({item}) => <CommentItem {...{item}} />,
    [],
  );

  const toggleCommentSelect = (id: number) => {
    const index = seletedComment.findIndex(i => i === id);
    if (index === -1) {
      setSeletedComment([...seletedComment, id]);
    } else {
      setSeletedComment(seletedComment.filter(i => i !== id));
    }
  };

  const deselectAll = () => {
    setSeletedComment([]);
  };

  const {mutate: deleteAll} = useMutation({
    mutationFn: () =>
      DigitalNotiApi.deleteMultipleCommentsRequest(seletedComment),
    onSuccess: () => {
      refetch();
      setSeletedComment([]);
    },
  });

  return (
    <View style={styles.container}>
      <SelectItemContext.Provider
        value={{
          selected: seletedComment,
          select: toggleCommentSelect,
          reset: deselectAll,
        }}>
        <FlatList data={data?.comments ?? []} renderItem={renderItem} />
      </SelectItemContext.Provider>
      {seletedComment.length > 0 && (
        <BottomContainer>
          <Button mode="outlined" onPress={() => deleteAll()}>
            {language.t(languageKeys.shared.button.deleteAll)}
          </Button>
        </BottomContainer>
      )}
    </View>
  );
};

export default ListCommentScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
});