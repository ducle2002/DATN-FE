import {Dimensions, StyleSheet, View} from 'react-native';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useResidentData} from './services/resident.hook';
import {EResidentFormId, TResident} from './services/resident.model';
import ResidentItem from './components/resident-item';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import ResidentFilter from './components/filter';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import ResidentDetail from './components/resident-detail';
import MainHeader from '@/components/main-header.component';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import BottomContainer from '@/components/bottom-container.component';
import {ResidentFilterContext, TFilter} from './hooks/ResidentFilterContext';

const {width} = Dimensions.get('screen');
type Props = StackScreenProps<AppStackParamsList, 'RESIDENT_STACK'>;

const ResidentVerifyScreen = ({navigation}: Props) => {
  const [filters, setFilters] = useState<TFilter>({
    formId: EResidentFormId.ALL,
  });

  const {fetchNextPage, data} = useResidentData(filters);
  const [resident, setResident] = useState<TResident>();

  const renderItem = (_: any, item: TResident) => (
    <ResidentItem resident={item} viewItem={() => setResident(item)} />
  );

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.resident, data.pages)) : [],
    );
  }, [data]);

  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
        dim.height = 100;
      },
    ),
  ).current;

  const renderHeader = useCallback(
    (props: StackHeaderProps) => (
      <MainHeader
        {...props}
        onKeywordChange={kw => setFilters(old => ({...old, keyword: kw}))}
      />
    ),
    [setFilters],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
    });
  }, [navigation, renderHeader]);

  return (
    <View style={styles.container}>
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        rowRenderer={renderItem}
        onEndReached={() => {
          fetchNextPage();
        }}
        onEndReachedThreshold={20}
        contentContainerStyle={{
          paddingTop: 5,
          paddingBottom: 50,
        }}
        forceNonDeterministicRendering={true}
      />

      <ResidentDetail
        isVisible={!!resident}
        closeModal={() => setResident(undefined)}
        resident={resident}
        formId={filters.formId}
        keyword={filters.keyword}
      />
      <BottomContainer>
        <ResidentFilterContext.Provider
          value={{
            filters: filters,
            setFilters: setFilters,
          }}>
          <ResidentFilter />
        </ResidentFilterContext.Provider>
      </BottomContainer>
    </View>
  );
};

export default ResidentVerifyScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
