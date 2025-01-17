import {
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import MessageComponent from './components/message-feedback';
import HeaderChat from './components/header-chat';
import {faker} from '@faker-js/faker';
import {useAppSelector} from '@/hooks/redux.hook';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import SendBox from '../chat/components/send-box';
// import {selecthubSignalR} from '@/features/chat/chat.slice';
import LineDatetime from '@/components/line-datetime';
import AvatarImage from '@/components/avatar-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  TMessageFeedback,
  TMessageFeedbackPage,
} from '@/modules/feedback/feedback.model';
import {FeedbackStackParamsList} from '@/routes/feedback.stack';
import {StackScreenProps} from '@react-navigation/stack';
import FeedbackApi from '@/modules/feedback/feedback.service';
import {selectCurrentUser} from '@/modules/user/user.slice';
import MessageTagFeedbackState from './components/message-feedback-tag';
import {selecthubSignalR} from '@/modules/hubconnection/hubconnection.slice';

type Props = StackScreenProps<FeedbackStackParamsList, 'ChatFeedbackScreen'>;

const {width, height} = Dimensions.get('screen');

const ChatFeedbackScreen = ({route}: Props) => {
  const ref_flat_list = useRef<FlatList>(null);
  const {data: inforFeedback} = useQuery({
    queryKey: ['feedback-detail', route.params.id],
    queryFn: () => FeedbackApi.getByID({id: route.params.id}),
  });

  const currentUser = useAppSelector(selectCurrentUser);
  const queryClient = useQueryClient();
  const hubConnection = useAppSelector(selecthubSignalR);
  const [progress, setProgress] = useState(false);
  const [sending, setSending] = useState<TMessageFeedbackPage[] | undefined>(
    [],
  );
  // const [replyMess, setReplyMess] = useState(null);

  const onLoadMore = () => {
    if (
      data &&
      listMessage.length < data.pages[0].total &&
      !isLoading &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const compareDate = (date1?: string, date2?: string) => {
    if (!date2) {
      return false;
    }
    if (!date1) {
      return true;
    }
    const d1 = moment(date1?.split('T')[0]);
    const d2 = moment(date2?.split('T')[0]);

    if (d1.diff(d2, 'days') === 0) {
      return true;
    }
    return false;
  };
  const showAvatar = (item: TMessageFeedback, index: number) => {
    return (
      item.creatorUserId !== currentUser.userId &&
      (listMessage?.[index - 1]?.creatorUserId !== item.creatorUserId ||
        !compareDate(
          item?.creationTime,
          listMessage?.[index - 1]?.creationTime,
        ) ||
        listMessage?.[index - 1].typeComment === 8)
    );
  };

  const {isLoading, data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    {
      queryKey: ['messageFeedback', route.params.id],
      queryFn: ({pageParam}) =>
        FeedbackApi.getMessageFeedback({
          CitizenReflectId: route.params.id,
          SkipCount: pageParam,
        }),

      getNextPageParam: (lastPage, allPages) => {
        let skip = 0;
        allPages.forEach(page => {
          if (page.listMessageFeedback) {
            skip += page.listMessageFeedback.length;
          }
        });

        if (skip < lastPage.total) {
          return skip;
        }
        return null;
      },
    },
  );

  const {mutate: sendMessFeedback} = useMutation(
    async (messSubmit: TMessageFeedback) =>
      await FeedbackApi.sendMessFeedback(messSubmit),
    {
      onSuccess: (res: any) => {
        console.log('gửi tin nhắn feedback thành công', res);
      },
      onError: (err: any) => {
        console.error('Lỗi gửi tin nhắn feedback', err);
      },
    },
  );

  const listMessage = data?.pages
    ? data.pages.flatMap((page: TMessageFeedbackPage) => [
        ...page.listMessageFeedback,
      ])
    : [];

  const sendMess = (sendMessageData: {message: string; type: number}) => {
    const mess = {
      fullName: currentUser.fullName,
      imageUrl: currentUser.imageUrl,
      creatorFeedbackId: inforFeedback?.creatorUserId,
      feedbackId: inforFeedback?.id,
      comment: sendMessageData.message,
      tenantId: inforFeedback?.tenantId,
      typeComment: sendMessageData.type,
      organizationUnitId: inforFeedback?.organizationUnitId,
      creatorUserId: currentUser.userId,
    };
    queryClient.setQueryData<InfiniteData<TMessageFeedbackPage> | undefined>(
      ['messageFeedback', route.params.id],
      (
        oldData: InfiniteData<TMessageFeedbackPage> | undefined,
      ): InfiniteData<TMessageFeedbackPage> | undefined => {
        if (oldData) {
          oldData?.pages.map((page, i) => {
            if (i === 0 && inforFeedback) {
              page.listMessageFeedback.unshift({
                fullName: currentUser.fullName,
                imageUrl: currentUser.imageUrl,
                creatorFeedbackId: inforFeedback.creatorUserId,
                feedbackId: inforFeedback.id,
                comment: sendMessageData.message,
                tenantId: inforFeedback.tenantId,
                typeComment: sendMessageData.type,
                organizationUnitId: inforFeedback.organizationUnitId,
                creationTime: moment().toISOString(),
                creatorUserId: currentUser.userId,
                id: 0,
              });
            }
            return page;
          });
        }

        return oldData;
      },
    );
    const newValueSending = data?.pages ? [...data.pages] : [];
    setSending(newValueSending);
    sendMessFeedback(mess);

    // hubConnection
    //   .invoke('sendcmfbtoadtenant', mess)
    //   .then((res: any) => {
    //     console.log('done send', res);
    //   })
    //   .catch((err: any) => console.error('Lỗi gửi tin nhắn feedback', err));
  };
  const deleteMess = (sendMessageData: TMessageFeedback) => {
    // hubConnection
    //   .invoke('DeleteChatMessageBusiness', sendMessageData)
    //   .then((res: any) => {
    //     console.log('[done delete mess store]', res);
    //   })
    //   .catch((err: any) => {
    //     console.error(err);
    //     Alert.alert('Thu hồi tin nhắn thất bại');
    //   });
  };
  useEffect(() => {
    hubConnection.on(
      'SendCommentFeedbackToUserTenant',
      (message: TMessageFeedback) => {
        if (message.feedbackId === route.params.id) {
          queryClient.setQueryData<
            InfiniteData<TMessageFeedbackPage> | undefined
          >(
            ['messageFeedback', route.params.id],
            (
              oldData: InfiniteData<TMessageFeedbackPage> | undefined,
            ): InfiniteData<TMessageFeedbackPage> | undefined => {
              if (oldData) {
                oldData?.pages.map((page, i) => {
                  if (i === 0) {
                    page.listMessageFeedback.unshift(message);
                    page.listMessageFeedback.forEach((el, index) => {
                      if (!el.id) {
                        page.listMessageFeedback.splice(index, 1);
                      }
                    });
                  }
                  page.total += 1;
                  return page;
                });
              }

              return oldData;
            },
          );
          const newValueSent = data?.pages ? [...data?.pages] : [];
          setSending(newValueSent);
          // queryClient.refetchQueries(['customer', idStore]);
        }
      },
    );
    // hubConnection.on('deleteBusinessChatMessage', (message: TMessageFeedback) => {
    //   if (
    //     message.targetUserId === customer?.friendUserId ||
    //     message.userId === customer?.friendUserId
    //   ) {
    //     queryClient.setQueryData(
    //       ['messages', customer?.friendUserId],
    //       (
    //         oldData: InfiniteData<IPageMessage> | undefined,
    //       ): InfiniteData<IPageMessage> => {
    //         const newData = oldData?.pages ? [...oldData.pages] : [];
    //         let numDel = 0;
    //         newData.forEach(item => {
    //           item.data.forEach((el, i) => {
    //             if (el.id === message.id) {
    //               item.data.splice(i, 1);
    //               numDel++;
    //             }
    //           });
    //         });
    //         newData.forEach(item => {
    //           item.totalRecords -= numDel;
    //         });
    //         return {
    //           pageParams: oldData?.pageParams ?? [],
    //           pages: newData,
    //         };
    //       },
    //     );
    //     const newValueDelete = data?.pages ? [...data?.pages] : [];
    //     setSending(newValueDelete);
    //     queryClient.refetchQueries(['customer', idStore]);
    //   }
    // });
    return () => {
      hubConnection.off('getBusinessChatMessage');
      hubConnection.off('deleteBusinessChatMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      queryClient.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <HeaderChat
          avatarUrl={inforFeedback?.imageUrl}
          name={inforFeedback?.fullName}
          isOnline={false}
        />
        <FlatList
          ref={ref_flat_list}
          inverted
          ListFooterComponent={
            <View>{isLoading ? <ActivityIndicator /> : <View />}</View>
          }
          onEndReached={onLoadMore}
          style={{
            backgroundColor: '#eeeeee',
          }}
          data={
            data?.pages
              ? data.pages.flatMap((page: TMessageFeedbackPage) => [
                  ...page.listMessageFeedback,
                ])
              : []
          }
          contentContainerStyle={{
            paddingVertical: 10,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => {
            if (!item.id) {
              return faker.string.uuid();
            }
            return item.id.toString();
          }}
          renderItem={({item, index}) => {
            return item.typeComment < 8 ? (
              <View>
                {compareDate(
                  item?.creationTime,
                  listMessage?.[index + 1]?.creationTime,
                ) ? null : (
                  <LineDatetime time={item?.creationTime} />
                )}
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  {showAvatar(item, index) ? (
                    <AvatarImage
                      source={{uri: inforFeedback?.imageUrl}}
                      size={28}
                    />
                  ) : (
                    <View style={{width: 28, height: 28}} />
                  )}

                  <MessageComponent
                    mess={item}
                    side={currentUser.userId === item.creatorUserId ? 1 : 2}
                    emotionDisable={false}
                    deleteMess={deleteMess}
                  />
                </View>
              </View>
            ) : (
              <MessageTagFeedbackState
                typeMess={item.typeComment}
                message={item}
              />
            );
          }}
        />

        <SendBox
          scrollTopWhenSend={() => {
            ref_flat_list.current?.scrollToOffset({animated: true, offset: 0});
          }}
          sendMess={sendMess}
          setProgress={setProgress}
        />
        {progress && (
          <View
            style={{
              backgroundColor: 'black',
              opacity: 0.5,
              position: 'absolute',
              height: height,
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} />
            <Text style={{fontWeight: '500', color: '#fff'}}>Đang tải lên</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatFeedbackScreen;
