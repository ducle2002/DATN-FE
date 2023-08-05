import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TAdminidtrativeConfig} from '@/modules/administrative/administrative.model';
import {useInfiniteQuery} from 'react-query';
import AdministrativeApi from '@/modules/administrative/administrative.service';
import AdministrativeIcon from '@assets/icons/administrative.svg';

import {FILTER_FORMID} from '@/modules/administrative/administrative.contants';
import moment from 'moment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
const {width, height} = Dimensions.get('screen');
type Props = {
  typeAdministrative: TAdminidtrativeConfig;
};
const ListAdministrativeOrder = ({typeAdministrative}: Props) => {
  const naviagtion =
    useNavigation<NavigationProp<AdministrativeStackParamsList>>();
  const [formId, setFormId] = useState(FILTER_FORMID[0].type);
  const {data: administrativeOrderData, refetch} = useInfiniteQuery({
    queryKey: ['AdministratvieGridView', typeAdministrative.id],
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
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.itemOrder}
              onPress={() => {
                naviagtion.navigate('AdministrativeDetailScreen', {
                  data: item,
                  config: typeAdministrative,
                });
              }}>
              <View style={styles.iconContainer}>
                <AdministrativeIcon width={24} height={24} />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 14,
                    color: '#2D2E31',
                  }}
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 13,
                    color: '#2D2E31',
                  }}>
                  {moment(item.creationTime).format('HH:mm DD/MM/YYYY')}
                </Text>
              </View>
            </TouchableOpacity>
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
  itemOrder: {
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    backgroundColor: 'white',
    marginBottom: '3%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#2874CE',
    borderRadius: 20,
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
  },
});
