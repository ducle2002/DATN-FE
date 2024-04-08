import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import AdministrativeApi from '@/modules/administrative/administrative.service';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '@/components/icon.component';
import {StackScreenProps} from '@react-navigation/stack';
import {AdministrativeStackParamsList} from '@/routes/administrative.stack';
import ListAdministrativeOrder from './components/list-administrative-order';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
type Props = StackScreenProps<
  AdministrativeStackParamsList,
  'AdministrativeScreen'
>;
const AdministrativeScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {data: listTypeAdministrative} = useQuery({
    queryKey: ['administrativeConfig'],
    queryFn: () => AdministrativeApi.GetInitViewTypeAdministrative(),
  });
  const [selectTypeAdmin, setSelectTypeAdmin] = useState(0);
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            type="Ionicons"
            name="chevron-back-outline"
            color={'#333'}
            size={24}
          />
        </Pressable>

        <Text style={styles.txtHeader}>
          {t(languageKeys.administrative.main.title)}
        </Text>
        <Pressable
          onPress={() => {
            // navigation.goBack();
          }}>
          <Icon type="Ionicons" name="options" color={'#333'} size={24} />
        </Pressable>
      </View>
      {listTypeAdministrative && (
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.btnTypeAdministrative}
            onPress={() => {
              setVisible(true);
            }}>
            <Text style={styles.txtBtnTypeAdministrative} numberOfLines={2}>
              {listTypeAdministrative[selectTypeAdmin]?.name}
            </Text>
            <Icon
              type="Ionicons"
              name="chevron-down-outline"
              color={'#333'}
              size={18}
            />
          </TouchableOpacity>
          <ListAdministrativeOrder
            typeAdministrative={listTypeAdministrative[selectTypeAdmin]}
          />
        </View>
      )}
      <Modal visible={visible} transparent>
        <Pressable onPress={onClose} style={styles.backDropModal}>
          <TouchableWithoutFeedback>
            <View style={styles.contentModal}>
              <View style={styles.headerModalTypeAdmin}>
                <Text style={styles.txtHeaderModalTypeAdmin}>
                  {t(languageKeys.administrative.main.modalType.title)}
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.txtClose}>
                    {' '}
                    {t(languageKeys.administrative.main.modalType.close)}
                  </Text>
                </TouchableOpacity>
              </View>
              {listTypeAdministrative?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.btnItemTypeAdmin,
                      {
                        backgroundColor:
                          index === selectTypeAdmin
                            ? 'rgba(173,232,244, 0.5)'
                            : '#e9ecef',
                      },
                    ]}
                    onPress={() => {
                      if (selectTypeAdmin !== index) {
                        setSelectTypeAdmin(index);
                      }
                      onClose();
                    }}>
                    <Text style={styles.txtBtnItemTypeAdmin}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default AdministrativeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: '3%',
    paddingVertical: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  btnTypeAdministrative: {
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#dee2e6',
  },
  txtBtnTypeAdministrative: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  btnItemTypeAdmin: {
    paddingVertical: '4%',
    paddingHorizontal: 10,
    marginBottom: '2%',
    borderRadius: 8,
  },
  txtBtnItemTypeAdmin: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  txtHeaderModalTypeAdmin: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  txtClose: {
    fontSize: 15,
    fontWeight: '400',
    color: '#333',
  },
  headerModalTypeAdmin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '4%',
  },
  backDropModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  contentModal: {
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    paddingVertical: '5%',
  },
});
