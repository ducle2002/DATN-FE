import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {GridComponent} from 'echarts/components';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {useTranslation} from 'react-i18next';
echarts.use([SVGRenderer, BarChart, GridComponent]);
const {width, height} = Dimensions.get('screen');
const BarRateReflectChart = ({
  dataXAxis = [],
  dataYAxis = ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
}: {
  dataXAxis: any[];
  dataYAxis?: any[];
}) => {
  const {t} = useTranslation();
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const E_HEIGHT = height * 0.4;
    const E_WIDTH = width * 0.93;

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
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#ced4da',
            },
          },
        },
        yAxis: {
          type: 'category',
          data: dataYAxis,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            data: dataXAxis,
            type: 'bar',
            name: 'Số đánh giá',
            smooth: true,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true,
            },
          },
        ],
        legend: {
          show: true,
          bottom: 5,
        },
        title: {
          text: 'Đánh giá',
          textStyle: {color: '#333'},
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#dee2e6',
        },
      });
    }
    return () => chart?.dispose();
  }, [dataXAxis, dataYAxis, t]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: width * 0.01,
        overflow: 'hidden',
        marginHorizontal: width * 0.025,
      }}>
      <SvgChart ref={chartRef} style={{borderRadius: 8, overflow: 'hidden'}} />
    </View>
  );
};

export default BarRateReflectChart;

const styles = StyleSheet.create({});
