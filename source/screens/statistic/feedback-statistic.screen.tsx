import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StatisticStackParamsList} from '@/routes/ statistic.stack';
import BarRateReflectChart from './components/bar-rate-reflect-chart';
import StatisticService, {
  EFormIdStatistic,
  EQueryCaseStatistic,
} from '../home/services/statistic.service';
import {useQueries} from 'react-query';
import ScrollViewChart from './components/scroll-view-chart';
import LineChartCustom from './components/line-chart';
import BarChartCustom from './components/bar-chart';
type Props = StackScreenProps<StatisticStackParamsList, 'FEEDBACK_STATISTIC'>;
const FeedbackStatisticScreen = (props: Props) => {
  const queries = useQueries([
    {
      queryKey: [
        'reflect-statistic/number-reflect/all',
        EFormIdStatistic.GetAll,
        EQueryCaseStatistic.ByDay,
      ],
      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 12,
          formId: EFormIdStatistic.GetAll,
          queryCase: EQueryCaseStatistic.ByDay,
        }),
    },
    {
      queryKey: [
        'reflect-statistic/number-reflect/complete',
        EFormIdStatistic.GetCompleted,
        EQueryCaseStatistic.ByDay,
      ],
      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 12,
          formId: EFormIdStatistic.GetCompleted,
          queryCase: EQueryCaseStatistic.ByDay,
        }),
    },
    {
      queryKey: [
        'reflect-statistic/TimeProcessReflect',
        EFormIdStatistic.GetCompleted,
        EQueryCaseStatistic.Other,
      ],
      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 12,
          formId: EFormIdStatistic.GetCompleted,
          queryCase: EQueryCaseStatistic.Other,
        }),
    },
    {
      queryKey: [
        'reflect-statistic/number-rate',
        EFormIdStatistic.GetCompleted,
        EQueryCaseStatistic.ByOther,
      ],
      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 12,
          formId: EFormIdStatistic.GetCompleted,
          queryCase: EQueryCaseStatistic.ByOther,
        }),
    },
    {
      queryKey: [
        'reflect-statistic/monthly/all',
        EFormIdStatistic.GetAll,
        EQueryCaseStatistic.ByDay,
      ],

      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 12,
          formId: EFormIdStatistic.GetAll,
          queryCase: EQueryCaseStatistic.ByMonth,
        }),
    },
    {
      queryKey: [
        'reflect-statistic/monthly/complete',
        EFormIdStatistic.GetCompleted,
        EQueryCaseStatistic.ByDay,
      ],

      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 12,
          formId: EFormIdStatistic.GetCompleted,
          queryCase: EQueryCaseStatistic.ByMonth,
        }),
    },
  ]);
  const countReflect = useMemo(() => {
    let sumComplete = 0;
    let sumAll = 0;
    if (queries[5]?.data?.data) {
      Object.values(queries[5].data.data).forEach(el => {
        sumComplete += Number(el);
      });
    }
    if (queries[4]?.data?.data) {
      Object.values(queries[4].data.data).forEach(el => {
        sumAll += Number(el);
      });
    }
    return {
      all: sumAll,
      complete: sumComplete,
    };
  }, [queries]);

  return (
    <View>
      <View
        style={{
          paddingVertical: '8%',
        }}>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Phản ánh đã xử lý</Text>
          <Text style={styles.txtContent}>{countReflect.complete}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabel}>Phản ánh chưa xử lý</Text>
          <Text style={styles.txtContent}>
            {countReflect.all - countReflect.complete}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.txtLabelBold}>Tổng số lượng phản ánh</Text>
          <Text style={styles.txtContentBold}>{countReflect.all}</Text>
        </View>
      </View>

      <ScrollViewChart numberChart={4}>
        <View style={{flexDirection: 'row'}}>
          <BarChartCustom
            dataXAxis={
              queries[4]?.data?.data && queries[5]?.data?.data
                ? Object.keys(queries[4].data.data)
                : []
            }
            dataYAxis={
              queries[4]?.data?.data && queries[5]?.data?.data
                ? [
                    {
                      name: 'Phản ánh của cư dân',
                      data: Object.values(queries[4].data.data),
                    },
                    {
                      name: 'Phản ánh đã xử lý',
                      data: Object.values(queries[5].data.data),
                    },
                  ]
                : []
            }
            title="Phản ánh của cư dân"
          />
          <LineChartCustom
            dataXAxis={
              queries[0]?.data?.data && queries[1]?.data?.data
                ? Object.keys(queries[0].data.data)
                : []
            }
            dataYAxis={
              queries[0]?.data?.data && queries[1]?.data?.data
                ? [
                    {
                      name: 'Phản ánh của cư dân',
                      data: Object.values(queries[0].data.data),
                    },
                    {
                      name: 'Phản ánh đã xử lý',
                      data: Object.values(queries[1].data.data),
                    },
                  ]
                : []
            }
            title="Phản ánh của cư dân"
          />
          <BarChartCustom
            nameXAxis="Ngày"
            dataXAxis={
              queries[2]?.data?.data
                ? Object.keys(queries[2].data.data).map(el => {
                    switch (el) {
                      case '1 days':
                        return '1';
                      case '1 days - 3 days':
                        return '1-3';
                      case '3 days - 5 days':
                        return '3-5';
                      case '> 5 days':
                        return '>5';
                      default:
                        return '';
                    }
                  })
                : []
            }
            dataYAxis={
              queries[2]?.data?.data
                ? [
                    {
                      name: 'Thời gian trung bình xử lý phản ánh',
                      data: Object.values(queries[2].data.data),
                    },
                  ]
                : []
            }
            title="Thời gian xử lý phản ánh"
          />
          <BarRateReflectChart
            dataXAxis={
              queries[3]?.data?.data ? Object.values(queries[3].data.data) : []
            }
          />
        </View>
      </ScrollViewChart>
    </View>
  );
};

export default FeedbackStatisticScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DEDFE0',
    backgroundColor: '#fff',
    marginHorizontal: '2%',
    marginTop: 8,
    borderRadius: 5,
  },
  txtLabel: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    color: '#333861',
  },
  txtLabelBold: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16,
    color: '#333861',
  },
  txtContent: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#151522',
  },
  txtContentBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#151522',
  },
});
