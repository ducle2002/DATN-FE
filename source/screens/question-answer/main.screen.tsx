import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import QAApi from '@/modules/qa/qa.service';
import Filter from './components/filter.component';
import {EQAFormID, TQuestion} from '@/modules/qa/qa.model';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import QuestionItem from './components/question-item.component';

const MainScreen = () => {
  const [formId, setFormId] = useState<EQAFormID>(EQAFormID.ADMIN_GETALL);

  const {data, remove, refetch} = useInfiniteQuery({
    queryKey: ['q-a'],
    queryFn: ({pageParam = {maxSkipcount: 10}}) =>
      QAApi.getAllQASocial({
        ...pageParam,
        formId: formId,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 10;
      return (allPages.length - 1) * 10 + lastPage.questions.length !==
        lastPage.totalCount
        ? {
            maxResultCount: 10,
            skipCount: skipCount,
          }
        : undefined;
    },
  });

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(data?.pages.map(page => page.questions).flat() ?? []),
    [data?.pages],
  );

  const renderItem = useCallback<ListRenderItem<TQuestion>>(
    ({item}) => <QuestionItem question={item} />,
    [],
  );

  useEffect(() => {
    remove();
    refetch();
  }, [formId, refetch, remove]);

  return (
    <View style={styles.container}>
      <Filter selected={formId} onChange={(id: EQAFormID) => setFormId(id)} />
      <FlatList data={dataProvider.getAllData()} renderItem={renderItem} />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
