import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StatisticStackParamsList} from '@/routes/ statistic.stack';
import BarRateReflectChart from './components/bar-rate-reflect-chart';
import StatisticService, {
  EFormIdStatistic,
  EGenderStatistics,
  EQueryCaseCitizenStatistics,
  EQueryCaseStatistic,
} from '../home/services/statistic.service';
import {useQueries} from 'react-query';
import ScrollViewChart from './components/scroll-view-chart';
import LineChartCustom from './components/line-chart';
import BarChartCustom from './components/bar-chart';
import PieChartCustom from './components/pie-chart-custom';
type Props = StackScreenProps<StatisticStackParamsList, 'CITIZEN_STATISTIC'>;
const CitizenStatisticScreen = (props: Props) => {
  const queries = useQueries([
    {
      queryKey: [
        'citizen-statistic/age/female',
        EGenderStatistics.Female,
        EQueryCaseCitizenStatistics.ByAgeAndSex,
      ],
      queryFn: () =>
        StatisticService.GetStaticCitizen({
          sex: EGenderStatistics.Female,
          queryCase: EQueryCaseCitizenStatistics.ByAgeAndSex,
        }),
    },
    {
      queryKey: [
        'citizen-statistic/age/male',
        EGenderStatistics.Male,
        EQueryCaseCitizenStatistics.ByAgeAndSex,
      ],
      queryFn: () =>
        StatisticService.GetStaticCitizen({
          sex: EGenderStatistics.Male,
          queryCase: EQueryCaseCitizenStatistics.ByAgeAndSex,
        }),
    },
    {
      queryKey: [
        'citizen-statistic/career',
        EQueryCaseCitizenStatistics.ByCareer,
      ],
      queryFn: () =>
        StatisticService.GetStaticCitizen({
          queryCase: EQueryCaseCitizenStatistics.ByCareer,
        }),
    },
  ]);

  return (
    <ScrollView>
      <View style={styles.containerChart}>
        <BarChartCustom
          dataXAxis={
            queries[0]?.data?.data && queries[1]?.data?.data
              ? Object.keys(queries[0].data.data).map(el => {
                  switch (el) {
                    case 'Dưới 18 tuổi':
                      return '<18';
                    case 'Từ 18 - 25 tuổi':
                      return '18-25';
                    case 'Từ 26 - 30 tuổi':
                      return '26-30';
                    case 'Từ 31 - 40 tuổi':
                      return '31-40';
                    case 'Từ 41 - 50 tuổi':
                      return '41-50';
                    case 'Trên 50 tuổi':
                      return '>50';
                    default:
                      return '';
                  }
                })
              : []
          }
          dataYAxis={
            queries[0]?.data?.data && queries[1]?.data?.data
              ? [
                  {
                    name: 'Nam',
                    data: Object.values(queries[0].data.data),
                  },
                  {
                    name: 'Nữ',
                    data: Object.values(queries[1].data.data),
                  },
                ]
              : []
          }
          nameXAxis="Tuổi"
          title="Thống kê độ tuổi cư dân"
        />
      </View>

      <View style={styles.containerChart}>
        <PieChartCustom
          title="Thống kê nghề nghiệp cư dân"
          data={
            queries[2]?.data?.data
              ? Object.keys(queries[2]?.data?.data).map((el: string) => ({
                  name: el,
                  value: queries[2]?.data?.data[el],
                }))
              : []
          }
          tooltipPosition={['20%', '50%']}
        />
      </View>
    </ScrollView>
  );
};

export default CitizenStatisticScreen;

const styles = StyleSheet.create({
  containerChart: {
    paddingTop: 12,
  },
});
