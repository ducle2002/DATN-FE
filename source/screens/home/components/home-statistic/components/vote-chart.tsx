import {useWindowDimensions} from 'react-native';
import React, {memo, useEffect, useMemo, useRef} from 'react';
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

const VoteChart = () => {
  const {width} = useWindowDimensions();
  const {data} = useQuery({
    queryKey: ['vote-statistic', EFormIdStatistic.GetAll],
    queryFn: () =>
      StatisticService.getStatisticsVote({
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
          data: keys.map(key => data?.data[key].countVotes),
          type: 'bar',
          name: t(languageKeys.chart.legend.countVotes),
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
        },
        {
          data: keys.map(key => data?.data[key].countUserVotes),
          type: 'bar',
          name: t(languageKeys.chart.legend.countUserVotes),
          smooth: true,
        },
        {
          data: keys.map(key => data?.data[key].percentUserVotes * 100),
          type: 'line',
          name: t(languageKeys.chart.legend.percentUserVotes),
          smooth: true,
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: any) {
              return value + '%';
            },
          },
        },
      ],
      xTitle: keys,
      legend: [
        t(languageKeys.chart.legend.percentUserVotes),
        t(languageKeys.chart.legend.countUserVotes),
        t(languageKeys.chart.legend.countVotes),
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
          {
            type: 'value',
            name: 'Tỉ lệ',
            axisLabel: {
              formatter: '{value}%',
            },
          },
        ],
        series: chartData.series,
        legend: {
          data: chartData.legend,
          bottom: 0,
        },
        title: {
          text: 'Thống kê khảo sát',
        },
        tooltip: {
          trigger: 'axis',
        },
        backgroundColor: 'transparent',
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

export default memo(VoteChart);
