import {FlatList, ListRenderItem, StatusBar, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useListMeterType} from './hooks/useListMeterTypes';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';
import {
  MeterDrawerParamsList,
  MeterStackParamsList,
} from '@/routes/operating/meter.stack';
import language, {languageKeys} from '@/config/language/language';
import {useListMeters} from './hooks/useListMeter';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {flatten, map} from 'ramda';
import {MeterFilterContext, TFilter} from './hooks/MeterFilterContext';
import BottomContainer from '@/components/bottom-container.component';
import Button from '@/components/button.component';
import FilterMeter from './components/filter';
import {TMeter} from './models/model';
import MeterItem from './components/meter-item';

type Props = CompositeScreenProps<
  DrawerScreenProps<MeterDrawerParamsList, 'LIST_METER'>,
  StackScreenProps<MeterStackParamsList, 'MAIN_SCREEN'>
>;

const Tab = createMaterialTopTabNavigator();

const ListMeterScreen = ({navigation}: Props) => {
  const {meterTypes} = useListMeterType();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      navigation.getParent()?.setOptions({
        title: language.t(languageKeys.meter.header.meters),
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
const ListScreen = ({navigation, route}: any) => {
  const [filters, setFilters] = useState<TFilter>({});

  const {data} = useListMeters({
    meterTypeId: route.params.meterTypeId,
    ...filters,
  });

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(
        data ? flatten(map(page => page.meters, data.pages)) : [],
      ),
    [data],
  );

  const renderItem: ListRenderItem<TMeter> = ({item}) => (
    <MeterItem item={item} navigation={navigation} />
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={dataProvider.getAllData()}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: 10}}
      />
      <BottomContainer>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <MeterFilterContext.Provider
            value={{
              filters: filters,
              setFilters: setFilters,
            }}>
            <FilterMeter filterMeter={true} />
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

export default ListMeterScreen;
