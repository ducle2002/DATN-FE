import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TAdminidtrativeConfig} from '@/modules/administrative/administrative.model';
import {useInfiniteQuery} from 'react-query';
import AdministrativeApi from '@/modules/administrative/administrative.service';

import {FILTER_FORMID} from '@/modules/administrative/administrative.contants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
import ItemAdministrative from './item-administrative';
const {width, height} = Dimensions.get('screen');
type Props = {
  typeAdministrative: TAdminidtrativeConfig;
};
const ListAdministrativeOrder = ({typeAdministrative}: Props) => {
  const naviagtion =
    useNavigation<NavigationProp<AdministrativeStackParamsList>>();
  const [formId, setFormId] = useState(FILTER_FORMID[0].type);
  const {
    data: administrativeOrderData,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['AdministratvieGridView', typeAdministrative?.id],
    queryFn: ({pageParam}) =>
      AdministrativeApi.GetAdministratvieGridView({
        FormId: formId,
        skipCount: pageParam,
        ADTypeId: typeAdministrative.id,
      }),
    getNextPageParam: (lastPage, allPages) => {
      let skip = 0;
      allPages.forEach(page => {
        if (page.listData) {
          skip += page.listData.length;
        }
      });

      if (skip < lastPage.total) {
        return skip;
      }
      return null;
    },
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeAdministrative, formId]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.filterFormId}>
        {FILTER_FORMID.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.btnFormId,
                {
                  backgroundColor: item.type === formId ? '#4AC3FB' : 'white',
                  borderColor:
                    formId === item.type ? '#4AC3FB' : 'rgba(0,0,0,0.25)',
                },
              ]}
              onPress={() => {
                if (item.type !== formId) {
                  setFormId(item.type);
                }
              }}>
              <Text style={{color: item.type === formId ? 'white' : '#818181'}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: '3%',
          paddingBottom: height * 0.1,
        }}
        data={
          administrativeOrderData?.pages
            ? administrativeOrderData.pages.flatMap(page => [...page.listData])
            : []
        }
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({item, index}) => {
          return (
            <ItemAdministrative
              item={item}
              onPress={() => {
                naviagtion.navigate('AdministrativeDetailScreen', {
                  id: item.id,
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default ListAdministrativeOrder;

const styles = StyleSheet.create({
  btnFormId: {
    borderWidth: 1,
    paddingVertical: '1.5%',
    paddingHorizontal: '2%',
    borderRadius: 8,
    width: width * 0.28,
    alignItems: 'center',
  },
  filterFormId: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '5%',
    paddingHorizontal: '2%',
  },
});
