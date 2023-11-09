import {StyleSheet, View} from 'react-native';
import React, {useState, useMemo, createContext} from 'react';
import ItemLocalService from './components/item-local-service';
import DropdownModalComponent from '@/components/dropdown-modal.component';
import {useInfiniteQuery} from 'react-query';
import LocalServiceManagementApi from './services/local-service-management.service';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LocalServiceManagementStackParamsList} from '@/routes/local-service-management';
import {StackScreenProps} from '@react-navigation/stack';
import TabTitle from './components/tab-title';
import BookingListService from './components/booking-list-service';
import language, {languageKeys} from '@/config/language/language';

export type BookingLocalServiceManagementTabParamsList = {
  NewBooking: {
    StatusTab: number;
  };
  ProcessingBooking: {
    StatusTab: number;
  };
  CompleteBooking: {
    StatusTab: number;
  };
};
export const LocalServiceManagementContext = createContext<any[]>([]);

const Tab =
  createMaterialTopTabNavigator<BookingLocalServiceManagementTabParamsList>();
type Props = StackScreenProps<LocalServiceManagementStackParamsList>;
const LocalServiceManagementScreen = (props: Props) => {
  const renderTitle = ({focused, name}: {focused: boolean; name: string}) => (
    <TabTitle name={name} focused={focused} />
  );
  const {
    data: listService,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['localService/history/listService'],
    queryFn: ({pageParam}) =>
      LocalServiceManagementApi.getAllListService({
        skipCount: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      let skip = 0;
      allPages.forEach(page => {
        if (page.data) {
          skip += page.data.length;
        }
      });

      if (skip < lastPage.totalRecords) {
        return skip;
      }
      return null;
    },
  });
  const [selectedService, setSelectedService] = useState<number | undefined>(
    undefined,
  );
  const dataDropDown = useMemo(() => {
    return listService?.pages.flatMap(el => [...el.data]) ?? [];
  }, [listService]);
  return (
    <LocalServiceManagementContext.Provider
      value={[selectedService, setSelectedService]}>
      <View style={{flex: 1}}>
        <DropdownModalComponent
          options={dataDropDown.map(el => {
            return {
              label: el.title,
              id: el.id,
            };
          })}
          selectedLabel={
            dataDropDown.find(el => el.id === selectedService)?.title ??
            'Mặc định'
          }
          onSelected={(_v: number | undefined) => {
            setSelectedService(_v);
          }}
          degAnimation={180}
          style={[
            styles.filterSelect,
            {
              paddingRight: 4,
              alignItems: 'center',
              backgroundColor: 'white',
            },
          ]}
          // valueStyle={styles.txtChip}
        />
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: false,
            tabBarIndicatorStyle: {backgroundColor: '#339FD9'},
            lazy: true,
          }}
          backBehavior="none">
          <Tab.Screen
            name="NewBooking"
            component={BookingListService}
            options={{
              tabBarLabel: ({focused}) =>
                renderTitle({
                  focused: focused,
                  name: language.t(
                    languageKeys.localServiceManagement.statusTab.pending,
                  ),
                }),
            }}
            initialParams={{StatusTab: 1}}
          />
          <Tab.Screen
            name="ProcessingBooking"
            component={BookingListService}
            options={{
              tabBarLabel: ({focused}) =>
                renderTitle({
                  focused: focused,
                  name: language.t(
                    languageKeys.localServiceManagement.statusTab.processing,
                  ),
                }),
            }}
            initialParams={{StatusTab: 2}}
          />
          <Tab.Screen
            name="CompleteBooking"
            component={BookingListService}
            options={{
              tabBarLabel: ({focused}) =>
                renderTitle({
                  focused: focused,
                  name: language.t(
                    languageKeys.localServiceManagement.statusTab.complete,
                  ),
                }),
            }}
            initialParams={{StatusTab: 3}}
          />
        </Tab.Navigator>
        <ItemLocalService />
      </View>
    </LocalServiceManagementContext.Provider>
  );
};

export default LocalServiceManagementScreen;

const styles = StyleSheet.create({
  filterSelect: {
    padding: 4,
    borderRadius: 6,
    // flex: 1,
    // justifyContent: 'center',
  },
});
