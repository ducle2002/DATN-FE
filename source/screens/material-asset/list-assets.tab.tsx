import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {TAssetDetail} from '@/screens/material-asset/services/material-asset.model';
import MaterialCard from './components/material-asset-card';
import MaterialDetail from './components/material-detail';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {useListMaterialAssets} from './hooks/hook';
import {checkPermission} from '@/utils/utils';
import {useAppSelector} from '@/hooks/redux.hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
const {width, height} = Dimensions.get('screen');

type Props = StackScreenProps<MaterialAssetStackParamsList, 'MAIN_SCREEN'>;

const ListTab = ({navigation}: Props) => {
  const {grantedPermissions} = useAppSelector(state => state.config);
  const [selectedItem, selectItem] = useState<number | undefined>();

  const {fetchNextPage, data} = useListMaterialAssets();

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
          navigation.navigate('DETAIL_SCREEN', {
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
      />
      <MaterialDetail
        onBackdropPress={() => selectItem(undefined)}
        materialId={selectedItem}
      />
      {checkPermission(grantedPermissions, [
        'Pages.Assets.AssetCatalog.Create',
      ]) && (
        <BottomContainer>
          <Button mode="contained" onPress={() => selectItem(-1)}>
            {language.t(languageKeys.shared.button.add)}
          </Button>
        </BottomContainer>
      )}
    </View>
  );
};

export default ListTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
