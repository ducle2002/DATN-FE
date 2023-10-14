import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {EWorkStatus, TWork} from './services/work.model';
import {useWorkQuery} from './services/hook';
import WorkItemComponent from './components/work-item.component';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import MyWorkFilter from './components/my-work-filter.component';
import LinearGradientHeader from '@/components/linear-gradient-header.component';
import {HeaderTitle} from '@react-navigation/elements';
import language, {languageKeys} from '@/config/language/language';
import Icon from '@/components/icon.component';
import {CompositeScreenProps} from '@react-navigation/native';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = CompositeScreenProps<
  StackScreenProps<WorkStackParamsList, 'MAIN_DRAWER'>,
  StackScreenProps<AppStackParamsList, 'WORK_MANAGEMENT'>
>;

const MyWorkScreen = ({navigation}: Props) => {
  const renderHeader = useCallback(
    (props: StackHeaderProps) => (
      <LinearGradientHeader headerProps={props}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}>
          <HeaderTitle style={{alignSelf: 'center', color: 'white'}}>
            {language.t(languageKeys.workManagement.header.myWork)}
          </HeaderTitle>
          <Icon
            type="MaterialCommunityIcons"
            name="account-cog"
            size={30}
            color="white"
            style={{position: 'absolute', right: 0}}
            onPress={() => navigation.navigate('SETTING_SCREEN')}
          />
        </View>
      </LinearGradientHeader>
    ),
    [navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      header: props => renderHeader(props),
    });
  }, [navigation, renderHeader]);

  const [status, setStatus] = useState(EWorkStatus.DOING);
  const {data, fetchNextPage} = useWorkQuery({
    selectedStatus: status,
    selectedFormId: undefined,
  });

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(
        data ? flatten(map(page => page.works, data.pages)) : [],
      ),
    [data],
  );

  const renderItem: ListRenderItem<TWork> = ({item}) => (
    <WorkItemComponent
      onPress={() => navigation.navigate('DETAIL_WORK', {id: item.id})}
      {...{item}}
    />
  );

  return (
    <View style={styles.container}>
      <MyWorkFilter select={stt => setStatus(stt)} selected={status} />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage()}
        contentContainerStyle={{paddingTop: 10}}
      />
    </View>
  );
};

export default MyWorkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
