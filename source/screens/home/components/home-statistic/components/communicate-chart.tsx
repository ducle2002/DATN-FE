import {useWindowDimensions} from 'react-native';
import React, {memo, useEffect, useMemo, useRef} from 'react';
import StatisticService, {
  EFormIdStatistic,
  EQueryCaseStatistic,
} from '@/screens/home/services/statistic.service';
import {useQuery} from 'react-query';
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

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LineChart,
  LegendComponent,
  BarChart,
]);

const CommunicateChart = () => {
  const {width} = useWindowDimensions();
  const {data} = useQuery({
    queryKey: ['chat-statistic', EFormIdStatistic.GetAll],
    queryFn: () =>
      StatisticService.getStatisticsChat({
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
          data: keys.map(key => data?.data[key].countChatOrganizations),
          type: 'bar',
          name: t(languageKeys.chart.legend.countChatOrganizations),
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
        },
        {
          data: keys.map(key => data?.data[key].countChatReflects),
          type: 'bar',
          name: t(languageKeys.chart.legend.countChatReflects),
          smooth: true,
        },
      ],
      xTitle: keys,
      legend: [
        t(languageKeys.chart.legend.countChatOrganizations),
        t(languageKeys.chart.legend.countChatReflects),
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
        xAxis: {
          type: 'category',
          data: chartData.xTitle,
        },
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: chartData.series,
        legend: {
          data: chartData.legend,
          bottom: 0,
        },
        title: {
          text: 'Thông kê giao tiếp',
        },
        tooltip: {
          trigger: 'axis',
        },
      });
    }
    return () => chart?.dispose();
  }, [chartData, width]);

  return (
    <SvgChart ref={chartRef} style={{borderRadius: 10, overflow: 'hidden'}} />
  );
};

export default memo(CommunicateChart);
