import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import moment from 'moment';
import BottomContainer from '@/components/bottom-container.component';
import globalStyles from '@/config/globalStyles';
import SubTaskItem from './components/sub-task.component';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {WorkStackParamsList} from '@/routes/work-management.stack';
import Button from '@/components/button.component';
import CheckoutWork from './components/checkout-work.component';
import {useMutation, useQuery} from 'react-query';
import WorkManagementApi from './services/work-management.service';
import RenderHTML from 'react-native-render-html';
import HeaderWorkDetail from './components/header.component';
const {width} = Dimensions.get('screen');
import language, {languageKeys} from '@/config/language/language';
import ReactNativeModal from 'react-native-modal';
import {TWorkDetail} from './services/work.model';
import AttachLogTimeComponent from './components/attach-logtime.component';
import LogTimeApi from './services/logtime.service';
import {
  TCreateTurnWork,
  TTurnWork,
  TWorkLogTime,
} from './services/logtime.model';
import {useToast} from 'react-native-toast-notifications';
import LoadingComponent from '@/components/loading';

type Props = StackScreenProps<WorkStackParamsList, 'DETAIL_WORK'>;
type TModalAttachProps = {
  visible: boolean;
  workDetail?: TWorkDetail;
};

const DetailWorkScreen = ({route, navigation}: Props) => {
  const toast = useToast();
  const [modalAttachProps, setModalAttachProps] = useState<TModalAttachProps>({
    visible: false,
  });
  const [selectedTurnWork, setSelectedTurnWork] = useState<
    TTurnWork | undefined
  >();
  const [statusLogTimes, setStatusLogTime] = useState<TWorkLogTime[]>([]);
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
  const {data: logTimeWork, refetch: refetchLogTime} = useQuery({
    queryKey: ['logTime', route.params.id, selectedTurnWork?.id],
    queryFn: () =>
      selectedTurnWork?.id
        ? LogTimeApi.getAllByTurn({
            WorkId: work?.id,
            WorkTurnId: selectedTurnWork?.id,
            maxResultCount: 1000,
          })
        : [],
  });
  const {data: turnWork, refetch: refetchTurn} = useQuery({
    queryKey: ['turnWork', route.params.id],
    queryFn: () =>
      LogTimeApi.getAllTurnWorkNotPaging({
        WorkId: route.params.id,
      }),
    onSuccess(data) {
      if (data.length === 0 && route.params.id) {
        addTurnWork({
          workId: route.params.id,
          description: new Date().toISOString(),
        });
      } else {
        if (data.length > 0) {
          setSelectedTurnWork(data[0]);
        }
      }
    },
  });
  const {mutate: addTurnWork} = useMutation({
    mutationKey: ['createTurn'],
    mutationFn: (data: TCreateTurnWork) => LogTimeApi.createTurn(data),
    onSuccess: () => {
      refetchTurn();
    },
  });
  const {mutate: updateTurnLogTime, isLoading: LoadingUpdateLogTime} =
    useMutation({
      mutationKey: ['updateTurnLogTime'],
      mutationFn: (data: {
        workTurnId: number;
        listLogTimeIdsDelete: number[];
        listLogTimeCreate: TWorkLogTime[];
      }) => LogTimeApi.updateManyLogTime(data),
      onSuccess: () => {
        toast.show('Lưu thông tin thành công', {
          type: 'success',
          placement: 'top',
          duration: 1000,
          animationType: 'slide-in',
        });
        refetchLogTime();
      },
      onError: () => {
        toast.show('Lưu thông tin thất bại', {
          type: 'danger',
          placement: 'top',
          duration: 1000,
          animationType: 'slide-in',
        });
      },
    });

  const renderHeader = useCallback(
    (props: StackHeaderProps) => {
      return (
        <HeaderWorkDetail
          {...props}
          status={work?.status}
          turnWork={turnWork}
          onChangeTurn={setSelectedTurnWork}
          selectedTurn={selectedTurnWork}
        />
      );
    },
    [work?.status, turnWork, selectedTurnWork],
  );

  useEffect(() => {
    navigation.setOptions({
      title: work?.title,
      header: props => renderHeader(props),
    });
  }, [navigation, renderHeader, work, turnWork]);

  useEffect(() => {
    let newListLogTime = logTimeWork ? [...logTimeWork] : [];
    statusLogTimes.forEach(value => {
      if (
        !value.id &&
        !logTimeWork?.find(el => el.workDetailId === value.workDetailId)
      ) {
        newListLogTime.push(value);
      }
    });
    setStatusLogTime(newListLogTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logTimeWork]);
  const disableCompleteBtn = useMemo(() => {
    if (
      statusLogTimes.find(el => el.id === undefined) !== undefined ||
      (logTimeWork && logTimeWork?.length > statusLogTimes.length)
    ) {
      return false;
    }
    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logTimeWork, statusLogTimes, LoadingUpdateLogTime]);

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
            <Text style={styles.textLabel}>
              {language.t(languageKeys.workManagement.work.supervisorUsers)}:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {work?.supervisorUsers?.map(su => (
                <Text
                  key={su.fullName}
                  style={[styles.textDate, {marginLeft: 5}]}>
                  {su.fullName}
                </Text>
              ))}
            </View>
          </View>
          <View style={[styles.row, {alignItems: 'center', flexWrap: 'wrap'}]}>
            <Text style={styles.textLabel}>
              {language.t(languageKeys.workManagement.work.recipientUsers)}:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {work?.recipientUsers?.map(re => (
                <Text key={re.id} style={[styles.textDate, {marginLeft: 5}]}>
                  {re.fullName}
                </Text>
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

        <View style={[styles.contentContainer, {marginTop: 5}]}>
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
                  logTimeInfo={statusLogTimes?.find(
                    el => el.workDetailId === w.id,
                  )}
                  turnWorkId={selectedTurnWork?.id}
                  onChangeSelect={() => {
                    const check = !!statusLogTimes.find(
                      el => el.workDetailId === w.id,
                    );

                    if (check) {
                      const newStatusLogTime = statusLogTimes.filter(
                        el => el.workDetailId !== w.id,
                      );
                      setStatusLogTime(newStatusLogTime);
                    } else if (work?.id && selectedTurnWork?.id) {
                      const logTimeExist = logTimeWork?.find(
                        lgTime => lgTime.workDetailId === w.id,
                      );
                      if (logTimeExist !== undefined) {
                        setStatusLogTime([...statusLogTimes, logTimeExist]);
                      } else {
                        setStatusLogTime([
                          ...statusLogTimes,
                          {
                            workId: work.id,
                            workDetailId: w.id,
                            dateStart: new Date().toISOString(),
                            workTurnId: selectedTurnWork?.id,
                          },
                        ]);
                      }
                    }
                  }}
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
            disabled={disableCompleteBtn}
            onPress={() => {
              Alert.alert(
                'Lưu thông tin thay đổi',
                'Bạn có chức lưu thông tin thay đổi?',
                [
                  {
                    text: 'Đồng ý',
                    onPress: () => {
                      if (selectedTurnWork?.id) {
                        const listDelete = logTimeWork
                          ? logTimeWork
                              ?.map(item => {
                                if (
                                  statusLogTimes.find(
                                    el => el.workDetailId === item.workDetailId,
                                  ) === undefined &&
                                  item.id
                                ) {
                                  return item.id;
                                } else {
                                  return -1;
                                }
                              })
                              .filter(el => el !== -1)
                          : [];

                        updateTurnLogTime({
                          workTurnId: selectedTurnWork?.id,
                          listLogTimeIdsDelete: listDelete,
                          listLogTimeCreate: statusLogTimes.filter(
                            el => !el.id,
                          ),
                        });
                      }
                    },
                  },
                  {
                    text: 'Hủy bỏ',
                  },
                ],
              );
            }}
            icon={'checkbox-marked-circle-plus-outline'}
            mode="contained">
            Lưu
          </Button>
        </View>
      </BottomContainer>
      <ReactNativeModal
        useNativeDriverForBackdrop
        statusBarTranslucent={true}
        backdropOpacity={0.2}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        swipeDirection={['down']}
        onBackdropPress={toggleIsVisible}
        onSwipeComplete={toggleIsVisible}
        isVisible={modalAttachProps.visible}
        style={{margin: 0}}>
        <KeyboardAvoidingView behavior="padding">
          <Pressable
            onPress={toggleIsVisible}
            style={{
              height: '100%',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                paddingTop: '5%',
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              }}>
              <AttachLogTimeComponent
                workId={work?.id}
                workDetail={modalAttachProps.workDetail}
                logTimeInfo={logTimeWork?.find(
                  el => el.workDetailId === modalAttachProps.workDetail?.id,
                )}
                turnWorkId={selectedTurnWork?.id}
                onClose={toggleIsVisible}
              />
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </ReactNativeModal>
      {LoadingUpdateLogTime && <LoadingComponent />}
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
