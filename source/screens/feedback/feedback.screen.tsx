import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderFeedback from './components/header-feedback';
import {useInfiniteQuery, useMutation} from 'react-query';
import FeedbackApi from '@/modules/feedback/feedback.service';
import ItemFeedback from './components/item-feedback';
import {TFeedback} from '@/modules/feedback/feedback.model';
import FeedbackInfo from './components/feedback-info';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedbackStackParamsList} from '@/routes/feedback.stack';
import {useToast} from 'react-native-toast-notifications';
import LoadingComponent from '@/components/loading';
import {useTranslation} from 'react-i18next';
import {languageKeys} from '@/config/language/language';
import PickerBeginEndDate from '@/components/picker-begin-end-date';

const {width, height} = Dimensions.get('screen');

type Props = StackScreenProps<FeedbackStackParamsList>;

const FeedbackScreen = (props: Props) => {
  const toast = useToast();
  const {t} = useTranslation();
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const [status, setStatus] = useState(10);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDetail, setShowDetail] = useState<{
    data?: TFeedback;
    visible: boolean;
  }>({
    data: undefined,
    visible: false,
  });
  const [filter, setFilter] = useState<{
    data?: any;
    visible: boolean;
  }>({
    data: undefined,
    visible: false,
  });
  const onClose = () => {
    setShowDetail({
      data: undefined,
      visible: false,
    });
  };
  const onCloseFilter = () => {
    setFilter({
      ...filter,
      visible: false,
    });
  };
  const statusBtnArr = [
    {
      title: t(languageKeys.feedback.main.all),
      type: 10,
      layout: 3,
    },
    {
      title: t(languageKeys.feedback.main.pending),
      type: 11,
      layout: 3,
    },
    // {
    //   title: t(languageKeys.feedback.main.assigned),
    //   type: 3,
    //   layout: 3,
    // },
    {
      title: t(languageKeys.feedback.main.handling),
      type: 12,
      layout: 3,
    },
    {
      title: t(languageKeys.feedback.main.Finished),
      type: 14,
      layout: 3,
    },
    {
      title: t(languageKeys.feedback.main.Rated),
      type: 15,
      layout: 3,
    },
    {
      title: t(languageKeys.feedback.main.declined),
      type: 13,
      layout: 3,
    },
  ];
  const {data, isLoading, fetchNextPage, refetch, isRefetching} =
    useInfiniteQuery({
      queryKey: ['feedback', status],
      queryFn: ({pageParam}) =>
        FeedbackApi.getFeedback({
          FormId: status,
          skipCount: pageParam,
          KeyWord: searchQuery,
        }),
      getNextPageParam: (lastPage, allPages) => {
        let skip = 0;
        allPages.forEach(page => {
          if (page.listFeedback) {
            skip += page.listFeedback.length;
          }
        });

        if (skip < lastPage.total) {
          return skip;
        }
        return null;
      },
    });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const {mutate: deleteFeedback, isLoading: isLoadingDelete} = useMutation({
    mutationKey: ['assignFeedback'],
    mutationFn: (id: number) =>
      FeedbackApi.deleteFeedback({
        id: id,
      }),
    onError: err => {
      console.log(err);
      toast.show('Xóa phản ánh thất bại', {
        type: 'danger',
        duration: 1000,
      });
    },
    onSuccess: res => {
      toast.show('Xóa phản ánh thành công', {
        type: 'success',
        duration: 1000,
      });
      refetch();
    },
  });
  const {mutate: updateStateFeedback, isLoading: isLoadingUpdateState} =
    useMutation({
      mutationKey: ['updateStateFeedback'],
      mutationFn: (id: number) =>
        FeedbackApi.updateFeedback({
          id: id,
          state: 2,
        }),
      onError: err => {
        console.log(err);
        toast.show(t(languageKeys.feedback.main.FailReceiveFeedback), {
          type: 'danger',
          duration: 1000,
        });
      },
      onSuccess: res => {
        toast.show(t(languageKeys.feedback.main.SuccessReceiveFeedback), {
          type: 'success',
          duration: 1000,
        });
        refetch();
      },
    });

  const closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  return (
    <View style={{flex: 1}}>
      <HeaderFeedback
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openModalFilter={() => {
          setFilter({
            ...filter,
            visible: true,
          });
        }}
      />
      <View style={styles.containerBtn}>
        {statusBtnArr.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setStatus(item.type);
                row.forEach((el, i) => {
                  closeRow(i);
                });
              }}
              style={[
                styles.btnFilter,
                {
                  width: (width * 0.9) / item.layout,
                  borderColor:
                    status === item.type ? '#4AC3FB' : 'rgba(0,0,0,0.25)',
                  backgroundColor: status === item.type ? '#4AC3FB' : 'white',
                  marginTop: item.layout === 3 ? '3%' : 0,
                },
              ]}>
              <Text
                style={{
                  color: status === item.type ? '#fff' : '#333',
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          data={
            data?.pages
              ? data.pages.flatMap(page => [...page.listFeedback])
              : []
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <ItemFeedback
                ref={ref => (row[index] = ref)}
                item={item}
                onPress={() => {
                  setShowDetail({
                    data: item,
                    visible: true,
                  });
                }}
                onAssign={() => {
                  props.navigation.navigate('AssignFeedbackScreen', {
                    feedbackId: item.id,
                  });
                  closeRow(index);
                }}
                onDelete={() => {
                  deleteFeedback(item.id);
                  closeRow(index);
                }}
                closeRow={() => {
                  closeRow(index);
                }}
                onConfirm={() => {
                  updateStateFeedback(item.id);
                  closeRow(index);
                }}
              />
            );
          }}
          onEndReached={() => {
            const dataAll = data?.pages
              ? data.pages.flatMap(page => [...page.listFeedback])
              : [];
            const dataLength = dataAll.length;

            if (
              !isLoading &&
              data?.pages &&
              dataLength < data?.pages[0]?.total
            ) {
              fetchNextPage();
            }
          }}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </View>
      <Modal visible={showDetail.visible} transparent={true}>
        <Pressable
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: 'flex-end',
          }}
          onPress={onClose}>
          <TouchableWithoutFeedback
            style={{
              backgroundColor: 'white',
            }}>
            {!!showDetail.data && (
              <FeedbackInfo
                data={showDetail.data}
                onClose={onClose}
                onClickChat={() => {
                  if (showDetail.data) {
                    props.navigation.navigate('ChatFeedbackScreen', {
                      inforFeedback: showDetail.data,
                    });
                  }
                  onClose();
                }}
              />
            )}
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      <Modal visible={filter.visible} transparent={true}>
        <Pressable
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: 'flex-end',
          }}
          onPress={onCloseFilter}>
          <TouchableWithoutFeedback
            style={{
              backgroundColor: 'white',
            }}>
            <View>
              <PickerBeginEndDate />
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
      {(isLoading || isLoadingDelete) && <LoadingComponent />}
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  btnFilter: {
    alignItems: 'center',
    paddingVertical: '2%',
    borderWidth: 1,
    borderRadius: 16,
    marginHorizontal: '1.5%',
    elevation: 1,
  },
  containerBtn: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: '4%',
    justifyContent: 'center',
  },
});
