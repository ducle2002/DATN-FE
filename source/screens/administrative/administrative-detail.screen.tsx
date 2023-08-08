import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
import Icon from '@/components/icon.component';
import moment from 'moment';
import InforTypeHtml from './components/infor-type-html';
import InforTypeOptions from './components/infor-type-options';
import InforTypeTable from './components/infor-type-table';
import {useMutation, useQueryClient} from 'react-query';
import AdministrativeApi from '@/modules/administrative/administrative.service';
import {useToast} from 'react-native-toast-notifications';
import LoadingComponent from '@/components/loading';
import {FILTER_FORMID} from '@/modules/administrative/administrative.contants';
const {width} = Dimensions.get('screen');
type Props = StackScreenProps<
  AdministrativeStackParamsList,
  'AdministrativeDetailScreen'
>;
const AdministrativeDetailScreen = ({route, navigation}: Props) => {
  const data = route.params.data;
  const config = route.params.config;
  const properties = JSON.parse(data.properties);
  const queryClient = useQueryClient();
  const toast = useToast();
  const {mutate: updateState, isLoading} = useMutation({
    mutationKey: ['confirmAdministrative'],
    mutationFn: (state: number) =>
      AdministrativeApi.UpdateStateAdministrative({
        id: data.id,
        state: state,
      }),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.show('Cập nhật trạng thái đơn thành công', {
          duration: 1000,
          type: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['AdministratvieGridView', data.adTypeId],
        });
        navigation.goBack();
      }
    },
    onError: err => {
      console.error(err);
      toast.show('Cập nhật trạng thái đơn thất bại', {
        duration: 1000,
        type: 'danger',
      });
    },
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 40,
          padding: '10%',
          zIndex: 10,
        }}>
        <Icon type="Ionicons" name="chevron-back" color={'#333'} size={24} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Icon
          type="Ionicons"
          name="information-circle"
          color={'#fca311'}
          size={60}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
          }}>
          {data.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#333',
          }}>
          Thời gian tạo: {moment(data.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
      {properties && config && (
        <View>
          {config.properties?.map((item, index) => {
            switch (item.type) {
              case 13:
                return (
                  <InforTypeHtml
                    key={index}
                    label={item.displayName}
                    value={properties[item.key]}
                  />
                );
              case 11:
                return (
                  <InforTypeOptions
                    key={index}
                    label={item.displayName}
                    optionValue={properties[item.key]}
                  />
                );
              case 9:
                return (
                  <InforTypeTable
                    key={index}
                    label={item.displayName}
                    tableValue={properties[item.key]}
                  />
                );
              default:
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: '2%',
                      paddingTop: '2%',
                    }}>
                    <Text style={styles.txtLabel}>{item.displayName}: </Text>
                    <Text style={styles.txtContent}>
                      {properties[item.key]}
                    </Text>
                  </View>
                );
            }
          })}
        </View>
      )}
      {data.state === 1 && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '5%',
            width: width,
            marginBottom: '15%',
            marginTop: '5%',
          }}>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.btn, styles.btnOutline]}
            onPress={() => {
              updateState(3);
            }}>
            <Text style={styles.txtBtn}>Từ chối</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.btn, styles.btnSolid]}
            onPress={() => {
              updateState(2);
            }}>
            <Text style={styles.txtBtn}>Chấp nhận</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading && <LoadingComponent />}
    </SafeAreaView>
  );
};

export default AdministrativeDetailScreen;

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  txtContent: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
  btn: {
    paddingVertical: '3%',
    width: width * 0.4,
    alignItems: 'center',
    borderRadius: 100,
  },
  btnOutline: {
    backgroundColor: '#FF6565',
  },
  btnSolid: {
    backgroundColor: '#0E3394',
  },
  txtBtn: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});
