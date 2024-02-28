import {FlatList, ListRenderItem, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import RecorderItem from './components/recorder-item';
import language, {languageKeys} from '@/config/language/language';
import {
  MeterDrawerParamsList,
  MeterStackParamsList,
} from '@/routes/operating/meter.stack';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useListMeterMonthly} from './hooks/useListMeterMonthly';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import {TMeterMonthly} from './models/model';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useListMeterType} from './hooks/useListMeterTypes';
import FilterMeter from './components/filter';
import {MeterFilterContext, TFilter} from './hooks/MeterFilterContext';

type Props = CompositeScreenProps<
  DrawerScreenProps<MeterDrawerParamsList, 'LIST_INDEX'>,
  StackScreenProps<MeterStackParamsList, 'MAIN_SCREEN'>
>;

const Tab = createMaterialTopTabNavigator();

const MeterIndexScreen = ({navigation}: Props) => {
  const {meterTypes} = useListMeterType();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        title: language.t(languageKeys.meter.header.list),
      });
    }
  }, [isFocused, navigation]);

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 40,
        },
      }}>
      {meterTypes.map(type => (
        <Tab.Screen
          initialParams={{meterTypeId: type.id}}
          key={type.id}
          name={type.id.toString()}
          options={{
            tabBarLabel: type.name,
            tabBarLabelStyle: {textTransform: 'none'},
          }}
          component={ListScreen}
        />
      ))}
      {meterTypes.length === 0 && (
        <Tab.Screen name="NOT_FOUND" component={NotFound} />
      )}
    </Tab.Navigator>
  );
};

const NotFound = () => <View />;

export const ListScreen = ({navigation, route}: any) => {
  const [filters, setFilters] = useState<TFilter>({});

  const {data} = useListMeterMonthly({
    meterTypeId: route.params?.meterTypeId,
    meterId: route.params?.meterId,
    ...filters,
  });

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(
        data ? flatten(map(page => page.records, data.pages)) : [],
      ),
    [data],
  );

  const renderItem: ListRenderItem<TMeterMonthly> = ({item}) => (
    <RecorderItem item={item} navigation={navigation} />
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{paddingTop: 10}}
        data={dataProvider.getAllData()}
        renderItem={renderItem}
      />
      <BottomContainer>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <MeterFilterContext.Provider
            value={{
              filters: filters,
              setFilters: setFilters,
            }}>
            <FilterMeter filterOrganization={!route.params.meterId} />
          </MeterFilterContext.Provider>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate('READ_INDEX', {
                meterTypeId: route.params.meterTypeId,
              })
            }>
            {language.t(languageKeys.meter.action.addNew)}
          </Button>
        </View>
      </BottomContainer>
    </View>
  );
};

export default MeterIndexScreen;
