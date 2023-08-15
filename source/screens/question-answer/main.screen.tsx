import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {useInfiniteQuery} from 'react-query';
import QAApi from '@/modules/qa/qa.service';
import Filter from './components/filter.component';
import {EQAFormID, TQuestion} from '@/modules/qa/qa.model';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import QuestionItem from './components/question-item.component';
import MainHeader from '@/components/main-header.component';
import {StackScreenProps} from '@react-navigation/stack';
import {QAStackParamsList} from '@/routes/question-answer.stack.screen';

type Props = StackScreenProps<QAStackParamsList, 'MAIN_SCREEN'>;

const MainScreen = ({navigation}: Props) => {
  const [formId, setFormId] = useState<EQAFormID>(EQAFormID.ADMIN_GETALL);

  const [keyword, setKeyword] = useState('');

  const {data, remove, refetch, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['q-a'],
    queryFn: ({pageParam = {maxSkipcount: 10}}) =>
      QAApi.getAllQASocialRequest({
        ...pageParam,
        formId: formId,
        keyword,
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

  const onEndReached = () => {
    fetchNextPage();
  };

  const onKeywordChange = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  const renderHeader = useCallback(
    () => <MainHeader keywordChange={onKeywordChange} />,
    [onKeywordChange],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
      headerShown: true,
    });
  }, [navigation, renderHeader]);

  const onRefresh = () => {
    remove();
    refetch();
  };

  useEffect(() => {
    remove();
    refetch();
  }, [formId, refetch, remove, keyword]);

  return (
    <View style={styles.container}>
      <Filter selected={formId} onChange={(id: EQAFormID) => setFormId(id)} />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
        }
        contentContainerStyle={{paddingTop: 16}}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
