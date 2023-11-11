import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import globalStyles from '@/config/globalStyles';
import moment from 'moment';
import Icon from '@/components/icon.component';
import DropdownMenuComponent from '@/components/dropdown-menu.component';
import {
  STATUS_ORDER_LOCAL_SERVICE,
  TLocalServiceManagementOrder,
} from '../services/local-service-management.model';
import {Divider, Menu} from 'react-native-paper';
import {chipWithStatus} from '../services/local-service-management.hook';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {LocalServiceManagementStackParamsList} from '@/routes/local-service-management';
import {EWorkAssociationType} from '@/screens/work-management/services/work.model';
import {AppStackParamsList} from '@/routes/app.stack';
import {StackNavigationProp} from '@react-navigation/stack';
const {width, height} = Dimensions.get('screen');
const ItemLocalService = ({
  item,
  index,
  disable = true,
  onDelete,
  onUpdateState,
  openExchangeModal,
}: {
  item: TLocalServiceManagementOrder;
  index: number;
  disable: boolean;
  onDelete?: Function;
  onUpdateState?: Function;
  openExchangeModal?: Function;
}) => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<
          AppStackParamsList,
          'LOCAL_SERVICE_MANAGEMENT_STACK'
        >,
        StackNavigationProp<LocalServiceManagementStackParamsList>
      >
    >();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const chipInfo = useMemo(() => {
    return chipWithStatus(item.status);
  }, [item]);
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        navigation.navigate('LOCAL_SERVICE_MANAGEMENT_STACK', {
          screen: 'DETAIL_ORDER_SCREEN',
          params: {
            orderInfo: item,
          },
        });
      }}>
      <View style={{paddingBottom: '2%'}}>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Loại dịch vụ: </Text>
          <Text style={styles.txtContent}>{item?.serviceText}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Người đặt: </Text>
          <Text style={styles.txtContent}>{item?.creatorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Địa chỉ: </Text>
          <Text style={styles.txtContent}>{item?.address}</Text>
        </View>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.txtCurrency}>
            {item.totalAmount.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
          <Text style={styles.txtDate}>
            {moment(item?.creationTime).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={
          <TouchableOpacity
            disabled={
              (item.status === STATUS_ORDER_LOCAL_SERVICE.COMPLETE ||
                item.status === STATUS_ORDER_LOCAL_SERVICE.CANCEL ||
                item.status === STATUS_ORDER_LOCAL_SERVICE.EXCHANGE) &&
              disable
            }
            style={[
              styles.row,
              styles.chipStatus,
              {
                backgroundColor: chipInfo.color,
                paddingVertical: '2%',
              },
            ]}
            onPress={openMenu}>
            <Text
              numberOfLines={1}
              style={[
                styles.txtChip,
                {
                  color: chipInfo.txtColor,
                },
              ]}>
              {chipInfo.label}
            </Text>
            <Icon
              type="Ionicons"
              name="chevron-down-outline"
              size={18}
              color={chipInfo.txtColor}
            />
          </TouchableOpacity>
        }
        contentStyle={{backgroundColor: 'white'}}
        style={{
          width: width * 0.9,
          backgroundColor: 'transparent',
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        {item.status === STATUS_ORDER_LOCAL_SERVICE.PENDING && (
          <View>
            <TouchableOpacity
              disabled={disable}
              style={styles.btnMenu}
              onPress={() => {
                onDelete?.();
                closeMenu();
              }}>
              <Icon
                name="delete"
                type="MaterialCommunityIcons"
                size={24}
                color={'#F04438'}
              />
              <Text style={styles.txtBtnMenu}>Xóa</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        {(item.status === STATUS_ORDER_LOCAL_SERVICE.PENDING ||
          item.status === STATUS_ORDER_LOCAL_SERVICE.ACCEPT) && (
          <View>
            <TouchableOpacity
              disabled={disable}
              style={styles.btnMenu}
              onPress={() => {
                closeMenu();
                openExchangeModal?.(item);
              }}>
              <Icon
                name="comment-quote"
                type="MaterialCommunityIcons"
                size={24}
                color={'#F79009'}
              />
              <Text style={styles.txtBtnMenu}>Phản hồi</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        {item.status === STATUS_ORDER_LOCAL_SERVICE.PENDING && (
          <View>
            <TouchableOpacity
              disabled={disable}
              style={styles.btnMenu}
              onPress={() => {
                closeMenu();
                onUpdateState?.(STATUS_ORDER_LOCAL_SERVICE.ACCEPT);
              }}>
              <Icon
                name="arrow-right-bold"
                type="MaterialCommunityIcons"
                size={24}
                color={'#1d4e89'}
              />
              <Text style={styles.txtBtnMenu}>Tiếp nhận</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        {item.status === STATUS_ORDER_LOCAL_SERVICE.PENDING && (
          <View>
            <TouchableOpacity
              disabled={disable}
              style={styles.btnMenu}
              onPress={() => {
                closeMenu();
                onUpdateState?.(STATUS_ORDER_LOCAL_SERVICE.CANCEL);
              }}>
              <Icon
                name="backspace-reverse"
                type="MaterialCommunityIcons"
                size={24}
                color={'#F04438'}
              />
              <Text style={styles.txtBtnMenu}>Hủy dịch vụ</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        {item.status === STATUS_ORDER_LOCAL_SERVICE.ACCEPT && (
          <View>
            <TouchableOpacity
              disabled={disable}
              style={styles.btnMenu}
              onPress={() => {
                closeMenu();
                navigation?.navigate('WORK_MANAGEMENT', {
                  screen: 'CREATE_WORK',
                  params: {
                    items: [
                      {
                        relatedId: item.id,
                        relationshipType: EWorkAssociationType.LOCAL_SERVICE,
                      },
                    ],
                  },
                });
              }}>
              <Icon
                name="clipboard-text"
                type="MaterialCommunityIcons"
                size={24}
                color={'#e76f51'}
              />
              <Text style={styles.txtBtnMenu}>Giao việc</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        {item.status === STATUS_ORDER_LOCAL_SERVICE.ACCEPT && (
          <View>
            <TouchableOpacity
              disabled={disable}
              style={styles.btnMenu}
              onPress={() => {
                onUpdateState?.(STATUS_ORDER_LOCAL_SERVICE.PROCESSING);
                closeMenu();
              }}>
              <Icon
                name="clock-fast"
                type="MaterialCommunityIcons"
                size={24}
                color={'#0077b6'}
              />
              <Text style={styles.txtBtnMenu}>Thực hiện</Text>
            </TouchableOpacity>
            <Divider />
          </View>
        )}
        {(item.status === STATUS_ORDER_LOCAL_SERVICE.ACCEPT ||
          item.status === STATUS_ORDER_LOCAL_SERVICE.PROCESSING) && (
          <TouchableOpacity
            disabled={disable}
            style={styles.btnMenu}
            onPress={() => {
              onUpdateState?.(STATUS_ORDER_LOCAL_SERVICE.UNPAID);
              closeMenu();
            }}>
            <Icon
              name="calendar-check"
              type="MaterialCommunityIcons"
              size={24}
              color={'#2b9348'}
            />
            <Text style={styles.txtBtnMenu}>Hoàn thành</Text>
          </TouchableOpacity>
        )}
        {item.status === STATUS_ORDER_LOCAL_SERVICE.UNPAID && (
          <TouchableOpacity
            disabled={disable}
            style={styles.btnMenu}
            onPress={() => {
              onUpdateState?.(STATUS_ORDER_LOCAL_SERVICE.COMPLETE);
              closeMenu();
            }}>
            <Icon
              name="credit-card-check"
              type="MaterialCommunityIcons"
              size={24}
              color={'#F79009'}
            />
            <Text style={styles.txtBtnMenu}>Thanh toán</Text>
          </TouchableOpacity>
        )}
      </Menu>
    </TouchableOpacity>
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
    marginTop: 8,
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
  btnMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  txtBtnMenu: {
    ...globalStyles.text15Medium,
    paddingLeft: 12,
  },
  txtCurrency: {
    ...globalStyles.text14SemiBold,
    color: '#0077b6',
    paddingTop: '1%',
  },
  txtDate: {
    ...globalStyles.text12Regular,
    color: '#adb5bd',
  },
});
