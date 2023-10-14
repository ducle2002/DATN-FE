import {WorkStackParamsList} from '@/routes/work-management.stack';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {useMutation} from 'react-query';
import WorkCommentApi from './services/work-comment.service';
import BottomContainer from '@/components/bottom-container.component';
import CTextInput from '@/components/text-input.component';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import Icon from '@/components/icon.component';
import {useAllWorkComment} from './services/hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {TWorkComment} from './services/work.model';
import WorkCommentItem from './components/work-comment-item.component';

type Props = StackScreenProps<WorkStackParamsList, 'COMMENT'>;

const CommentScreen = ({route}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {isDirty},
    reset,
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit: SubmitHandler<{content: string}> = data => {
    createComment(data);
  };

  // const {data, fetchNextPage} = useWorkComment({workId: route.params.id});
  const {data, refetch} = useAllWorkComment({workId: route.params.id});

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      // data ? flatten(map(page => page.comments, data.pages)) : [],
      data ? data.comments : [],
    );
  }, [data]);

  const renderItem: ListRenderItem<TWorkComment> = ({item}) => (
    <WorkCommentItem {...{item}} />
  );

  const {mutate: createComment} = useMutation({
    mutationFn: (params: {content: string}) =>
      WorkCommentApi.create({
        workId: route.params.id,
        content: params.content,
      }),
    onSuccess: () => {
      reset();
      refetch();
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        inverted
      />
      <BottomContainer
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Controller
          control={control}
          name="content"
          render={({field: {value, onChange}}) => (
            <CTextInput
              value={value}
              onChangeText={onChange}
              containerStyle={{flex: 0.9}}
              style={styles.textInput}
              withError={false}
            />
          )}
        />
        <Icon
          type="Ionicons"
          name="send"
          size={30}
          disabled={!isDirty}
          color={isDirty ? '#235195' : '#ababab'}
          onPress={handleSubmit(onSubmit)}
        />
      </BottomContainer>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    backgroundColor: '#f1f2f8',
  },
});
