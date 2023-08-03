import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import ReactNativeModal from 'react-native-modal';
import {useToast} from 'react-native-toast-notifications';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {TMessageFeedback} from '@/modules/feedback/feedback.model';
import Icon from '@/components/icon.component';
const {height} = Dimensions.get('screen');
type PropsItemMessTagFB = {
  title: string;
  date?: string;
  colorBorder?: string;
  color?: string;
};
const ItemMessgeTagFB = ({
  title = '',
  date,
  colorBorder = '#007f5f',
  color = '#007f5f',
}: PropsItemMessTagFB) => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: '2%',
      }}>
      {date && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <View style={{...styles.lineHorizontal, borderColor: colorBorder}} /> */}
          <Text
            style={{
              ...styles.txtDate,
              color: colorBorder,
            }}>
            {moment(date).format('HH:MM DD/MM/YY')}
          </Text>
          {/* <View style={{...styles.lineHorizontal, borderColor: colorBorder}} /> */}
        </View>
      )}

      <View
        style={{
          ...styles.containerTitle,
          borderColor: colorBorder,
          backgroundColor: color,
        }}>
        <Text style={{...styles.txtTitle, color: 'white'}}>{title}</Text>
      </View>
    </View>
  );
};
type PropsDeclineTag = {
  content: string;
  creationTime?: string;
  fileUrl: Array<string>;
};
const DeclinedTag = ({
  content,
  creationTime,
  fileUrl = [],
}: PropsDeclineTag) => {
  const [visible, setVisibleOverlay] = useState(false);
  const toast = useToast();
  const toggleOverlay = () => {
    setVisibleOverlay(!visible);
  };
  const ref_Over = useRef<ImageViewer | null>(null);
  const saveHandle = async (uri: string) => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', uri)
      .then((res: any) => {
        CameraRoll.save(res.data, {
          type: 'photo',
        })
          .then(() => {
            toast.show('Lưu ảnh thành công', {
              placement: 'center',
              duration: 1000,
              type: 'success',
            });
          })
          .catch((error: any) => {
            toast.show('Lưu ảnh thất bại\n' + error, {
              placement: 'center',
              duration: 1000,
              type: 'normal',
            });
          });
      })
      .catch((error: any) => console.log(error));
  };
  return (
    <View style={styles.containerDeclined}>
      <Text style={styles.dateDeclined}>
        {moment(creationTime).format('HH:MM DD/MM/YY')}
      </Text>
      <Pressable style={styles.Declined} onPress={toggleOverlay}>
        {fileUrl && (
          <View>
            <Image
              source={{
                uri: fileUrl.length ? fileUrl[0] : '',
              }}
              style={styles.imgDecline}
            />
            <ReactNativeModal
              onBackButtonPress={toggleOverlay}
              isVisible={visible}
              style={{margin: 0}}>
              <SafeAreaView
                style={{flexDirection: 'row', width: '100%', height: height}}>
                <TouchableOpacity
                  onPress={toggleOverlay}
                  style={{position: 'absolute', left: 0, top: 40, zIndex: 10}}>
                  <Icon
                    type="Ionicons"
                    size={20}
                    name="close-outline"
                    color={'white'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    ref_Over.current?.saveToLocal();
                  }}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 40,
                    zIndex: 10,
                  }}>
                  <Icon
                    type="Ionicons"
                    size={20}
                    name="download-outline"
                    color="white"
                  />
                </TouchableOpacity>
                <ImageViewer
                  ref={ref_Over}
                  onSave={uri => {
                    saveHandle(uri);
                  }}
                  imageUrls={[{url: fileUrl.length ? fileUrl[0] : ''}]}
                />
              </SafeAreaView>
            </ReactNativeModal>
          </View>

          // <ImagesGridGallery images={[fileUrl.length ? fileUrl[0] : '']} />
        )}
        <View style={styles.containerContent}>
          <Text style={styles.txtDeclined}>
            Phản ánh cần xử lý thêm. Nhận xét của người dùng
          </Text>
          {content ? (
            <Text style={styles.txtContentDeclined}>{content}</Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
};
type PropsTagState = {
  typeMess?: number;
  message: TMessageFeedback;
};
export default function MessageTagFeedbackState({
  typeMess,
  message,
}: PropsTagState) {
  switch (typeMess) {
    case 8:
      return (
        <ItemMessgeTagFB
          title={'Phản ánh mới được tạo'}
          date={message.creationTime}
          color={'#fdb833'}
          colorBorder={'#fdb833'}
        />
      );
    case 9:
      return (
        <DeclinedTag
          content={message?.comment ? message.comment : ''}
          fileUrl={message?.fileUrl ? JSON.parse(message.fileUrl) : null}
          creationTime={message.creationTime}
        />
      );
    case 10:
      return (
        <ItemMessgeTagFB
          title={'Phản ánh đang được xử lý'}
          date={message.creationTime}
          color={'#0077b6'}
          colorBorder={'#0077b6'}
        />
      );
    case 11:
      return (
        <ItemMessgeTagFB
          title={'Phản ánh được admin xác nhận đã xử lý xong'}
          date={message.creationTime}
        />
      );
    case 12:
      return (
        <ItemMessgeTagFB
          title={'Phản ánh đã được xử lý'}
          date={message.creationTime}
          color={'#560bad'}
          colorBorder={'#560bad'}
        />
      );
    case 13:
      return (
        <ItemMessgeTagFB
          title={'Phản ánh đã được đánh giá'}
          date={message.creationTime}
          color={'#774936'}
          colorBorder={'#774936'}
        />
      );
    default:
      return (
        <View>
          <Text>Chú thích phản ánh</Text>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  lineHorizontal: {borderTopWidth: 0.5, flex: 1},
  containerTitle: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 4,
  },
  txtTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007f5f',
    paddingHorizontal: '1.5%',
  },
  txtDate: {fontWeight: '400', fontSize: 12},
  imgDecline: {
    height: height * 0.2,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  containerDeclined: {
    margin: '2%',
    alignItems: 'center',
  },
  Declined: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 1,
  },
  containerContent: {
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },
  txtDeclined: {
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: '1.5%',
    color: '#333333',
  },
  txtContentDeclined: {
    fontSize: 13,
    fontWeight: '400',
    color: '#333333',
    paddingBottom: '2%',
  },
  dateDeclined: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333333',
    paddingVertical: '1%',
  },
});
