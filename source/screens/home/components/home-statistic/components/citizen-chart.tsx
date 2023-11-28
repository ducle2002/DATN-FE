import React, {memo, useEffect, useMemo, useRef} from 'react';
import {useQuery} from 'react-query';
import StatisticService, {
  EFormGetCitizenId,
  EQueryCaseCitizenStatistics,
} from '@/screens/home/services/statistic.service';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import {LineChart} from 'echarts/charts';
import * as echarts from 'echarts/core';
import {useWindowDimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LineChart,
  LegendComponent,
]);

const CitizenChart = () => {
  const {width} = useWindowDimensions();
  const {data} = useQuery({
    queryKey: ['citizen-statistic', EFormGetCitizenId.GetAccepted],
    queryFn: () =>
      StatisticService.getStatisticsCitizen({
        numberRange: 7,
        queryCase: EQueryCaseCitizenStatistics.ByMonth,
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
          data: keys.map(key => data?.data[key].countTotal),
          type: 'line',
          name: t(languageKeys.chart.legend.countTotal),
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
        },
        {
          data: keys.map(key => data?.data[key].countNew),
          type: 'line',
          name: t(languageKeys.chart.legend.countNew),
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
        },
        {
          data: keys.map(key => data?.data[key].countAccepted),
          type: 'line',
          name: t(languageKeys.chart.legend.countAccepted),
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
        },
        {
          data: keys.map(key => data?.data[key].countRejected),
          type: 'line',
          name: t(languageKeys.chart.legend.countRejected),
          smooth: true,
          areaStyle: {
            opacity: 0.5,
          },
        },
      ],
      xTitle: keys,
      legend: [
        t(languageKeys.chart.legend.countRejected),
        t(languageKeys.chart.legend.countAccepted),
        t(languageKeys.chart.legend.countNew),
        t(languageKeys.chart.legend.countTotal),
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
        yAxis: {},
        series: chartData.series,
        legend: {
          data: chartData.legend,
          bottom: 0,
        },
        title: {
          text: 'Xác minh cư dân',
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

export default memo(CitizenChart);
