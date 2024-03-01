import {View, RefreshControl} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {useInfiniteQuery, useMutation, useQueryClient} from 'react-query';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {LocalServiceManagementStackParamsList} from '@/routes/local-service-management';
import LocalServiceManagementApi from '../services/local-service-management.service';
import {TLocalServiceManagementOrder} from '../services/local-service-management.model';
import {
  BookingLocalServiceManagementTabParamsList,
  LocalServiceManagementContext,
} from '../local-service-management.screen';
import ItemLocalService from './item-local-service';
import {useToast} from 'react-native-toast-notifications';
import ReactNativeModal from 'react-native-modal';
import ExchangeModal from './exchange-modal';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BookingLocalServiceManagementTabParamsList>,
  StackScreenProps<LocalServiceManagementStackParamsList>
>;

export default function BookingListService(props: Props) {
  const {StatusTab} = props.route.params;
  const toast = useToast();
  const queryClient = useQueryClient();
  const [exchangeModalProp, setExchangeModalProp] = useState<{
    data?: TLocalServiceManagementOrder;
    visible: boolean;
  }>({
    data: undefined,
    visible: false,
  });
  const closeExchangeModal = () => {
    setExchangeModalProp({
      data: undefined,
      visible: false,
    });
  };
  const [selectedService] = useContext(LocalServiceManagementContext);
  const {
    data: listOrder,
    isRefetching,
    refetch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
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

  const {mutate: updateState, isLoading: loadingUpdateState} = useMutation({
    mutationKey: ['localService/updateState'],
    mutationFn: (data: {id: number; typeAction: number}) =>
      LocalServiceManagementApi.updateState(data),
    onSuccess: () => {
      refetch();
      queryClient.refetchQueries(['localService/listAllOrder']);
      toast.show('Cập nhật trạng thái thành công', {
        type: 'success',
        placement: 'center',
        duration: 1000,
      });
    },
    onError: () => {
      toast.show('Cập nhật trạng thái thất bại', {
        type: 'danger',
        placement: 'center',
        duration: 1000,
      });
    },
  });
  const {mutate: deleteOrder, isLoading: loadingDeleteOrder} = useMutation({
    mutationKey: ['localService/deleteOrder'],
    mutationFn: (params: {id: number}) =>
      LocalServiceManagementApi.deleteOrder(params),
    onSuccess: () => {
      refetch();
      // queryClient.refetchQueries(['localService/listAllOrder']);
      toast.show('Xóa đơn thành công', {
        type: 'success',
        placement: 'center',
        duration: 1000,
      });
    },
    onError: () => {
      toast.show('Xóa đơn thất bại', {
        type: 'danger',
        placement: 'center',
        duration: 1000,
      });
    },
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: TLocalServiceManagementOrder;
    index: number;
  }) => {
    return (
      <ItemLocalService
        item={item}
        index={index}
        disable={loadingUpdateState || loadingDeleteOrder}
        onDelete={() => {
          deleteOrder({
            id: item.id,
          });
        }}
        onUpdateState={(typeAction: number) => {
          updateState({
            id: item.id,
            typeAction: typeAction,
          });
        }}
        openExchangeModal={(data: TLocalServiceManagementOrder) => {
          setExchangeModalProp({
            data: data,
            visible: true,
          });
        }}
      />
    );
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
        onEndReached={() => {
          if (
            !isFetchingNextPage &&
            hasNextPage
            // totalRecordsData >= Number(dataOrder?.length)
          ) {
            fetchNextPage();
          }
        }}
      />
      <ReactNativeModal
        statusBarTranslucent={true}
        backdropOpacity={0.2}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        swipeDirection={'down'}
        onBackdropPress={closeExchangeModal}
        isVisible={exchangeModalProp.visible}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View>
          <ExchangeModal
            data={exchangeModalProp.data}
            onClose={closeExchangeModal}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
}
