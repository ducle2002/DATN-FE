import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useListNotifications} from './services/hook';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import NotificationService, {TNotification} from './services/notification';
import NotificationItem from './components/notification-item';
import {LayoutProvider, RecyclerListView} from 'recyclerlistview';
import ReactNativeModal from 'react-native-modal';
import {useQuery} from 'react-query';
import ImagesGridGallery from '@/components/images-grid-gallery';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '@/components/icon.component';
import globalStyles from '@/config/globalStyles';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamsList} from '@/routes/app.stack';

type Props = StackScreenProps<AppStackParamsList, 'NOTIFICATION'>;
const NotificationScreen = ({route}: Props) => {
  const [modalController, setModalController] = useState({
    isVisible: false,
    id: '',
  });

  useEffect(() => {
    if (route.params?.id) {
      setModalController({
        isVisible: true,
        id: route.params.id,
      });
    }
  }, [route.params?.id]);

  const onModalClose = () => {
    setModalController({
      isVisible: false,
      id: '',
    });
  };
  const {data: notification} = useQuery({
    queryKey: ['notification', modalController.id],
    queryFn: () => NotificationService.getById({id: modalController.id}),
    enabled: modalController.isVisible && !!modalController.id,
  });
  const {data, fetchNextPage, remove, refetch, status} = useListNotifications();

  const dataProvider = useMemo(
    () =>
      dataProviderMaker(data?.pages.flatMap(page => page.notifications) ?? []),
    [data],
  );

  const renderItem = (_type: any, item: TNotification) => (
    <NotificationItem
      notification={item}
      setId={() => setModalController({id: item.id, isVisible: true})}
    />
  );
  const {top, bottom} = useSafeAreaInsets();

  const {width} = useWindowDimensions();
  const _layoutProvider = useRef(
    new LayoutProvider(
      () => {
        return 'single_type';
      },
      (_, dim) => {
        dim.width = width;
      },
    ),
  ).current;

  return (
    <>
      <RecyclerListView
        dataProvider={dataProvider}
        layoutProvider={_layoutProvider}
        forceNonDeterministicRendering={true}
        rowRenderer={renderItem}
        contentContainerStyle={styles.contentContainer}
        onEndReached={() => fetchNextPage()}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              remove();
              refetch();
            }}
            refreshing={status === 'loading'}
          />
        }
      />
      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onModalClose}
        onBackButtonPress={onModalClose}
        isVisible={modalController.isVisible}
        style={{
          marginTop: top,
          marginBottom: bottom,
        }}>
        <View style={[styles.modalButtonContainer]}>
          <Pressable onPress={onModalClose} style={styles.modalButton}>
            <Icon type="Ionicons" name="close" />
          </Pressable>
        </View>
        <View style={styles.modalContentContainer}>
          <ScrollView>
            <Text style={styles.textTitle}>
              {notification?.notification.notificationName}
            </Text>
            <Text style={styles.textMessage}>
              {notification?.notification.data.properties.Message}
            </Text>
            {notification?.notification.data.properties.ImageUrl && (
              <ImagesGridGallery
                images={[notification?.notification.data.properties.ImageUrl]}
              />
            )}
          </ScrollView>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  modalButtonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  modalButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  textTitle: {
    ...globalStyles.text15Medium,
    color: '#2b2b2b',
    textAlign: 'center',
    marginBottom: 5,
  },
  textMessage: {
    ...globalStyles.text14Medium,
    color: '#2b2b2b',
    marginBottom: 5,
  },
});
