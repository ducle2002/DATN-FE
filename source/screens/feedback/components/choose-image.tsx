import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
// import LinearGradient from 'react-native-linear-gradient';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from '@/components/icon.component';

export type TImage = {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  setImg: Function;
  multipleImg?: boolean;
  transparentBackDrop?: boolean;
  compressImageMaxHeight?: number;
  compressImageMaxWidth?: number;
  maxImage?: number;
};

const ModalPickerImage = ({
  visible = false,
  onClose = () => {},
  setImg = () => {},
  multipleImg = true,
  transparentBackDrop = false,
  compressImageMaxHeight,
  compressImageMaxWidth,
  maxImage = 5,
}: Props) => {
  const addImage = (images: any[]) => {
    let listImgs = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      listImgs.push({
        uri: img.path,
        width: img.width,
        height: img.height,
        type: img.mime,
        size: img.size,
        name:
          Platform.OS === 'ios'
            ? img.filename
                ?.replace(/HEIC/g, 'jpg')
                .replace(/heic/g, 'jpg')
                .replace(/heif/g, 'jpg')
                .replace(/HEIF/g, 'jpg') ?? img.path
            : img.path.substring(img.path.lastIndexOf('/') + 1),
      });
    }
    return listImgs;
  };
  const takeImage = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
      compressImageMaxHeight: compressImageMaxHeight,
      compressImageMaxWidth: compressImageMaxWidth,
    })
      .then(async image => {
        setImg(addImage([image]));
        onClose();
      })
      .catch(error => {
        console.log('[error take picture img]', error);
        onClose();
      });
  };
  const pickerImageGallery = () => {
    ImageCropPicker.openPicker({
      // width: 300,
      // height: 400,
      mediaType: 'photo',
      multiple: multipleImg,
      compressImageMaxHeight: compressImageMaxHeight,
      compressImageMaxWidth: compressImageMaxWidth,
      maxFiles: maxImage,
    })
      .then(image => {
        if (Array.isArray(image)) {
          setImg(addImage(image));
          onClose();
        } else {
          setImg(addImage([image]));
          onClose();
        }
      })
      .catch(err => {
        onClose();
        const isCancel = err.message === 'User cancelled image selection';
      });
  };
  return (
    <Modal
      isVisible={visible}
      style={{
        margin: 0,
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'flex-end',
      }}
      animationIn="slideInUp"
      animationOut="fadeOutDownBig"
      onBackdropPress={onClose}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={pickerImageGallery}>
          <Icon type="Ionicons" name="images" size={36} color="#B8E756" />
          <Text>{'Chọn từ thư viện'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={takeImage}>
          <Icon type="Ionicons" name="camera" size={36} color="#66A6FF" />
          <Text>{'Chụp ảnh'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalPickerImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: '7%',
    paddingHorizontal: '3%',
    paddingTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  iconContainer: {height: 40, width: 40},
});
