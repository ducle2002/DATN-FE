import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, {memo, useState} from 'react';
// import ChooseImageModal from '@/components/modals/choose-image-modal';
// import httpUtil from '@/utils/http.util';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import Icon from '@/components/icon.component';
import {useToast} from 'react-native-toast-notifications';
import ChooseImageModal from '@/components/choose-image-modal';
import UtilsApi from '@/utils/utils.service';

const {width, height} = Dimensions.get('screen');
type Props = {
  scrollTopWhenSend?: Function;
  sendMess: Function;
  setProgress: Function;
};
function SendBox({
  scrollTopWhenSend = () => {},
  sendMess = () => {},
  setProgress = () => {},
}: Props) {
  const [textValue, setTextValue] = useState('');
  const [visibleChooseImg, setVisibleChooseImg] = useState(false);
  const toast = useToast();

  const sendMedia = (images: any[]) => {
    setProgress(true);

    const listVideos = [];
    const listImages = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i].type?.includes('video')) {
        listVideos.push(images[i]);
      } else {
        listImages.push(images[i]);
      }
    }

    if (listVideos.length > 0) {
      for (let k = 0; k < listVideos.length; k++) {
        // httpUtil
        //   .uploadFile({
        //     file: listVideos[k],
        //   })
        //   .then((res: any) => {
        //     const payload = {
        //       message: JSON.stringify(res.result.data),
        //       type: 3,
        //     };
        //     sendMess(payload);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     setProgress(false);
        //   });
      }
      setProgress(false);
    }
    if (listImages.length > 1) {
      UtilsApi.uploadImagesRequest(listImages).then((res: any) => {
        const payload = {
          message: JSON.stringify(res),
          type: 5,
        };
        sendMess(payload);
        setProgress(false);
      });
    } else if (listImages.length > 0) {
      UtilsApi.uploadImagesRequest(listImages).then((res: any) => {
        const payload = {
          message: res[0],
          type: 2,
        };
        // console.log(res);
        sendMess(payload);
        console.log(payload);
        setProgress(false);
      });
    }
  };
  const handleError = (err: any) => {
    if (DocumentPicker.isCancel(err)) {
      toast.show('Huỷ tải tệp lên.\n Vui lòng thử lại', {
        type: 'normal',
        placement: 'center',
        duration: 2000,
        animationType: 'slide-in',
      });
    } else if (isInProgress(err)) {
      toast.show(
        'multiple pickers were opened, only the last will be considered',
        {
          type: 'danger',
          placement: 'center',
          duration: 2000,
          animationType: 'slide-in',
        },
      );
    } else {
      toast.show('Tải file lên bị lỗi', {
        type: 'danger',
        placement: 'center',
        duration: 2000,
        animationType: 'slide-in',
      });
      throw err;
    }
  };
  const getFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [
          types.csv,
          types.doc,
          types.docx,
          types.plainText,
          types.pdf,
          types.ppt,
          types.pptx,
          types.xls,
          types.zip,
          types.xlsx,
          types.audio,
        ],
      });
      const file = {
        uri: pickerResult.fileCopyUri,
        type: pickerResult.type,
        size: pickerResult.size,
        name: pickerResult.name,
      };
      setProgress(true);
      UtilsApi.uploadFilesRequest(file)
        .then((res: any) => {
          const payload = {
            message: res,
            type: 4,
          };
          sendMess(payload);

          setProgress(false);
        })
        .catch(e => {
          setProgress(false);
          handleError(e);
        });
    } catch (e) {
      setProgress(false);
      handleError(e);
    }
  };
  return (
    <View>
      <View
        style={{
          ...styles.container,
        }}>
        <Pressable
          style={styles.iconLeft}
          onPress={() => {
            getFile();
          }}>
          <Icon
            type="Ionicons"
            name="document-attach-outline"
            color={'#2B5783'}
            size={width > 440 ? 40 : 32}
          />
        </Pressable>
        <View style={styles.inputCenterContainer}>
          <ScrollView>
            <TextInput
              value={textValue}
              multiline={true}
              onChangeText={setTextValue}
              placeholder={'Nhập tin nhắn'}
              placeholderTextColor={'#BDBDBD'}
              style={styles.inputCenter}
            />
          </ScrollView>
          <Pressable
            style={{paddingHorizontal: 5}}
            onPress={() => {
              Keyboard.dismiss();
              setVisibleChooseImg(true);
              // props.setVisibleChooseImg();
            }}>
            <Icon
              type="Ionicons"
              name="image-outline"
              size={width > 440 ? 36 : 28}
              color="#2B5783"
            />
          </Pressable>
        </View>

        <Pressable
          style={{paddingHorizontal: 10}}
          onPress={() => {
            if (textValue && textValue !== '') {
              const payload = {
                message: textValue,
                type: 1,
              };
              sendMess(payload);
              setTextValue('');
            }
            Keyboard.dismiss();
            scrollTopWhenSend();
          }}>
          <Icon
            type="Ionicons"
            name="send"
            color={textValue && textValue !== '' ? '#2B5783' : '#adb5bd'}
            size={width > 440 ? 40 : 32}
          />
        </Pressable>
        <ChooseImageModal
          setVisibleChooseImg={setVisibleChooseImg}
          visibleChooseImg={visibleChooseImg}
          setImages={sendMedia}
          multiple={true}
          compressImageMaxHeight={height}
          compressImageMaxWidth={width}
          mediaType={'photo'}
        />
      </View>
    </View>
  );
}
export default memo(SendBox);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconLeft: {paddingHorizontal: 10, paddingVertical: 5},
  inputCenterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.015,
  },
  inputCenter: {
    color: '#333333',
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    padding: 0,
  },
});
