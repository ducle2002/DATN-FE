import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import CommentItem from './components/comment-item.component';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {SelectItemContext} from '@/contexts/select-item.context';
import language, {languageKeys} from '@/config/language/language';
import {useMutation, useQuery} from 'react-query';
import {TCommentNoti} from './services/digital-noti.model';
import DigitalNotiApi from './services/digital-noti.service';

type Props = StackScreenProps<
  NotificationStackParamsList,
  'LIST_COMMENT_SCREEN'
>;

const ListCommentScreen = ({route}: Props) => {
  const [selectedComment, setSelectedComment] = useState<Array<number>>([]);

  const {id: notiId} = route.params;

  const {data, refetch} = useQuery({
    queryKey: ['comment-noti', notiId],
    queryFn: () => DigitalNotiApi.getCommentRequest(notiId),
  });

  const renderItem: ListRenderItem<TCommentNoti> = useCallback(
    ({item}) => <CommentItem {...{item}} />,
    [],
  );

  const toggleCommentSelect = (id: number) => {
    const index = selectedComment.findIndex(i => i === id);
    if (index === -1) {
      setSelectedComment([...selectedComment, id]);
    } else {
      setSelectedComment(selectedComment.filter(i => i !== id));
    }
  };

  const deselectAll = () => {
    setSelectedComment([]);
  };

  const {mutate: deleteAll} = useMutation({
    mutationFn: () =>
      DigitalNotiApi.deleteMultipleCommentsRequest(selectedComment),
    onSuccess: () => {
      refetch();
      setSelectedComment([]);
    },
  });

  return (
    <View style={styles.container}>
      <SelectItemContext.Provider
        value={{
          selected: selectedComment,
          select: toggleCommentSelect,
          reset: deselectAll,
        }}>
        <FlatList data={data?.comments ?? []} renderItem={renderItem} />
      </SelectItemContext.Provider>
      {selectedComment.length > 0 && (
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
