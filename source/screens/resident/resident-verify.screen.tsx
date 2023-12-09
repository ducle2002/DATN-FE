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
import {useQuery} from 'react-query';
import {ResidentApi} from './services/resident.services';

const {width} = Dimensions.get('screen');
type Props = StackScreenProps<AppStackParamsList, 'RESIDENT_STACK'>;

const ResidentVerifyScreen = ({navigation, route}: Props) => {
  const [filters, setFilters] = useState<TFilter>({
    formId: EResidentFormId.ALL,
  });

  const {fetchNextPage, data} = useResidentData(filters);
  const [citizenId, setCitizenId] = useState(route.params?.id);

  const renderItem = (_: any, item: TResident) => (
    <ResidentItem resident={item} viewItem={() => setCitizenId(item.id)} />
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

  const {data: resident} = useQuery({
    queryKey: ['citizen'],
    queryFn: () => ResidentApi.getById({id: citizenId ?? -1}),
    enabled: !!citizenId && citizenId > 0,
  });

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
        isVisible={!!citizenId}
        closeModal={() => setCitizenId(undefined)}
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
