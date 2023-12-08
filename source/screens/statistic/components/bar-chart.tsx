import {Dimensions, StyleSheet, TextStyle, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {GridComponent} from 'echarts/components';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import {useTranslation} from 'react-i18next';
echarts.use([SVGRenderer, BarChart, GridComponent]);
const {width, height} = Dimensions.get('screen');
const BarChartCustom = ({
  dataXAxis = [],
  dataYAxis = [],
  title = '',
  titleStyle,
  nameXAxis,
  nameYAxis,
}: {
  dataXAxis: any[];
  dataYAxis: any[];
  title: string;
  titleStyle?: TextStyle;
  nameXAxis?: string;
  nameYAxis?: string;
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
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#ced4da',
            },
          },
          name: nameYAxis,
        },
        xAxis: {
          type: 'category',
          data: dataXAxis,
          animationDuration: 300,
          animationDurationUpdate: 300,
          name: nameXAxis,
          nameLocation: 'center',
          nameTextStyle: {
            lineHeight: 26,
          },
        },
        series: dataYAxis.map(el => ({
          data: el.data,
          type: 'bar',
          name: el.name,
          smooth: true,
        })),
        legend: {
          show: true,
          bottom: 5,
        },
        title: {
          text: title,
          textStyle: {color: '#333', ...titleStyle},
        },
        tooltip: {
          trigger: 'axis',
          //   position: ['30%', '50%'],
          backgroundColor: '#dee2e6',
        },
      });
    }
    return () => chart?.dispose();
  }, [dataXAxis, dataYAxis, nameXAxis, nameYAxis, t, title, titleStyle]);
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

export default BarChartCustom;

const styles = StyleSheet.create({});
