import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import Icon from '@/components/icon.component';
import DropdownMenuComponent from '@/components/dropdown-menu.component';

const ItemLocalService = () => {
  const [valueStatus, setValueStatus] = useState('Chờ xác nhận');
  const STATUS = [
    {
      label: 'Chờ xác nhận',
      id: 1,
    },
    {
      label: 'Đang xử lí',
      id: 2,
    },
    {
      label: 'Đã hoàn thành',
      id: 3,
    },
  ];
  return (
    <View style={[styles.container, styles.row]}>
      <View style={{flex: 2}}>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Người đặt: </Text>
          <Text style={styles.txtContent}>Nguyễn Văn A</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Liên hệ: </Text>
          <Text style={styles.txtContent}>0973389056</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Ngày đặt: </Text>
          <Text style={styles.txtContent}>{moment().format('DD/MM/YYYY')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Căn hộ: </Text>
          <Text style={styles.txtContent}>{'A1001'}</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={[styles.row, styles.chipStatus]}>
        <Text numberOfLines={1} style={styles.txtChip}>
          Chờ tiếp nhận
        </Text>
        <Icon
          type="Ionicons"
          name="chevron-down-outline"
          size={18}
          color={'#fff'}
        />
      </TouchableOpacity> */}
      <DropdownMenuComponent
        options={STATUS}
        selectedLabel={valueStatus}
        onSelected={(_v: any) => {
          setValueStatus(
            STATUS.find(el => el.id === _v)?.label ?? 'Chờ xác nhận',
          );
        }}
        iconCustom={
          <Icon
            type="Ionicons"
            name="chevron-down-outline"
            size={18}
            color={'white'}
          />
        }
        degAnimation={180}
        style={[
          styles.chipStatus,
          {
            paddingRight: 4,
            alignItems: 'center',
            backgroundColor:
              valueStatus === 'Chờ xác nhận'
                ? '#4895ef'
                : valueStatus === 'Đang xử lí'
                ? '#ffc300'
                : '#007f5f',
          },
        ]}
        valueStyle={styles.txtChip}
      />
    </View>
  );
};

export default ItemLocalService;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLabel: {
    ...globalStyles.text15SemiBold,
  },
  txtContent: {
    ...globalStyles.text14Medium,
  },
  chipStatus: {
    padding: 4,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
  },
  txtChip: {
    ...globalStyles.text13SemiBold,
    color: '#fff',
  },
});
