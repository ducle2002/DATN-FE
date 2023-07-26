import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderFeedback from './components/header-feedback';
import {useInfiniteQuery} from 'react-query';
import FeedbackApi from '@/modules/feedback/feedback.service';
import ItemFeedback from './components/item-feedback';
import {TFeedback} from '@/modules/feedback/feedback.model';
import FeedbackInfo from './components/feedback-info';

const {width, height} = Dimensions.get('screen');

type Props = {};

const FeedbackScreen = (props: Props) => {
  const [status, setStatus] = useState(2);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDetail, setShowDetail] = useState<{
    data?: TFeedback;
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
  const statusBtnArr = [
    {
      title: 'Phản ánh mới',
      type: 2,
      layout: 2,
    },
    {
      title: 'Đang xử lý',
      type: 4,
      layout: 2,
    },
    {
      title: 'Đã xử lý',
      type: 6,
      layout: 3,
    },
    {
      title: 'Đã đánh giá',
      type: 7,
      layout: 3,
    },
    {
      title: 'Tiếp nhận lại',
      type: 5,
      layout: 3,
    },
  ];
  const {data, isLoading, fetchNextPage, refetch} = useInfiniteQuery({
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
  }, [status, searchQuery]);
  return (
    <View style={{flex: 1}}>
      <HeaderFeedback
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <View style={styles.containerBtn}>
        {statusBtnArr.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setStatus(item.type);
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
                item={item}
                onPress={() => {
                  setShowDetail({
                    data: item,
                    visible: true,
                  });
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
              <FeedbackInfo data={showDetail.data} onClose={onClose} />
            )}
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
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
