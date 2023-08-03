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
import MessageComponent from './components/message-component';
import HeaderBoxChat from './components/header-chat-box';

import {faker} from '@faker-js/faker';
import {useAppSelector} from '@/hooks/redux.hook';
import {InfiniteData, useInfiniteQuery, useQueryClient} from 'react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {selecthubSignalR} from '@/modules/hubconnection/hubconnection.slice';
import {ChatStackParamsList} from '@/routes/chat.stack';
import SendBox from './components/send-box';
import {TMessageChat, TMessageChatPage} from '@/modules/chat/chat.model';
import AvatarImage from '@/components/avatar-image';
import LineDatetime from '@/components/line-datetime';
import ChatApi from '@/modules/chat/chat.service';
import {StackScreenProps} from '@react-navigation/stack';
import {current} from '@reduxjs/toolkit';

type Props = StackScreenProps<ChatStackParamsList, 'ChatboxScreen'>;

const {width, height} = Dimensions.get('screen');

const ChatboxScreen = ({route}: Props) => {
  const ref_flat_list = useRef<FlatList>(null);
  const customer = route.params.userChat;
  const organizationUnitId = route.params.organizationUnitId;
  const queryClient = useQueryClient();
  const hubConnection = useAppSelector(selecthubSignalR);
  const [progress, setProgress] = useState(false);
  const [sending, setSending] = useState<TMessageChatPage[] | undefined>([]);
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
  const showAvatar = (item: TMessageChat, index: number) => {
    return (
      item.side === 2 &&
      (listMessage?.[index - 1]?.side !== item.side ||
        !compareDate(
          item?.creationTime,
          listMessage?.[index - 1]?.creationTime,
        ) ||
        listMessage?.[index - 1].typeMessage === 8)
    );
  };

  const {isLoading, data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    {
      queryKey: ['messages', customer?.friendUserId],
      queryFn: ({pageParam}) =>
        ChatApi.getMessChat({
          UserId: customer?.friendUserId,
          TenantId: customer?.friendTenantId,
          OrganizationUnitId: organizationUnitId,
          MinMessageId: pageParam,
        }),

      getNextPageParam: (lastPage, allPages) => {
        let skip = 0;
        allPages.forEach(page => {
          if (page.listMessage) {
            skip += page.listMessage.length;
          }
        });

        if (skip < lastPage.total) {
          return lastPage.listMessage[lastPage.listMessage.length - 1].id;
        }
        return null;
      },
    },
  );

  const listMessage = data?.pages
    ? data.pages.flatMap((page: TMessageChatPage) => [...page.listMessage])
    : [];

  const sendMess = (sendMessageData: {message: string; type: number}) => {
    const mess = {
      isOrganizationUnit: true,
      isAdmin: true,
      message: sendMessageData.message,
      //   side: 1,
      //   targetTenantId: customer?.friendTenantId ?? 0,
      userId: customer?.friendUserId ?? 0,
      //   tenantId: customer?.tenantId ?? 0,
      typeMessage: sendMessageData.type,
      senderId: organizationUnitId,
    };

    queryClient.setQueryData<InfiniteData<TMessageChatPage> | undefined>(
      ['messages', customer?.friendUserId],
      (
        oldData: InfiniteData<TMessageChatPage> | undefined,
      ): InfiniteData<TMessageChatPage> | undefined => {
        if (oldData) {
          oldData?.pages.map((page, i) => {
            if (i === 0) {
              page.listMessage.unshift({
                id: 0,
                isOrganizationUnit: true,
                message: sendMessageData.message,
                readState: 0,
                receiverReadState: 0,
                side: 1,
                targetTenantId: customer?.friendTenantId ?? 0,
                targetUserId: customer?.friendUserId ?? 0,
                tenantId: customer?.tenantId ?? 0,
                typeMessage: sendMessageData.type,
                userId: organizationUnitId,
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

    hubConnection
      .invoke('SendMessageAdmin', mess)
      .then((res: any) => {
        console.log('done send', res);
      })
      .catch((err: any) => console.error('Lỗi gửi tin nhắn', err));
  };
  const deleteMess = (sendMessageData: TMessageChat) => {
    hubConnection
      .invoke('DeleteChatMessageAdmin', sendMessageData)
      .then((res: any) => {
        console.log('[done delete mess store]', res);
      })
      .catch((err: any) => {
        console.error(err);
        Alert.alert('Thu hồi tin nhắn thất bại');
      });
  };
  useEffect(() => {
    hubConnection.on('getChatMessage', (message: TMessageChat) => {
      if (
        message.targetUserId === customer?.friendUserId ||
        message.userId === customer?.friendUserId
      ) {
        queryClient.setQueryData<InfiniteData<TMessageChatPage> | undefined>(
          ['messages', customer?.friendUserId],
          (
            oldData: InfiniteData<TMessageChatPage> | undefined,
          ): InfiniteData<TMessageChatPage> | undefined => {
            if (oldData) {
              oldData?.pages.map((page, i) => {
                if (i === 0) {
                  page.listMessage.unshift(message);
                  page.listMessage.forEach((el, index) => {
                    if (!el.id) {
                      page.listMessage.splice(index, 1);
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
        queryClient.refetchQueries(['userChat']);
      }
    });
    hubConnection.on('deleteChatMessage', (message: TMessageChat) => {
      if (
        message.targetUserId === customer?.friendUserId ||
        message.userId === customer?.friendUserId
      ) {
        queryClient.setQueryData(
          ['messages', customer?.friendUserId],
          (
            oldData: InfiniteData<TMessageChatPage> | undefined,
          ): InfiniteData<TMessageChatPage> => {
            const newData = oldData?.pages ? [...oldData.pages] : [];
            let numDel = 0;
            newData.forEach(item => {
              item.listMessage.forEach((el, i) => {
                if (el.id === message.id) {
                  item.listMessage.splice(i, 1);
                  numDel++;
                }
              });
            });
            newData.forEach(item => {
              item.total -= numDel;
            });
            return {
              pageParams: oldData?.pageParams ?? [],
              pages: newData,
            };
          },
        );
        const newValueDelete = data?.pages ? [...data?.pages] : [];
        setSending(newValueDelete);
        queryClient.refetchQueries(['userChat']);
      }
    });
    return () => {
      hubConnection.off('getChatMessage');
      hubConnection.off('deleteChatMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    queryClient.refetchQueries(['userChat']);
    // return () => {
    //   queryClient.clear();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <HeaderBoxChat
          avatarUrl={customer?.friendProfilePictureId ?? ''}
          name={customer?.friendUserName}
          isOnline={customer?.isOnline}
        />
        <FlatList
          ref={ref_flat_list}
          inverted={true}
          ListFooterComponent={
            <View>{isLoading ? <ActivityIndicator /> : <View />}</View>
          }
          onEndReached={onLoadMore}
          style={{
            backgroundColor: '#eeeeee',
          }}
          data={
            data?.pages
              ? data.pages.flatMap((page: TMessageChatPage) => [
                  ...page.listMessage,
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
            return (
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
                      source={{uri: customer?.friendProfilePictureId ?? ''}}
                      size={28}
                    />
                  ) : (
                    <View style={{width: 28, height: 28}} />
                  )}

                  <MessageComponent
                    // {...props}
                    mess={item}
                    emotionDisable={false}
                    // setReplyMess={setReplyMess}
                    deleteMess={deleteMess}
                  />
                </View>
              </View>
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

export default ChatboxScreen;
