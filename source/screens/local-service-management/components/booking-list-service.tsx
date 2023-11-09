import {Dimensions, StyleSheet, View, RefreshControl} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {FlatList} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {LocalServiceManagementStackParamsList} from '@/routes/local-service-management';
import LocalServiceManagementApi from '../services/local-service-management.service';
import globalStyles from '@/config/globalStyles';
import {TLocalServiceManagementOrder} from '../services/local-service-management.model';
import {
  BookingLocalServiceManagementTabParamsList,
  LocalServiceManagementContext,
} from '../local-service-management.screen';
import ItemLocalService from './item-local-service';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BookingLocalServiceManagementTabParamsList>,
  StackScreenProps<LocalServiceManagementStackParamsList>
>;

export default function BookingListService(props: Props) {
  const {StatusTab} = props.route.params;
  const [selectedService] = useContext(LocalServiceManagementContext);
  const {
    data: listOrder,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['localService/listAllOrder', StatusTab, selectedService],
    queryFn: ({pageParam}) =>
      LocalServiceManagementApi.getAllListServiceOrder({
        StatusTab: StatusTab,
        ServiceId: selectedService,
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

  const dataOrder = useMemo(() => {
    return listOrder?.pages.flatMap(el => [...el.data]);
  }, [listOrder]);

  const renderItem = ({
    item,
    index,
  }: {
    item: TLocalServiceManagementOrder;
    index: number;
  }) => {
    return <ItemLocalService item={item} index={index} />;
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={dataOrder}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '10%',
        }}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //   txtCurrency: {
  //     ...globalStyles.text14SemiBold,
  //     color: '#0077b6',
  //     paddingTop: '1%',
  //   },
  //   row: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   txtDate: {
  //     ...globalStyles.text12Regular,
  //     color: '#adb5bd',
  //   },
  //   txtType: {
  //     ...globalStyles.text14SemiBold,
  //   },
  //   txtNote: {
  //     ...globalStyles.text13Medium,
  //     paddingTop: '1%',
  //   },
  //   cardItem: {
  //     backgroundColor: 'white',
  //     marginHorizontal: '2%',
  //     marginTop: '2%',
  //     padding: '3%',
  //     borderRadius: 8,
  //   },
});
