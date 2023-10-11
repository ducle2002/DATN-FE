import {
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import BottomContainer from '@/components/bottom-container.component';
import globalStyles from '@/config/globalStyles';
import SubTaskItem from './components/sub-task.component';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import Button from '@/components/button.component';
import CheckoutWork from './components/checkout-work.component';
import {Chip, useTheme} from 'react-native-paper';
import AddNotifications from './components/add-notification.component';
import {useMutation, useQuery} from 'react-query';
import WorkManagementApi from './services/work-management.service';
import RenderHTML from 'react-native-render-html';
import HeaderWorkDetail from './components/header.component';
const {width, height} = Dimensions.get('screen');
import language, {languageKeys} from '@/config/language/language';
import ReactNativeModal from 'react-native-modal';
import {TWorkDetail} from './services/work.model';
import AttachLogTimeComponent from './components/attach-logtime.component';
import LogTimeApi from './services/logtime.service';
import {TCreateTurnWork} from './services/logtime.model';

type Props = StackScreenProps<WorkStackParamsList, 'DETAIL_WORK'>;
type TModalAttachProps = {
  visible: boolean;
  workDetail?: TWorkDetail;
};

const DetailWorkScreen = ({route, navigation}: Props) => {
  const [modalAttachProps, setModalAttachProps] = useState<TModalAttachProps>({
    visible: false,
  });
  const toggleIsVisible = () => {
    setModalAttachProps({
      ...modalAttachProps,
      visible: !modalAttachProps.visible,
    });
  };
  const {data: work} = useQuery({
    queryKey: ['work', route.params.id],
    queryFn: () => WorkManagementApi.getById({id: route.params.id}),
  });
  // const {data: logTimeWork} = useQuery({
  //   queryKey: ['logTimeWork', route.params.id],
  //   queryFn: () =>
  //     LogTimeApi.getAll({
  //       WorkId: route.params.id,
  //       WorkTurnId: undefined,
  //       maxResultCount: 1000,
  //     }),
  // });
  const {data: turnWork} = useQuery({
    queryKey: ['turnWork', route.params.id],
    queryFn: () =>
      LogTimeApi.getAllTurnWorkNotPaging({
        WorkId: route.params.id,
      }),
    onSuccess(data) {
      if (data.length === 0 && route.params.id) {
        addTurnWork({
          turnNumber: 1,
          workId: route.params.id,
          description: new Date().toISOString(),
        });
      }
    },
  });
  const {mutate: addTurnWork} = useMutation({
    mutationKey: ['createTurn'],
    mutationFn: (data: TCreateTurnWork) => LogTimeApi.createTurn(data),
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
            <Text style={styles.textLabel}>Trạng thái:</Text>
            <View
              style={[
                styles.textDateContainer,
                {marginRight: 'auto', marginLeft: 4},
              ]}>
              <Text style={styles.textDate}>
                {work?.status
                  ? language.t(languageKeys.workManagement.status[work?.status])
                  : ''}
              </Text>
            </View>
          </View>
          <View style={[styles.row, {alignItems: 'center', flexWrap: 'wrap'}]}>
            <Text style={styles.textLabel}>Người giám sát:</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {['Kien Nguyen', 'Doraemon', 'nobita'].map((su, k) => (
                <Chip style={{marginHorizontal: 10, marginVertical: 5}} key={k}>
                  <Text>{su}</Text>
                </Chip>
              ))}
            </View>
          </View>
          <View style={{...styles.row, justifyContent: 'space-between'}}>
            <View style={[styles.row, styles.dateContainer]}>
              <Text style={{...styles.textLabel, marginRight: 'auto'}}>
                Bắt đầu:
              </Text>
              <View style={[styles.textDateContainer, {marginRight: 'auto'}]}>
                <Text style={styles.textDate}>
                  {moment(work?.dateStart).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.dateContainer]}>
              <Text style={{...styles.textLabel, marginLeft: 'auto'}}>
                Kết thúc:
              </Text>
              <View style={[styles.textDateContainer, {marginLeft: 'auto'}]}>
                <Text style={styles.textDate}>
                  {moment(work?.dateExpected).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.textLabel}>Mô tả công việc:</Text>
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
              work.id && (
                <SubTaskItem
                  item={w}
                  key={w.id}
                  workId={work.id}
                  setModalAttachProps={setModalAttachProps}
                />
              ),
          )}
        </View>
      </ScrollView>

      <CheckoutWork
        isVisible={isVisible.checkout}
        onBackdropPress={() => setIsVisible({...isVisible, checkout: false})}
      />
      {/* <AddNotifications
        isVisible={isVisible.reminder}
        onBackdropPress={() =>
          setIsVisible({
            ...isVisible,
            reminder: false,
          })
        }
      /> */}
      <BottomContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Button
            onPress={() => {
              if (route.params.id && turnWork) {
                addTurnWork({
                  workId: route.params.id,
                  turnNumber: turnWork.length + 1,
                  description: new Date().toISOString(),
                });
              } else {
                Alert.alert(
                  'Không thể tạo lượt công việc mới',
                  'Kiểm tra lại kết nối của bạn',
                );
              }
            }}
            icon={'plus'}
            mode="outlined">
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
      <ReactNativeModal
        useNativeDriverForBackdrop
        statusBarTranslucent={true}
        backdropOpacity={0.2}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={toggleIsVisible}
        isVisible={modalAttachProps.visible}
        style={{margin: 0}}>
        <Pressable
          onPress={toggleIsVisible}
          style={{
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <AttachLogTimeComponent
              workId={work?.id}
              workDetail={modalAttachProps.workDetail}
            />
          </View>
        </Pressable>
      </ReactNativeModal>
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
