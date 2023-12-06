import {Dimensions, StyleSheet, TextStyle, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {GridComponent} from 'echarts/components';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {useTranslation} from 'react-i18next';
echarts.use([SVGRenderer, BarChart, GridComponent]);
const {width, height} = Dimensions.get('screen');
const PieChartCustom = ({
  data = [],
  title = '',
  titleStyle,
  nameChart,
  tooltipPosition,
}: {
  data: {
    value: any;
    name: string;
  }[];
  title: string;
  titleStyle?: TextStyle;
  nameChart?: string;
  tooltipPosition?: string[];
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
        series: [
          {
            data: data,
            type: 'pie',
            radius: '50%',
            name: nameChart ?? title,
            smooth: true,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        legend: {
          show: true,
          bottom: 5,
        },
        title: {
          text: title,
          textStyle: {color: '#333', ...titleStyle},
        },
        tooltip: {
          trigger: 'item',
          position: tooltipPosition,
          backgroundColor: '#fff',
        },
      });
    }
    return () => chart?.dispose();
  }, [data, nameChart, t, title, titleStyle, tooltipPosition]);
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

export default PieChartCustom;

const styles = StyleSheet.create({});
