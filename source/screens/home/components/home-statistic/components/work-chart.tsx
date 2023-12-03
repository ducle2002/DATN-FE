import {useWindowDimensions} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useQuery} from 'react-query';
import StatisticService, {
  EQueryCaseStatistic,
} from '@/screens/home/services/statistic.service';
import moment from 'moment';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import {PieChart} from 'echarts/charts';
import * as echarts from 'echarts/core';
import ChartContainer from './chart-container';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LegendComponent,
  PieChart,
]);

const WorkChart = () => {
  const {width} = useWindowDimensions();
  const {t} = useTranslation();
  const {data} = useQuery({
    queryKey: ['work-overview'],
    queryFn: () =>
      StatisticService.getStatisticsWork({
        queryCase: EQueryCaseStatistic.ByMonth,
        month: moment().subtract(1, 'month').month() + 1,
      }),
  });

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
        series: [
          {
            name: 'Công việc',
            type: 'pie',
            radius: '50%',
            data: [
              {
                value: data?.data['Hoàn thành'],
                name: t(languageKeys.chart.legend.complete),
                itemStyle: {color: '#56F000'},
              },
              {
                value: data?.data['Quá hạn xử lý'],
                name: t(languageKeys.chart.legend.expired),
                itemStyle: {
                  color: '#FF3838',
                },
              },
              {
                value: data?.data['Đang xử lý'],
                name: t(languageKeys.chart.legend.pending),
                itemStyle: {color: '#FCE83A'},
              },
              {
                value: data?.data['Đóng/Hủy'],
                name: t(languageKeys.chart.legend.cancel),
                itemStyle: {color: '#A4ABB6'},
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        title: {
          text: 'Thống kê công việc',
          subtext: moment().subtract(1, 'month').format('MMMM YYYY'),
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          bottom: 0,
        },
        backgroundColor: 'transparent',
      });
    }
    return () => chart?.dispose();
  }, [data?.data, t, width]);

  return (
    <ChartContainer>
      <SvgChart ref={chartRef} style={{borderRadius: 10, overflow: 'hidden'}} />
    </ChartContainer>
  );
};

export default WorkChart;
