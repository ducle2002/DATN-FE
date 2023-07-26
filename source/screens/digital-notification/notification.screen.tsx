import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import MainHeader from './components/main-header.component';
import Button from '@/components/button.component';
import {StackScreenProps} from '@react-navigation/stack';
import {NotificationStackParamsList} from '@/routes/notification.stack';
import {useInfiniteQuery} from 'react-query';
import DigitalNotiApi from '@/modules/digital-notification/digital-noti.service';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import NotiItem from './components/noti-item.component';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
const {width} = Dimensions.get('screen');

type Props = StackScreenProps<NotificationStackParamsList, 'MAIN_SCREEN'>;

const NotificationScreen = ({navigation}: Props) => {
  const {data} = useInfiniteQuery({
    queryFn: () =>
      DigitalNotiApi.getRequest({
        maxResultCount: 20,
        skipCount: 0,
        type: 2,
      }),
  });

  const dataProvider = useMemo(() => {
    return dataProviderMaker(data?.pages.map(page => page.data).flat() ?? []);
  }, [data?.pages]);

  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
      },
    ),
  ).current;
  const {listOrganizations} = useAppSelector(state => state.organizationUnit);

  const renderItem = useCallback(
    (_, data) => {
      const department = listOrganizations.find(
        o => o.organizationUnitId === data.organizationUnitId,
      );
      return RowRender(data, department?.displayName);
    },
    [listOrganizations],
  );

  return (
    <View style={{flex: 1}}>
      <MainHeader />
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        rowRenderer={renderItem}
        forceNonDeterministicRendering
      />
      <Button
        onPress={() => {
          navigation.navigate('CREATE_SCREEN', {});
        }}>
        <Text>Tao bai</Text>
      </Button>
    </View>
  );
};

const RowRender = (data: any, department: string | undefined) => {
  // const {listOrganizations} = useAppSelector(state => state.organizationUnit);
  // console.log(
  //   listOrganizations.find(
  //     o => o.organizationUnitId === data.organizationUnitId,
  //   ),
  // );

  return <NotiItem item={data} department={department} />;
};
export default NotificationScreen;

const styles = StyleSheet.create({});
