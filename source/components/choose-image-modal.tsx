import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-paper';
import ImageCropPicker, {Image} from 'react-native-image-crop-picker';
import {useTranslation} from 'react-i18next';
import {useToast} from 'react-native-toast-notifications';
import {compressImageHandle} from '@/utils/compress-handle';
type Props = {
  visibleChooseImg: boolean;
  setVisibleChooseImg: Function;
  setImages: Function;
  multiple: boolean;
  compressImageMaxHeight?: number;
  compressImageMaxWidth?: number;
  width?: number;
  height?: number;
  cropping?: boolean;
  mediaType?: 'photo' | 'video' | 'any';
};

export type ImageProps = {
  uri: string;
  width: number;
  height: number;
  type: string;
  size: number;
  name: string;
};

const ChooseImageModal = ({
  visibleChooseImg = false,
  setVisibleChooseImg = () => {},
  setImages = () => {},
  multiple = true,
  compressImageMaxHeight = undefined,
  compressImageMaxWidth = undefined,
  width = undefined,
  height = undefined,
  cropping = false,
  mediaType = 'photo',
}: Props) => {
  const toast = useToast();
  const addImage = async (images: Image[]) => {
    let listImgs = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      let imgPushed = null;
      if (!img.mime.includes('video') && img.size > 1048576) {
        imgPushed = await compressImageHandle({
          width: img.width,
          height: img.height,
          size: img.size,
          uri: img.path,
          source: img.sourceURL,
        });
      }
      listImgs.push({
        uri: imgPushed ? imgPushed.path : img.path,
        width: imgPushed ? imgPushed.width : img.width,
        height: imgPushed ? imgPushed.height : img.height,
        type: img.mime,
        size: imgPushed ? imgPushed.size : img.size,
        name: imgPushed
          ? imgPushed.path.substring(imgPushed.path.lastIndexOf('/') + 1)
          : Platform.OS === 'ios'
          ? img.filename
              ?.replace(/HEIC/g, 'jpg')
              .replace(/heic/g, 'jpg')
              .replace(/heif/g, 'jpg')
              .replace(/HEIF/g, 'jpg') ?? img.path
          : img.path.substring(img.path.lastIndexOf('/') + 1),
      });
    }
    setImages(listImgs);
  };

  const {t} = useTranslation();

  return (
    <Modal
      isVisible={visibleChooseImg}
      backdropTransitionOutTiming={100}
      animationOutTiming={100}
      onBackdropPress={() => {
        setVisibleChooseImg(false);
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: '3%',
          width: '70%',
        }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            ImageCropPicker.openCamera({
              width: width,
              height: height,
              mediaType: mediaType,
              cropping: cropping,
              // compressImageQuality: 0.1,
              // compressImageMaxHeight: compressImageMaxHeight,
              // compressImageMaxWidth: compressImageMaxWidth,
            })
              .then(image => {
                setVisibleChooseImg(false);
                addImage([image]);
              })
              .catch(err => {
                console.log(err);
                setVisibleChooseImg(false);
                toast.show('Lỗi mở camera', {
                  placement: 'top',
                  duration: 1000,
                  type: 'danger',
                });
              });
          }}>
          <Text style={[styles.textItem]}>Chụp ảnh</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            ImageCropPicker.openPicker({
              width: width,
              height: height,
              mediaType: mediaType,
              multiple: multiple,
              // compressImageQuality: Platform.OS === 'ios' ? 0.2 : 0.1,
              // compressImageMaxHeight: compressImageMaxHeight,
              // compressImageMaxWidth: compressImageMaxWidth,
              // compressImageQuality: 0.1,
              cropping: cropping,
            })
              .then(image => {
                if (Array.isArray(image)) {
                  addImage(image);
                  setVisibleChooseImg(false);
                } else {
                  addImage([image]);
                  setVisibleChooseImg(false);
                }
              })
              .catch(err => {
                setVisibleChooseImg(false);
                const isCancel =
                  err.message === 'User cancelled image selection';
                toast.show(
                  isCancel
                    ? 'Hủy chọn ảnh từ thư viện'
                    : 'Lỗi chọn ảnh từ thư viện',
                  {
                    duration: 1000,
                    type: 'danger',
                    placement: 'top',
                  },
                );
              });
          }}>
          <Text style={[styles.textItem]}>Chọn ảnh từ thư viện</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={styles.item}
          onPress={() => setVisibleChooseImg(false)}>
          <Text style={[styles.textItem, {color: '#d90429'}]}>Hủy bỏ</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ChooseImageModal;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  textItem: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
});
