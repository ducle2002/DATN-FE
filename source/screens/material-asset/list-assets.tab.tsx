import {
  Dimensions,
  RefreshControl,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {TAssetDetail} from '@/screens/material-asset/services/material-asset.model';
import MaterialCard from './components/material-asset-card';
import MaterialDetail from './components/material-detail';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {
  AssetFilterContext,
  TAssetFilter,
  useListMaterialAssets,
} from './hooks/hook';
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import AssetFilter from './components/asset-filter';
import MainHeader from '@/components/main-header.component';
const {width, height} = Dimensions.get('screen');

type Props = StackScreenProps<MaterialAssetStackParamsList, 'MAIN_SCREEN'>;

const ListTab = ({navigation}: Props) => {
  const {grantedPermissions} = useAppSelector(state => state.config);
  const [selectedItem, selectItem] = useState<number | undefined>();
  const [filters, setFilters] = useState<TAssetFilter>();
  const [isVisible, setIsVisible] = useState(false);

  const {fetchNextPage, data, refetch, remove, isLoading} =
    useListMaterialAssets({
      keyword: filters?.keyword,
      systemCode: filters?.systemCode,
      status: filters?.status,
      form: filters?.form,
      group: filters?.group,
    });

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.assets, data.pages)) : [],
    );
  }, [data]);

  const renderItem = (_: any, item: TAssetDetail) => (
    <MaterialCard
      {...{item, navigation}}
      onPress={() => {
        if (item.id) {
          navigation.navigate('DETAIL_TAB', {
            screen: 'DETAIL_SCREEN',
            params: {id: item.id},
            id: item.id,
          });
        }
      }}
    />
  );

  const onEndReached = () => {
    fetchNextPage();
  };

  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
        dim.height = height / 8;
      },
    ),
  ).current;

  const renderHeader = useCallback((props: StackHeaderProps) => {
    return (
      <MainHeader
        {...props}
        onKeywordChange={kw => {
          setFilters(old => ({...old, keyword: kw}));
        }}
      />
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      header: props => renderHeader(props),
    });
  }, [navigation, renderHeader]);

  const onRefresh = () => {
    remove();
    refetch();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        rowRenderer={renderItem}
        onEndReached={onEndReached}
        style={{
          paddingTop: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
      <MaterialDetail
        onBackdropPress={() => selectItem(undefined)}
        materialId={selectedItem}
      />
      {checkPermission(grantedPermissions, [
        'Pages.Assets.AssetCatalog.Create',
      ]) && (
        <BottomContainer>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button mode="contained" onPress={() => selectItem(-1)}>
              {language.t(languageKeys.shared.button.add)}
            </Button>
            <Button
              onPress={() => {
                setIsVisible(true);
              }}
              mode="contained-tonal">
              {language.t(languageKeys.shared.button.filter)}
            </Button>
            <Button
              icon={'camera'}
              mode="outlined"
              onPress={() => navigation.navigate('QR_SCANNER')}>
              Quét mã QR
            </Button>
          </View>
        </BottomContainer>
      )}
      <AssetFilterContext.Provider
        value={{filters: filters, setFilters: flt => setFilters(flt)}}>
        <AssetFilter
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        />
      </AssetFilterContext.Provider>
    </View>
  );
};

export default ListTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
