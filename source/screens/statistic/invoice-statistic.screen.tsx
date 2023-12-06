import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StatisticStackParamsList} from '@/routes/ statistic.stack';
import {StackScreenProps} from '@react-navigation/stack';
import StatisticService, {
  EQueryCaseStatistic,
} from '../home/services/statistic.service';
import {useQueries} from 'react-query';
import moment from 'moment';
import ItemBillStatistic from './components/item-bill-statistic';
import Icon from '@/components/icon.component';
import CollapsableContainer from '@/components/collapsable-container';
import InvoiceChart from '../home/components/home-statistic/components/invoice-chart';
type Props = StackScreenProps<StatisticStackParamsList, 'INVOICE_STATISTIC'>;
const InvoiceStatisticScreen = (props: Props) => {
  const [visibleExpand, setVisibleExpand] = useState<
    'Debt' | 'Paid' | 'Payment' | undefined
  >(undefined);
  const queries = useQueries([
    {
      queryKey: ['invoice-statistic/total'],
      queryFn: () => StatisticService.getTotalStatisticUserBill({}),
    },
    {
      queryKey: ['invoice-statistic/apartmentBill'],
      queryFn: () =>
        StatisticService.GetApartmentBillStatistics({
          numberRange: 12,
          //   formId: EFormIdStatistic.GetAll,
          queryCase: EQueryCaseStatistic.ByMonth,
        }),
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        <View style={styles.monthBillContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Icon
                type="Ionicons"
                name="chevron-back-outline"
                size={24}
                color="#565656"
              />
            </TouchableOpacity>
            <Text style={styles.txtMonth}>Tháng {moment().month() + 1}</Text>
            <TouchableOpacity>
              <Icon
                type="Ionicons"
                name="chevron-forward-outline"
                size={24}
                color="#565656"
              />
            </TouchableOpacity>
          </View>
          <ItemBillStatistic
            title="Hóa đơn điện"
            content={
              queries[0]?.data?.data?.totalCostElectric
                ? Number(
                    queries[0]?.data?.data?.totalCostElectric,
                  ).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '-- đ'
            }
          />
          <ItemBillStatistic
            title="Hóa đơn nước"
            content={
              queries[0]?.data?.data?.totalCostWater
                ? Number(queries[0]?.data?.data?.totalCostWater).toLocaleString(
                    'vi-VN',
                    {style: 'currency', currency: 'VND'},
                  )
                : '-- đ'
            }
          />
          <ItemBillStatistic
            title="Hóa đơn quản lý"
            content={
              queries[0]?.data?.data?.totalCostManager
                ? Number(
                    queries[0]?.data?.data?.totalCostManager,
                  ).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '-- đ'
            }
          />
          <ItemBillStatistic
            title="Hóa đơn gửi xe"
            content={
              queries[0]?.data?.data?.totalCostParking
                ? Number(
                    queries[0]?.data?.data?.totalCostParking,
                  ).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '-- đ'
            }
          />
          <ItemBillStatistic
            title="Hóa đơn phí cư dân"
            content={
              queries[0]?.data?.data?.totalCostResidence
                ? Number(
                    queries[0]?.data?.data?.totalCostResidence,
                  ).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                : '-- đ'
            }
          />
          <ItemBillStatistic
            title="Hóa đơn khác"
            content={
              queries[0]?.data?.data?.totalCostOther
                ? Number(queries[0]?.data?.data?.totalCostOther).toLocaleString(
                    'vi-VN',
                    {style: 'currency', currency: 'VND'},
                  )
                : '-- đ'
            }
          />
          <ItemBillStatistic
            title="Tổng hóa đơn"
            content={
              queries[0]?.data?.data?.totalCost
                ? Number(queries[0]?.data?.data?.totalCost).toLocaleString(
                    'vi-VN',
                    {style: 'currency', currency: 'VND'},
                  )
                : '-- đ'
            }
            bold={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (visibleExpand === 'Debt') {
              setVisibleExpand(undefined);
            } else {
              setVisibleExpand('Debt');
            }
          }}
          style={styles.btnRow}>
          <Text>Tổng công nợ</Text>
          <Icon
            type="Ionicons"
            name="chevron-down-outline"
            size={24}
            color="#2E9BFF"
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <CollapsableContainer
            expanded={visibleExpand === 'Debt'}
            style={{width: '100%'}}>
            <View
              style={{
                paddingBottom: 12,
              }}>
              <ItemBillStatistic
                title="Tiền công nợ điện"
                content={
                  queries[0]?.data?.data?.totalDebtElectric
                    ? Number(
                        queries[0]?.data?.data?.totalDebtElectric,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền công nợ  nước"
                content={
                  queries[0]?.data?.data?.totalDebtWater
                    ? Number(
                        queries[0]?.data?.data?.totalDebtWater,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền công nợ quản lý"
                content={
                  queries[0]?.data?.data?.totalDebtManager
                    ? Number(
                        queries[0]?.data?.data?.totalDebtManager,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền công nợ gửi xe"
                content={
                  queries[0]?.data?.data?.totalDebtParking
                    ? Number(
                        queries[0]?.data?.data?.totalDebtParking,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền công nợ phí cư dân"
                content={
                  queries[0]?.data?.data?.totalDebtResidence
                    ? Number(
                        queries[0]?.data?.data?.totalDebtResidence,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền công nợ khác"
                content={
                  queries[0]?.data?.data?.totalDebtOther
                    ? Number(
                        queries[0]?.data?.data?.totalDebtOther,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tổng công nợ"
                content={
                  queries[0]?.data?.data?.totalDebt
                    ? Number(queries[0]?.data?.data?.totalDebt).toLocaleString(
                        'vi-VN',
                        {style: 'currency', currency: 'VND'},
                      )
                    : '-- đ'
                }
                bold={true}
              />
            </View>
          </CollapsableContainer>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (visibleExpand === 'Paid') {
              setVisibleExpand(undefined);
            } else {
              setVisibleExpand('Paid');
            }
          }}
          style={styles.btnRow}>
          <Text>Tổng hóa đơn đã thanh toán</Text>
          <Icon
            type="Ionicons"
            name="chevron-down-outline"
            size={24}
            color="#2E9BFF"
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <CollapsableContainer
            expanded={visibleExpand === 'Paid'}
            style={{width: '100%'}}>
            <View
              style={{
                paddingBottom: 12,
              }}>
              <ItemBillStatistic
                title="Tiền đã thanh toán điện"
                content={
                  queries[0]?.data?.data?.totalPaidElectric
                    ? Number(
                        queries[0]?.data?.data?.totalPaidElectric,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền đã thanh toán nước"
                content={
                  queries[0]?.data?.data?.totalPaidWater
                    ? Number(
                        queries[0]?.data?.data?.totalPaidWater,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền đã thanh toán quản lý"
                content={
                  queries[0]?.data?.data?.totalPaidManager
                    ? Number(
                        queries[0]?.data?.data?.totalPaidManager,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền đã thanh toán gửi xe"
                content={
                  queries[0]?.data?.data?.totalPaidParking
                    ? Number(
                        queries[0]?.data?.data?.totalPaidParking,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền đã thanh toán phí cư dân"
                content={
                  queries[0]?.data?.data?.totalPaidResidence
                    ? Number(
                        queries[0]?.data?.data?.totalPaidResidence,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền đã thanh toán khác"
                content={
                  queries[0]?.data?.data?.totalPaidOther
                    ? Number(
                        queries[0]?.data?.data?.totalPaidOther,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tổng tiền đã thanh toán"
                content={
                  queries[0]?.data?.data?.totalPaid
                    ? Number(queries[0]?.data?.data?.totalPaid).toLocaleString(
                        'vi-VN',
                        {style: 'currency', currency: 'VND'},
                      )
                    : '-- đ'
                }
                bold={true}
              />
            </View>
          </CollapsableContainer>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (visibleExpand === 'Payment') {
              setVisibleExpand(undefined);
            } else {
              setVisibleExpand('Payment');
            }
          }}
          style={styles.btnRow}>
          <Text>Tổng tiền thu</Text>
          <Icon
            type="Ionicons"
            name="chevron-down-outline"
            size={24}
            color="#2E9BFF"
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <CollapsableContainer
            expanded={visibleExpand === 'Payment'}
            style={{width: '100%'}}>
            <View
              style={{
                paddingBottom: 12,
              }}>
              <ItemBillStatistic
                title="Tiền thu tiền mặt"
                content={
                  queries[0]?.data?.data?.totalPaymentWithDirect
                    ? Number(
                        queries[0]?.data?.data?.totalPaymentWithDirect,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền thu chuyển khoản"
                content={
                  queries[0]?.data?.data?.totalPaymentWithBanking
                    ? Number(
                        queries[0]?.data?.data?.totalPaymentWithBanking,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền thu qua momo"
                content={
                  queries[0]?.data?.data?.totalPaymentWithMomo
                    ? Number(
                        queries[0]?.data?.data?.totalPaymentWithMomo,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền thu qua VNPay"
                content={
                  queries[0]?.data?.data?.totalPaymentWithVNPay
                    ? Number(
                        queries[0]?.data?.data?.totalPaymentWithVNPay,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tiền thu qua ZaloPay"
                content={
                  queries[0]?.data?.data?.totalPaymentWithZaloPay
                    ? Number(
                        queries[0]?.data?.data?.totalPaymentWithZaloPay,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
              />
              <ItemBillStatistic
                title="Tổng tiền thu"
                content={
                  queries[0]?.data?.data?.totalPaymentIncome
                    ? Number(
                        queries[0]?.data?.data?.totalPaymentIncome,
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : '-- đ'
                }
                bold={true}
              />
            </View>
          </CollapsableContainer>
        </View>
        <View
          style={{
            paddingHorizontal: '2%',
            paddingTop: '5%',
          }}>
          <InvoiceChart />
        </View>
      </ScrollView>
    </View>
  );
};

export default InvoiceStatisticScreen;

const styles = StyleSheet.create({
  monthBillContainer: {
    backgroundColor: '#F6F6F6',
    borderRadius: 24,
    marginHorizontal: '2%',
    marginVertical: '2%',
    paddingHorizontal: '3%',
    paddingVertical: '5%',
  },
  section: {
    marginHorizontal: '3%',
    paddingHorizontal: '2%',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    paddingVertical: '2%',
  },
  txtMonth: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
