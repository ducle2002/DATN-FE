import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {useListImportExport} from './hooks/hook';
import {TImportExportDocs} from '@/screens/material-asset/services/material-asset.model';
import ImportExportCard from './components/import-export.card';
import ImportExportDetail from './components/import-export-detail';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
const {width, height} = Dimensions.get('screen');

type Props = StackScreenProps<MaterialAssetStackParamsList, 'IMPORT_EXPORT'>;

const ImportExportScreen = ({route}: Props) => {
  const {type} = route.params;
  const {dataProvider, fetchNextPage} = useListImportExport(type);
  const [selectedItem, selectItem] = useState<TImportExportDocs>();

  const renderItem = (_: any, item: TImportExportDocs) => (
    <ImportExportCard onPress={() => selectItem(item)} doc={item} />
  );

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
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        contentContainerStyle={{paddingTop: 10}}
        rowRenderer={renderItem}
        onEndReached={() => fetchNextPage()}
        renderAheadOffset={3000}
      />
      <ImportExportDetail
        doc={selectedItem}
        onBackdropPress={() => {
          selectItem(undefined);
        }}
      />
      {/* <BottomContainer>
        <Button mode="contained">
          {language.t(languageKeys.shared.button.add)}
        </Button>
      </BottomContainer> */}
    </View>
  );
};

export default ImportExportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
