import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import BottomContainer from '@/components/bottom-container.component';
import globalStyles from '@/config/globalStyles';
import Icon from '@/components/icon.component';
import SubTaskItem from './components/sub-task.component';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import Button from '@/components/button.component';
import CheckoutWork from './components/checkout-work.component';
import {Chip, useTheme} from 'react-native-paper';
import AddNotifications from './components/add-notification.component';
import {useQuery} from 'react-query';
import WorkManagementApi from './services/work-management.service';
import RenderHTML from 'react-native-render-html';
import HeaderWorkDetail from './components/header.component';
const {width, height} = Dimensions.get('screen');

type Props = StackScreenProps<WorkStackParamsList, 'DETAIL_WORK'>;

const DetailWorkScreen = ({route, navigation}: Props) => {
  const {data: work} = useQuery({
    queryKey: ['work', route.params.id],
    queryFn: () => WorkManagementApi.getById({id: route.params.id}),
  });

  const renderHeader = useCallback(
    (props: StackHeaderProps) => {
      return <HeaderWorkDetail {...props} status={work?.status} />;
    },
    [work?.status],
  );

  useEffect(() => {
    navigation.setOptions({
      title: work?.title,
      header: props => renderHeader(props),
    });
  }, [navigation, renderHeader, work]);

  const [isVisible, setIsVisible] = useState({
    checkout: false,
    reminder: false,
  });

  const theme = useTheme();

  return (
    <View
      style={{
        marginTop: 'auto',
        height: '100%',
        backgroundColor: '#D1D8FB',
      }}>
      <ScrollView style={{}}>
        <View style={styles.contentContainer}>
          <View style={[styles.row, {alignItems: 'center', flexWrap: 'wrap'}]}>
            <Text style={styles.textLabel}>Người giám sát:</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {['Kien Nguyen', 'Doraemon', 'nobita'].map(su => (
                <Chip style={{marginHorizontal: 10, marginVertical: 5}}>
                  <Text>{su}</Text>
                </Chip>
              ))}
            </View>
          </View>
          <View style={{...styles.row, justifyContent: 'space-between'}}>
            <View style={[styles.row, styles.dateContainer]}>
              <Text style={{...styles.textLabel, marginRight: 'auto'}}>
                Bắt đầu
              </Text>
              <View style={[styles.textDateContainer, {marginRight: 'auto'}]}>
                <Text style={styles.textDate}>
                  {moment(work?.dateStart).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.dateContainer]}>
              <Text style={{...styles.textLabel, marginLeft: 'auto'}}>
                Kết thúc
              </Text>
              <View style={[styles.textDateContainer, {marginLeft: 'auto'}]}>
                <Text style={styles.textDate}>
                  {moment(work?.dateExpected).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.textLabel}>Mô tả công việc</Text>
            <RenderHTML
              source={{html: work?.content ?? ''}}
              contentWidth={width}
              defaultTextProps={{
                style: styles.textValue,
              }}
            />
          </View>
        </View>

        <View
          style={[styles.contentContainer, {marginTop: 5, minHeight: height}]}>
          <View
            style={[
              styles.row,
              {alignItems: 'center', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.textLabel}>Danh sách công việc</Text>
          </View>
          {work?.listWorkDetail?.map(
            w =>
              work.id && <SubTaskItem item={w} key={w.id} workId={work.id} />,
          )}
        </View>
      </ScrollView>

      <CheckoutWork
        isVisible={isVisible.checkout}
        onBackdropPress={() => setIsVisible({...isVisible, checkout: false})}
      />
      <AddNotifications
        isVisible={isVisible.reminder}
        onBackdropPress={() =>
          setIsVisible({
            ...isVisible,
            reminder: false,
          })
        }
      />
      <BottomContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          {/* <Icon
            name="notifications"
            type="Ionicons"
            size={30}
            color={theme.colors.secondary}
            onPress={() => {
              setIsVisible({
                checkout: false,
                reminder: true,
              });
            }}
          /> */}
          <Button onPress={() => {}} icon={'plus'} mode="outlined">
            Thêm lượt
          </Button>
          <Button
            onPress={() => {
              setIsVisible({
                checkout: true,
                reminder: false,
              });
            }}
            icon={'checkbox-marked-circle-plus-outline'}
            mode="contained">
            Hoàn thành
          </Button>
        </View>
      </BottomContainer>
    </View>
  );
};

export default DetailWorkScreen;

const styles = StyleSheet.create({
  row: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  textLabel: {
    ...globalStyles.text16Medium,
  },
  textValue: {
    ...globalStyles.text16Bold,
  },
  textTitle: {
    ...globalStyles.text17Bold,
    textAlign: 'center',
  },
  textStatus: {
    ...globalStyles.text16Bold,
    color: 'white',
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: '#557A46',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textDate: {
    ...globalStyles.text15Bold,
  },
  textDateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EAE9E9',
    borderRadius: 10,
  },
  dateContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
