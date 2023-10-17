import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {
  TMaterialAsset,
  materialDefault,
} from '@/screens/material-asset/services/material-asset.model';
import MaterialCard from './components/material-asset-card';
import MaterialDetail from './components/material-detail';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {useListMaterialAssets} from './hooks/hook';
const {width, height} = Dimensions.get('screen');

type Props =
  // CompositeScreenProps<
  // MaterialTopTabScreenProps<MaterialTabParamsList, 'LIST'>,
  StackScreenProps<MaterialAssetStackParamsList, 'MAIN_SCREEN'>;
// >;

const ListTab = ({navigation}: Props) => {
  const [selectedItem, selectItem] = useState<TMaterialAsset | undefined>();

  const {fetchNextPage, dataProvider} = useListMaterialAssets();

  const onPressItem = (item: TMaterialAsset) => {
    selectItem(item);
  };

  const renderItem = (_: any, item: TMaterialAsset) => (
    <MaterialCard {...{item, navigation}} onPress={() => onPressItem(item)} />
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
        material={selectedItem}
      />
      <BottomContainer>
        <Button
          mode="contained"
          onPress={() => selectItem(materialDefault as TMaterialAsset)}>
          {language.t(languageKeys.shared.button.add)}
        </Button>
      </BottomContainer>
    </View>
  );
};

export default ListTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
