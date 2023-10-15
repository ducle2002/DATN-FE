import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TWorkComment} from '../services/work.model';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import globalStyles from '@/config/globalStyles';
import ReactNativeModal from 'react-native-modal';
import Carousel from 'react-native-reanimated-carousel';
import Icon from '@/components/icon.component';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width} = Dimensions.get('screen');
type Props = {
  item: TWorkComment;
};

const ImageDetail = ({uri}: {uri: string}) => {
  const [aspectRatio, setAspectRatio] = useState(1000);
  Image.getSize(uri, (w, h) => setAspectRatio(w / h));
  return (
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FastImage
        source={{uri: uri}}
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

const WorkCommentItem = ({item}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: 'https://imaxtek.s3.ap-southeast-1.amazonaws.com/public/1680657760154-2679.jpg',
          }}
          style={{width: 50, height: 50, borderRadius: 50}}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.textName}>{item.fullName}</Text>
          <Text style={styles.textTime}>
            {moment(item.creationTime).format('HH:mm:ss DD/MM/YYYY')}
          </Text>
          <View style={styles.content}>
            {item.content && (
              <Text style={styles.textContent}>{item.content}</Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {item.imageUrls.length > 0 &&
                item.imageUrls.map(image => (
                  <Pressable
                    onPress={() => setIsVisible(true)}
                    key={image}
                    style={{flexBasis: '33%', padding: 5}}>
                    <FastImage
                      source={{uri: image}}
                      style={{width: '100%', aspectRatio: 1, borderRadius: 10}}
                    />
                  </Pressable>
                ))}
            </View>
          </View>
        </View>
      </View>
      {item.imageUrls.length > 0 && (
        <ReactNativeModal
          onBackdropPress={() => setIsVisible(false)}
          isVisible={isVisible}
          style={{margin: 0}}
          backdropOpacity={1}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}>
          <SafeAreaView>
            <View style={{width: '100%', justifyContent: 'center'}}>
              <Pressable
                onPress={() => setIsVisible(false)}
                style={{
                  zIndex: 1000,
                  position: 'absolute',
                  top: 60,
                  left: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Icon type="Ionicons" name="close" color={'black'} style={{}} />
              </Pressable>
              <Carousel
                width={width}
                data={item.imageUrls}
                renderItem={({item: image}) => <ImageDetail uri={image} />}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </SafeAreaView>
        </ReactNativeModal>
      )}
    </>
  );
};

export default WorkCommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentContainer: {
    marginLeft: 10,
    flex: 1,
  },
  textName: {
    ...globalStyles.text16Bold,
  },
  textTime: {
    ...globalStyles.text15Regular,
    color: '#ababab',
    marginTop: 5,
  },
  textContent: {
    ...globalStyles.text16SemiBold,
  },
  content: {
    backgroundColor: '#f1f2f8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
  },
});
