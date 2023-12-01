import StatisticService, {
  EFormIdStatistic,
  EQueryCaseStatistic,
} from '../../../services/statistic.service';
import moment from 'moment';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import * as echarts from 'echarts/core';
import {LineChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import {Dimensions} from 'react-native';
import {useQueries} from 'react-query';
import React, {memo, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';

const {width} = Dimensions.get('screen');
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LineChart,
  LegendComponent,
]);

const ReflectStatistics = () => {
  const queries = useQueries([
    {
      queryKey: [
        'reflect-statistic',
        EFormIdStatistic.GetAll,
        EQueryCaseStatistic.ByDay,
      ],
      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 7,
          formId: EFormIdStatistic.GetAll,
          queryCase: EQueryCaseStatistic.ByDay,
        }),
    },
    {
      queryKey: [
        'reflect-statistic',
        EFormIdStatistic.GetCompleted,
        EQueryCaseStatistic.ByDay,
      ],
      queryFn: () =>
        StatisticService.getStatisticsReflect({
          numberRange: 7,
          formId: EFormIdStatistic.GetCompleted,
          queryCase: EQueryCaseStatistic.ByDay,
        }),
    },
  ]);

  const {t} = useTranslation();
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const E_HEIGHT = 250;
    const E_WIDTH = width - 24;

    const chartData1 = queries[0].data
      ? Object.keys(queries[0].data?.data)
          .filter(key => {
            const date = moment(key, 'D-MM');
            return date.isBefore(moment());
          })
          .slice(-7)
          .map(key => ({key: key, value: queries[0].data?.data[key]}))
      : [];

    const chartData2 = queries[1].data
      ? Object.keys(queries[1].data?.data)
          .filter(key => {
            const date = moment(key, 'D-MM');
            return date.isBefore(moment());
          })
          .slice(-7)
          .map(key => ({key: key, value: queries[1].data?.data[key]}))
      : [];

    let chart: any;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'dark', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption({
        xAxis: {
          type: 'category',
          data: chartData1.map(m => m.key),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: chartData1.map(m => m.value),
            type: 'line',
            name: t(languageKeys.chart.legend.all),
            smooth: true,
            areaStyle: {
              opacity: 0.5,
            },
          },
          {
            data: chartData2.map(m => m.value),
            type: 'line',
            name: t(languageKeys.chart.legend.complete),
            smooth: true,
          },
        ],
        legend: {
          orient: 'vertical',
          data: [
            t(languageKeys.chart.legend.all),
            t(languageKeys.chart.legend.complete),
          ],
          right: 0,
          type: 'scroll',
        },
        title: {
          text: 'Số lượt phản ánh',
        },
        tooltip: {
          trigger: 'axis',
        },
      });
    }
    return () => chart?.dispose();
  }, [queries, t]);

  return (
    <SvgChart ref={chartRef} style={{borderRadius: 10, overflow: 'hidden'}} />
  );
};
export default memo(ReflectStatistics);
