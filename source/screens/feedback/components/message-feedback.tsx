import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
  Vibration,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import moment from 'moment';
import TooltipMessage from '../../chat/components/tooltip-message';
import ImgChat from '../../chat/components/img-chat';
import ListMediaChat from '../../chat/components/list-media-chat';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Menu} from 'react-native-paper';
import {TMessageFeedback} from '@/modules/feedback/feedback.model';
const {width, height} = Dimensions.get('screen');
type Props = {
  mess: TMessageFeedback;
  emotionDisable: boolean;
  deleteMess: Function;
};
const MessageFeedback = ({
  mess,
  emotionDisable = false,
  deleteMess = () => {},
}: Props) => {
  const [emotionVisible, setEmotionVisible] = useState(false);
  const [positionVisible, setPositionVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const [imgOverlay, setImgOverlay] = useState({
    visible: false,
    type: 1,
    uri: '',
  });

  const getArrayUrl = () => {
    if (mess.typeComment === 5 || mess.typeComment === 6) {
      const imgs = JSON.parse(mess.comment);
      let imgUrls: any = [];
      imgs.forEach((val: string, _index: number) => {
        imgUrls.push({
          url: val,
        });
      });

      return imgUrls;
    } else {
      return [];
    }
  };
  const getIndexImgOverlay = () => {
    if (imgOverlay.uri !== '') {
      const imgs = JSON.parse(mess.comment);
      return imgs.indexOf(imgOverlay.uri);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: mess.side === 1 ? 'flex-end' : 'flex-start',
      }}>
      <Menu
        visible={emotionVisible}
        onDismiss={() => setEmotionVisible(false)}
        anchor={
          mess.typeComment === 2 || mess.typeComment === 5 ? (
            <Pressable
              onPress={() => {
                if (mess.typeComment === 2) {
                  setImgOverlay({
                    visible: true,
                    type: 1,
                    uri: mess.comment,
                  });
                }
              }}
              onLongPress={_event => {
                if (mess.typeComment === 2) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  setImgOverlay({
                    visible: true,
                    type: 2,
                    uri: mess.comment,
                  });
                }
              }}
              style={{
                padding: 10,
                marginVertical: 5,
                alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                maxWidth: '100%',
              }}>
              {mess.typeComment === 2 ? (
                <ImgChat mess={mess.comment} overlayReview={false} />
              ) : (
                <ListMediaChat
                  message={mess.comment}
                  side={1}
                  setImgOverlay={setImgOverlay}
                />
              )}
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.7)',
                  paddingRight: mess.side === 1 ? 10 : 0,
                  alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                }}>
                {moment(mess.creationTime).format('HH:mm')}
              </Text>
            </Pressable>
          ) : mess.typeComment === 4 ? (
            <Pressable
              onLongPress={event => {
                if (!emotionDisable) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  if (event.nativeEvent.pageY > 500) {
                    setPositionVisible(true);
                  }
                  if (event.nativeEvent.pageY < 380) {
                    setPositionVisible(false);
                  }
                  setEmotionVisible(true);
                }
              }}
              onPress={() => {
                Linking.openURL(mess.comment);
              }}>
              <View
                style={[
                  {
                    backgroundColor: '#dedede',
                    padding: 10,
                    marginVertical: 5,
                    alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginHorizontal: '3%',
                  },
                ]}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width * 0.1,
                    aspectRatio: 1,
                    backgroundColor: '#adb5bd',
                    borderRadius: width * 0.1,
                    marginRight: 5,
                  }}>
                  <Ionicons name="document-text" color={'#333333'} size={20} />
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#333333',
                    fontWeight: '300',
                    maxWidth: '80%',
                  }}>
                  {mess?.comment?.substring(mess.comment.lastIndexOf('/') + 1)}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.7)',
                  paddingRight: mess.side === 1 ? 10 : 0,
                  alignSelf: mess.side === 1 ? 'flex-end' : 'flex-start',
                  marginRight: mess.side === 1 ? '5%' : 0,
                  marginLeft: mess.side === 1 ? 0 : '5%',
                }}>
                {moment(mess.creationTime).format('HH:mm')}
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[
                mess.side === 1 ? styles.mesSend : styles.mesRecv,
                styles.mess,
              ]}
              onLongPress={event => {
                if (!emotionDisable) {
                  if (Platform.OS === 'ios') {
                    Vibration.vibrate([100]);
                  } else {
                    Vibration.vibrate(100);
                  }
                  if (event.nativeEvent.pageY > 500) {
                    setPositionVisible(true);
                  }
                  if (event.nativeEvent.pageY < 380) {
                    setPositionVisible(false);
                  }
                  setEmotionVisible(true);
                }
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: mess.side === 1 ? '#ffffff' : '#333333',
                  alignSelf: mess.side === 1 ? 'flex-start' : 'flex-end',
                }}>
                {mess.comment}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color:
                    mess.side === 1
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(0,0,0,0.7)',
                  alignSelf: mess.side === 1 ? 'flex-start' : 'flex-end',
                }}>
                {moment(mess.creationTime).format('HH:mm')}
              </Text>
            </Pressable>
          )
        }
        anchorPosition="bottom"
        contentStyle={{
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
        <View style={{width: width * 0.83}}>
          <TooltipMessage
            deleteMess={deleteMess}
            mess={mess}
            setEmotionVisible={() => {
              setEmotionVisible(!emotionVisible);
            }}
          />
        </View>
      </Menu>
      {mess.readState === 0 && mess.id === null ? (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginHorizontal: width * 0.05,
            alignItems: 'center',
            borderRadius: width * 0.1,
            borderWidth: 1,
            borderColor: '#339FD9',
            paddingVertical: height * 0.001,
            paddingHorizontal: width * 0.01,
          }}>
          <MaterialCommunityIcons
            name="send-clock-outline"
            color="#339FD9"
            size={16}
          />
          <Text
            style={{
              color: '#339FD9',
              fontSize: 11,
              fontWeight: '500',
              paddingLeft: width * 0.01,
            }}>
            Đang gửi
          </Text>
        </View>
      ) : null}
      <Modal
        style={{
          marginHorizontal: 0,
        }}
        isVisible={imgOverlay.visible}
        presentationStyle="overFullScreen"
        animationIn={'fadeInUpBig'}>
        <SafeAreaView
          style={{
            height: height,
            paddingTop: Math.max(insets.top, 0),
          }}
          edges={['top']}>
          {imgOverlay.type === 1 ? (
            <View style={{flex: 1}}>
              <View
                style={{
                  position: 'absolute',
                  top: height * 0.01,
                  left: width * 0.02,
                  zIndex: 10,
                }}>
                <Ionicons
                  name="close-circle-sharp"
                  color={'#fff'}
                  size={32}
                  onPress={() => {
                    setImgOverlay({
                      visible: false,
                      type: 1,
                      uri: '',
                    });
                  }}
                />
              </View>
              {mess.typeComment === 2 || mess.typeComment === 5 ? (
                <ImageViewer
                  enableSwipeDown={true}
                  onSwipeDown={() => {
                    setImgOverlay({
                      visible: false,
                      type: 1,
                      uri: '',
                    });
                  }}
                  renderImage={props => {
                    // const check = props.style.width
                    //   ? height / width >= props.style.height / props.style.width
                    //   : null;

                    return (
                      <FastImage
                        source={{uri: props.source.uri}}
                        // style={{
                        //   width: check
                        //     ? width
                        //     : props.style.height
                        //     ? (width * height) / props.style.height
                        //     : 0,
                        //   height: check
                        //     ? (width * props.style.height) / props.style.width
                        //     : height,
                        // }}
                        style={{
                          width: props.style.width ?? width,
                          height: props.style.height ?? height,
                        }}
                      />
                    );
                  }}
                  imageUrls={[{url: imgOverlay.uri}]}
                  enableImageZoom={true}
                />
              ) : (
                <ImageViewer
                  imageUrls={getArrayUrl()}
                  onSwipeDown={() => {
                    setImgOverlay({
                      visible: false,
                      type: 1,
                      uri: '',
                    });
                  }}
                  renderImage={props => {
                    // const check = props.style.width
                    //   ? height / width >= props.style.height / props.style.width
                    //   : null;
                    return (
                      <FastImage
                        source={{
                          uri: props.source.uri,
                        }}
                        // style={{
                        //   width: check
                        //     ? width
                        //     : props.style.height
                        //     ? (width * height) / props.style.height
                        //     : 0,
                        //   height: check
                        //     ? (width * props.style.height) / props.style.width
                        //     : height,
                        // }}
                        style={{
                          width: props.style.width ?? width,
                          height: props.style.height ?? height,
                        }}
                      />
                    );
                  }}
                  enableImageZoom={true}
                  enableSwipeDown={true}
                  index={getIndexImgOverlay()}
                />
              )}
            </View>
          ) : (
            <Pressable
              onPress={() => {
                setImgOverlay({
                  visible: false,
                  type: 1,
                  uri: '',
                });
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: width * 0.05,
              }}>
              <TouchableWithoutFeedback>
                <>
                  <View
                    style={{
                      alignItems: mess.side === 1 ? 'flex-end' : 'flex-start',
                      width: '100%',
                      paddingBottom: height * 0.01,
                    }}>
                    {mess.typeComment === 2 && (
                      <ImgChat
                        mess={
                          mess.typeComment === 2
                            ? imgOverlay.uri
                            : imgOverlay.uri.replaceAll('"', '')
                        }
                        overlayReview={false}
                      />
                    )}
                  </View>

                  <TooltipMessage
                    mess={mess}
                    deleteMess={deleteMess}
                    setEmotionVisible={() => {
                      setImgOverlay({
                        visible: false,
                        type: 1,
                        uri: '',
                      });
                    }}
                  />
                </>
              </TouchableWithoutFeedback>
            </Pressable>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default MessageFeedback;

const styles = StyleSheet.create({
  mess: {
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    // alignSelf: 'flex-end',
    maxWidth: '70%',
    // borderRadius: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    minWidth: '15%',
  },
  mesSend: {
    backgroundColor: '#0078fe',
    marginBottom: 5,
    marginRight: '2.5%',
    // alignSelf: 'flex-end',
    borderBottomLeftRadius: 16,
  },
  mesRecv: {
    backgroundColor: '#dedede',
    marginLeft: '1.5%',
    // alignSelf: 'flex-start',
    alignItems: 'center',
    borderBottomRightRadius: 16,
  },
  backgroundVideo: {
    height: height * 0.3,
    width: width * 0.7,
    borderRadius: 8,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
