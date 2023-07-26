/* eslint-disable no-shadow */
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  ImageBackground,
  Platform,
  StatusBar,
  ViewStyle,
} from 'react-native';
import React, {memo, useRef, useState} from 'react';
import {faker} from '@faker-js/faker';
import Icon from './icon.component';
import ImageViewer from 'react-native-image-zoom-viewer';
import FastImage from 'react-native-fast-image';
import ReactNativeModal from 'react-native-modal';
// import Toast from 'react-native-toast-notifications';
// import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
const {height} = Dimensions.get('screen');

const SingleImage = memo(
  ({
    image,
    toggleOverlay = () => {},
  }: {
    image: string;
    toggleOverlay: Function;
  }) => {
    return (
      <View style={[{width: '100%'}]}>
        <Pressable onPress={() => toggleOverlay(0)}>
          <FastImage
            key={faker.string.uuid()}
            source={{uri: image}}
            style={{width: '100%', aspectRatio: 1.5, borderRadius: 10}}
          />
        </Pressable>
      </View>
    );
  },
);

const DoubleImages = ({
  images,
  toggleOverlay,
}: {
  images: string[];
  toggleOverlay: Function;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{width: '49%', aspectRatio: 1 / 1.5}}
        onPress={() => toggleOverlay(0)}>
        <FastImage
          source={{uri: images[0]}}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </Pressable>
      <Pressable
        style={{width: '49%', aspectRatio: 1 / 1.5}}
        onPress={() => toggleOverlay(1)}>
        <FastImage
          source={{uri: images[1]}}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </Pressable>
    </View>
  );
};

const TripleImages = ({
  images,
  toggleOverlay,
}: {
  images: string[];
  toggleOverlay: Function;
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{width: '49%', aspectRatio: 1 / 2}}
        onPress={() => toggleOverlay(0)}>
        <FastImage
          source={{uri: images[0]}}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </Pressable>
      <View
        style={{
          width: '49%',
          aspectRatio: 1 / 2,
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={{width: '100%', height: '49%'}}
          onPress={() => toggleOverlay(1)}>
          <FastImage
            source={{uri: images[1]}}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </Pressable>
        <Pressable
          style={{width: '100%', height: '49%'}}
          onPress={() => toggleOverlay(2)}>
          <FastImage
            source={{uri: images[2]}}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </Pressable>
      </View>
    </View>
  );
};

const MultiImages = ({
  images,
  toggleOverlay,
  goToFullView = () => {},
}: {
  images: string[];
  toggleOverlay: Function;
  goToFullView?: Function;
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Pressable
        style={{width: '49%', aspectRatio: 1 / 1.5}}
        onPress={() => toggleOverlay(0)}>
        <FastImage
          source={{uri: images[0]}}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </Pressable>
      <View
        style={{
          width: '49%',
          aspectRatio: 1 / 1.5,
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={{width: '100%', height: '49%'}}
          onPress={() => toggleOverlay(1)}>
          <FastImage
            source={{uri: images[1]}}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            console.log(goToFullView);
            if (!goToFullView) {
              toggleOverlay(0);
            } else {
              goToFullView();
            }
          }}
          style={{width: '100%', height: '49%', borderRadius: 10}}>
          <ImageBackground
            source={{uri: images[2]}}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '600'}}>
                +{images.length - 2}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
};

const ImagesGridGallery = ({
  images,
  goToView,
  containerStyle,
}: {
  images: string[];
  containerStyle?: ViewStyle;
  goToView?: Function;
}) => {
  const [visible, setVisible] = useState({
    isVisible: false,
    index: 0,
  });

  // const toastRef = useRef();
  const toggleOverlay = (index: number) => {
    setVisible({isVisible: !visible.isVisible, index: index});
  };
  const ref_img_viewer = useRef<ImageViewer | null>(null);

  const saveHandle = async (uri: string) => {
    // RNFetchBlob.config({
    //   fileCache: true,
    //   appendExt: 'png',
    // })
    //   .fetch('GET', uri)
    //   .then((res: any) => {
    //     CameraRoll.save(res.data, 'photo')
    //       .then((res: any) => {
    //         // toastRef.current.show('Lưu ảnh thành công', {
    //         //   placement: 'center',
    //         //   duration: 1000,
    //         // });
    //         console.log('Lưu ảnh thành công');
    //       })
    //       .catch(error => {
    //         // toastRef.current.show('Lưu ảnh thất bại', {
    //         //   placement: 'center',
    //         //   duration: 1000,
    //         // });
    //         console.log('Lưu ảnh thất bại');
    //       });
    //   })
    //   .catch((error: any) => console.log(error));
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {images.length === 1 ? (
        <SingleImage image={images[0]} toggleOverlay={toggleOverlay} />
      ) : images.length === 2 ? (
        <DoubleImages images={images} toggleOverlay={toggleOverlay} />
      ) : images.length === 3 ? (
        <TripleImages images={images} toggleOverlay={toggleOverlay} />
      ) : (
        <MultiImages
          images={images}
          toggleOverlay={toggleOverlay}
          goToFullView={goToView}
        />
      )}
      <ReactNativeModal
        onBackButtonPress={() => toggleOverlay(0)}
        isVisible={visible.isVisible}
        style={{margin: 0}}>
        {/* <Toast ref={toastRef} /> */}
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: height,
            top: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
          }}>
          <Icon
            // reverse
            size={20}
            onPress={() => toggleOverlay(0)}
            name="close-outline"
            type="Ionicons"
            // containerStyle={{
            //   position: 'absolute',
            //   left: 0,
            //   top: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
            //   zIndex: 10,
            // }}
            style={{
              position: 'absolute',
              left: 0,
              top: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
              zIndex: 10,
            }}
            color={'white'}
          />
          <Icon
            onPress={() => {
              console.log('save');
              ref_img_viewer.current?.saveToLocal();
            }}
            // reverse
            size={20}
            name="download-outline"
            type="Ionicons"
            style={{
              position: 'absolute',
              right: 0,
              top: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
              zIndex: 10,
            }}
            color={'white'}
            // containerStyle={{
            //   position: 'absolute',
            //   right: 0,
            //   top: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
            //   zIndex: 10,
            // }}
          />
          <ImageViewer
            index={visible.index}
            ref={ref_img_viewer}
            imageUrls={images.map((image: string) => {
              return {url: image};
            })}
            onSave={uri => {
              saveHandle(uri);
            }}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default ImagesGridGallery;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
