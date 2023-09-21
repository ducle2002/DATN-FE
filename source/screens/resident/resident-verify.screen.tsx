import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useResidentData} from './services/resident.hook';
import {EResidentFormId, TResident} from './services/resident.model';
import ResidentItem from './components/resident-item';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import ResidentFilter from './components/filter';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';
import ResidentDetail from './components/resident-detail';

const {width} = Dimensions.get('screen');
type Props = StackScreenProps<AppStackParamsList, 'RESIDENT_STACK'>;

const ResidentVerifyScreen = ({navigation}: Props) => {
  const [formId, setFormId] = useState(EResidentFormId.ALL);
  const {fetchNextPage, dataProvider} = useResidentData(formId);

  const [resident, setResident] = useState<TResident>();

  const renderItem = (_: any, item: TResident) => (
    <ResidentItem resident={item} viewItem={() => setResident(item)} />
  );

  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
        dim.height = 150;
      },
    ),
  ).current;

  return (
    <View style={{flex: 1}}>
      <ResidentFilter selected={formId} onChange={value => setFormId(value)} />
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        rowRenderer={renderItem}
        onEndReached={() => {
          fetchNextPage();
        }}
      />

      <ResidentDetail
        isVisible={!!resident}
        closeModal={() => setResident(undefined)}
        resident={resident}
      />
    </View>
  );
};

export default ResidentVerifyScreen;

const styles = StyleSheet.create({});
