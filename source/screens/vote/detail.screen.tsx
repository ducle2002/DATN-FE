import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import BottomContainer from '@/components/bottom-container.component';
import {StackScreenProps} from '@react-navigation/stack';
import {VoteStackParamsList} from '@/routes/vote.stack';
import {useQuery} from 'react-query';
import VoteApi from '@/modules/vote/vote.service';
import {PieChart} from 'react-native-svg-charts';
import Button from '@/components/button.component';
import language, {languageKeys} from '@/config/language/language';
import TimeLineComponent from './components/time-line.component';
import {TOption} from '@/modules/vote/vote.model';
import globalStyles, {voteChartColor} from '@/config/globalStyles';
import moment from 'moment';

type Props = StackScreenProps<VoteStackParamsList, 'DETAIL_SCREEN'>;

const DetailScreen = ({navigation, route}: Props) => {
  const id = route.params.id;

  const {data} = useQuery({
    queryKey: ['vote', id],
    queryFn: () => VoteApi.getByIdRequest(id),
  });

  const chartData = useMemo(
    () =>
      data
        ? [
            ...data.voteOptions.map((option: TOption, index: number) => ({
              ...option,
              svg: {fill: voteChartColor[index % 3]},
              key: index,
              arc: {cornerRadius: 2},
            })),
            {
              option: language.t(languageKeys.vote.detail.notParticipate),
              countVote: data?.totalUsers - data?.totalVotes,
              svg: {fill: '#eaeaea'},
              key: data.voteOptions.length,
              arc: {cornerRadius: 2},
            },
          ]
        : [],
    [data],
  );

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100, paddingHorizontal: 16}}>
        <Text style={styles.textTitle}>
          {language.t(languageKeys.vote.detail.name)}: {data?.name}
        </Text>
        <Text style={styles.textContent}>
          {language.t(languageKeys.vote.detail.description)}:{' '}
          {data?.description}
        </Text>
        <Text style={styles.textSubTitle}>
          {language.t(languageKeys.vote.detail.scope)}: {data?.totalUsers}
        </Text>
        <Text style={styles.textSubTitle}>
          {language.t(languageKeys.vote.detail.totalVotes)}: {data?.totalVotes}
        </Text>

        {data && (
          <>
            <View>
              <Text style={styles.textSubTitle}>
                {language.t(languageKeys.vote.detail.timeVote)}:
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text>
                    {moment(data.startTime).format('HH:mm DD/MM/YYYY')}
                  </Text>
                  <Text>
                    {moment(data.finishTime).format('HH:mm DD/MM/YYYY')}
                  </Text>
                </View>
                <TimeLineComponent
                  start={data?.startTime}
                  finish={data?.finishTime}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={styles.textResultTitle}>
                {language.t(languageKeys.vote.detail.result)}:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <PieChart
                  innerRadius={'50%'}
                  style={{height: 180, width: '50%'}}
                  valueAccessor={({item}) => item.countVote}
                  data={chartData}
                  padAngle={Math.PI / 180}
                />
                <View>
                  {chartData.map(option => (
                    <View
                      key={option.key}
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 15,
                          height: 15,
                          backgroundColor: option.svg.fill,
                          borderRadius: 20,
                        }}
                      />
                      <Text
                        style={{...globalStyles.text12Regular, marginLeft: 5}}>
                        {option.option}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <BottomContainer
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Button
          mode="contained"
          style={{width: '45%'}}
          onPress={() => {
            navigation.navigate('CREATE_SCREEN', {vote: data});
          }}>
          {language.t(languageKeys.shared.button.edit)}
        </Button>
      </BottomContainer>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  textTitle: {
    ...globalStyles.text16Bold,
    color: '#1D52DA',
  },
  textContent: {
    ...globalStyles.text15Regular,
    color: '#808694',
  },
  textSubTitle: {
    ...globalStyles.text15Medium,
    color: '#1D52DA',
    marginTop: 20,
  },
  textResultTitle: {
    ...globalStyles.text16Bold,
    color: 'black',
  },
});
