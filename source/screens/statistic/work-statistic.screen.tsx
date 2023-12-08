import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import StatisticService, {
  EBillStatusStatistics,
  EQueryCaseStatistic,
} from '../home/services/statistic.service';
import {useQueries} from 'react-query';
import moment from 'moment';
import LineChartCustom from './components/line-chart';
import PieChartCustom from './components/pie-chart-custom';

const WorkStatisticScreen = () => {
  const queries = useQueries([
    {
      queryKey: ['work-statistic/expired', EBillStatusStatistics.Expired],
      queryFn: () =>
        StatisticService.getStatisticsWork({
          queryCase: EQueryCaseStatistic.ByDay,
          month: moment().subtract(1, 'month').month() + 1,
          year: moment().year(),
          status: EBillStatusStatistics.Expired,
        }),
    },
    {
      queryKey: ['work-statistic/complete', EBillStatusStatistics.Complete],
      queryFn: () =>
        StatisticService.getStatisticsWork({
          queryCase: EQueryCaseStatistic.ByDay,
          month: moment().subtract(1, 'month').month() + 1,
          year: moment().year(),
          status: EBillStatusStatistics.Complete,
        }),
    },
    {
      queryKey: ['work-statistic/processing', EBillStatusStatistics.Processing],
      queryFn: () =>
        StatisticService.getStatisticsWork({
          queryCase: EQueryCaseStatistic.ByDay,
          month: moment().subtract(1, 'month').month() + 1,
          year: moment().year(),
          status: EBillStatusStatistics.Processing,
        }),
    },
    {
      queryKey: ['work-statistic/cancel', EBillStatusStatistics.Cancel],
      queryFn: () =>
        StatisticService.getStatisticsWork({
          queryCase: EQueryCaseStatistic.ByDay,
          month: moment().subtract(1, 'month').month() + 1,
          year: moment().year(),
          status: EBillStatusStatistics.Cancel,
        }),
    },
  ]);
  const pieData = useMemo(() => {
    let sum = {
      processing: 0,
      complete: 0,
      expired: 0,
      cancel: 0,
    };
    queries.forEach((listByMonth, index) => {
      if (listByMonth?.data?.data) {
        Object.keys(listByMonth.data.data).forEach((element: string) => {
          if (listByMonth.data.data[element]) {
            switch (index) {
              case 0:
                sum.expired += listByMonth.data.data[element];
                break;
              case 1:
                sum.complete += listByMonth.data.data[element];
                break;
              case 2:
                sum.processing += listByMonth.data.data[element];
                break;
              case 3:
                sum.cancel += listByMonth.data.data[element];
                break;
              default:
                break;
            }
          }
        });
      }
    });
    return sum;
  }, [queries]);

  return (
    <ScrollView>
      <View style={{paddingVertical: '3%'}}>
        <LineChartCustom
          dataXAxis={
            queries[0]?.data?.data &&
            queries[1]?.data?.data &&
            queries[2]?.data?.data &&
            queries[3]?.data?.data
              ? Object.keys(queries[0].data.data)
              : []
          }
          dataYAxis={
            queries[0]?.data?.data &&
            queries[1]?.data?.data &&
            queries[2]?.data?.data &&
            queries[3]?.data?.data
              ? [
                  {
                    name: 'Quá hạn xử lý',
                    data: Object.values(queries[0].data.data),
                  },
                  {
                    name: 'Hoàn thành',
                    data: Object.values(queries[1].data.data),
                  },
                  {
                    name: 'đang xử lý',
                    data: Object.values(queries[2].data.data),
                  },
                  {
                    name: 'đã đóng',
                    data: Object.values(queries[3].data.data),
                  },
                ]
              : []
          }
          title="Thống kê chi tiết"
        />
        <View style={{paddingTop: '2%'}}>
          <PieChartCustom
            title="Thống kê tỷ lệ"
            data={
              pieData
                ? Object.keys(pieData).map(el => {
                    switch (el) {
                      case 'processing':
                        return {
                          name: 'Đang xử lý',
                          value: pieData[el],
                        };
                      case 'complete':
                        return {
                          name: 'Hoàn thành',
                          value: pieData[el],
                        };
                      case 'expired':
                        return {
                          name: 'Quá hạn xử lý',
                          value: pieData[el],
                        };
                      case 'cancel':
                        return {
                          name: 'Đóng/hủy xử lý',
                          value: pieData[el],
                        };
                      default:
                        return {
                          name: '',
                          value: 0,
                        };
                    }
                  })
                : []
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkStatisticScreen;

const styles = StyleSheet.create({});
