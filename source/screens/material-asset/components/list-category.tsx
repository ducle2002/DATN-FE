import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {CategoryTabParamsList} from '../category-management.screen';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialAssetStackParamsList} from '@/routes/material-asset.stack';
import {useListCategory} from '@/screens/material-asset/services/material-category.hook';
import BottomContainer from '@/components/bottom-container.component';
import {TAssetFilter} from '@/screens/material-asset/services/material-asset.model';
import globalStyles from '@/config/globalStyles';
import language, {languageKeys} from '@/config/language/language';
import Icon from '@/components/icon.component';
import Button from '@/components/button.component';
import CategoryDetail from './category-detail';

type Props = CompositeScreenProps<
  MaterialTopTabScreenProps<CategoryTabParamsList>,
  StackScreenProps<MaterialAssetStackParamsList, 'CATEGORY_MANAGEMENT'>
>;

const ListCategory = ({route}: Props) => {
  const {type} = route.params;

  const [page, setPage] = useState(0);
  const {data, fetchNextPage, hasNextPage} = useListCategory(type);

  const onNextPage = () => {
    fetchNextPage().then(() => setPage(page + 1));
  };

  const onPreviousPage = () => {
    setPage(page - 1);
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
  const renderItem: ListRenderItem<TAssetFilter> = ({item}) => (
    <View style={styles.row}>
      <View style={[styles.cell, {flex: 1}]}>
        <Text style={[styles.textValue, {flex: 1}]}>{item.code}</Text>
      </View>
      <View style={[styles.cell, {flex: 1}]}>
        <Text style={[styles.textValue, {flex: 1}]}>{item.name}</Text>
      </View>
      <View style={[styles.cell, {flex: 1}]}>
        <Text style={[styles.textValue, {flex: 1}]}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.cell, {flex: 1}]}>
          <Text style={[styles.textLabel]}>
            {language.t(languageKeys.materialAsset.category.code)}
          </Text>
        </View>
        <View style={[styles.cell, {flex: 1}]}>
          <Text style={[styles.textLabel, {flex: 1}]}>
            {language.t(languageKeys.materialAsset.category.name)}
          </Text>
        </View>
        <View style={[styles.cell, {flex: 1}]}>
          <Text style={[styles.textLabel, {flex: 1}]}>
            {language.t(languageKeys.materialAsset.category.description)}
          </Text>
        </View>
      </View>
      <FlatList data={data?.pages[page].dataFilter} renderItem={renderItem} />
      <CategoryDetail
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        type={type}
        name={route.name}
      />
      <BottomContainer>
        <View style={{flexDirection: 'row'}}>
          <Button mode="contained" onPress={toggleVisible}>
            {language.t(languageKeys.shared.button.add)}
          </Button>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 100,
              justifyContent: 'space-around',
              marginLeft: 'auto',
            }}>
            {page !== 0 && (
              <Icon
                onPress={onPreviousPage}
                name="play-skip-back"
                type="Ionicons"
                size={20}
              />
            )}
            <Text style={styles.textLabel}>{page + 1}</Text>
            {hasNextPage && (
              <Icon
                onPress={onNextPage}
                name="play-skip-forward"
                type="Ionicons"
                size={20}
              />
            )}
          </View>
        </View>
      </BottomContainer>
    </View>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',

    backgroundColor: 'white',
  },
  cell: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#f1f1f8',
  },
  textLabel: {
    ...globalStyles.text15Bold,
  },
  textValue: {
    ...globalStyles.text15Medium,
  },
});
