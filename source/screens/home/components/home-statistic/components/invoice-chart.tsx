import {useWindowDimensions} from 'react-native';
import React, {useEffect, useMemo, useRef} from 'react';
import {useQuery} from 'react-query';
import StatisticService, {
  EFormIdStatistic,
  EQueryCaseStatistic,
} from '@/screens/home/services/statistic.service';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import {BarChart, LineChart} from 'echarts/charts';
import * as echarts from 'echarts/core';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
import ChartContainer from './chart-container';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LineChart,
  LegendComponent,
  BarChart,
]);

const InvoiceChart = () => {
  const {width} = useWindowDimensions();
  const {data} = useQuery({
    queryKey: ['bill-statistic'],
    queryFn: () =>
      StatisticService.GetApartmentBillStatistics({
        numberRange: 7,
        formId: EFormIdStatistic.GetAll,
        queryCase: EQueryCaseStatistic.ByMonth,
      }),
  });

  const {t} = useTranslation();

  const chartData = useMemo(() => {
    if (!data) {
      return {};
    }
    const keys = Object.keys(data.data);
    return {
      series: [
        {
          data: keys.map(key => data?.data[key].sumPaid),
          type: 'bar',
          name: t(languageKeys.chart.legend.paid),
          smooth: true,
          stack: 'bill',
        },
        {
          data: keys.map(key => data?.data[key].sumUnpaid),
          type: 'bar',
          name: t(languageKeys.chart.legend.unpaid),
          smooth: true,
          stack: 'bill',
        },
        {
          data: keys.map(key => data?.data[key].sumDebt),
          type: 'bar',
          name: t(languageKeys.chart.legend.debt),
          smooth: true,
          stack: 'bill',
        },
      ],
      xTitle: keys,
      legend: [
        t(languageKeys.chart.legend.paid),
        t(languageKeys.chart.legend.unpaid),
        t(languageKeys.chart.legend.debt),
      ],
    };
  }, [data, t]);

  const chartRef = useRef<any>(null);

  useEffect(() => {
    const E_HEIGHT = 250;
    const E_WIDTH = width - 24;

    let chart: any;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'dark', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption({
        backgroundColor: 'transparent',

        xAxis: {
          type: 'category',
          data: chartData.xTitle,
        },
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: (value: number) => value / 1000000,
            },
            name: 'Triệu đồng',
          },
        ],
        series: chartData.series,
        legend: {
          data: chartData.legend,
          bottom: 0,
        },
        title: {
          text: 'Thông kê hóa đơn',
        },
        tooltip: {
          trigger: 'axis',
          valueFormatter: (value: number) => {
            return Intl.NumberFormat('vi', {
              style: 'currency',
              currency: 'vnd',
            }).format(value);
          },
        },
      });
    }
    return () => chart?.dispose();
  }, [chartData, width]);

  return (
    <ChartContainer>
      <SvgChart ref={chartRef} style={{borderRadius: 10, overflow: 'hidden'}} />
    </ChartContainer>
  );
};

export default InvoiceChart;
