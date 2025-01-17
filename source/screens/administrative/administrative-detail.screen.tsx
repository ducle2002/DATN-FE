import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
import Icon from '@/components/icon.component';
import moment from 'moment';
import InforTypeHtml from './components/infor-type-html';
import InforTypeOptions from './components/infor-type-options';
import InforTypeTable from './components/infor-type-table';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import AdministrativeApi from '@/modules/administrative/administrative.service';
import {useToast} from 'react-native-toast-notifications';
import LoadingComponent from '@/components/loading';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
const {width} = Dimensions.get('screen');
type Props = StackScreenProps<
  AdministrativeStackParamsList,
  'AdministrativeDetailScreen'
>;
const AdministrativeDetailScreen = ({route, navigation}: Props) => {
  const {id} = route.params;
  const [properties, setProperties] = useState<{
    [key: string]: string | any[];
  }>();
  const queryClient = useQueryClient();
  const toast = useToast();
  const {t} = useTranslation();
  const {data} = useQuery({
    queryKey: ['adminstrative', id],
    queryFn: () =>
      AdministrativeApi.GetAdministrativeById({
        id: id,
      }),
    onSuccess: result => {
      setProperties(JSON.parse(result.properties));
    },
  });

  const {data: config} = useQuery({
    queryKey: ['config', data?.adTypeId],
    queryFn: () =>
      AdministrativeApi.getAdministrativeConfig({typeId: data?.adTypeId ?? 0}),
    enabled: !!data?.adTypeId,
  });

  const {mutate: updateState, isLoading} = useMutation({
    mutationKey: ['confirmAdministrative'],
    mutationFn: (state: number) =>
      AdministrativeApi.UpdateStateAdministrative({
        id: id,
        state: state,
      }),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.show('Cập nhật trạng thái đơn thành công', {
          duration: 1000,
          type: 'success',
        });
        queryClient.refetchQueries({
          queryKey: ['AdministratvieGridView', data?.adTypeId],
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
          {data?.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: '#333',
          }}>
          Thời gian tạo: {moment(data?.creationTime).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
      {properties && config && (
        <View>
          {config.map((item: any, index: number) => {
            switch (item.type) {
              case 13:
                return (
                  <InforTypeHtml
                    key={index}
                    label={item.displayName}
                    value={properties[item.key] as string}
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
                    tableValue={properties[item.key] as any[]}
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
      {data?.state === 1 && (
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
            <Text style={styles.txtBtn}>
              {t(languageKeys.administrative.main.decline)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.btn, styles.btnSolid]}
            onPress={() => {
              updateState(2);
            }}>
            <Text style={styles.txtBtn}>
              {t(languageKeys.administrative.main.accept)}
            </Text>
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
