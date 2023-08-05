import React, {useState, useEffect} from 'react';
import {View, Pressable, Dimensions, Vibration, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
const {width} = Dimensions.get('window');

export default function ListMediaChat({
  message,
  side,
  setImgOverlay,
}: {
  message: string;
  side: number;
  setImgOverlay: Function;
}) {
  const [listImg, setListImg] = useState([]);
  useEffect(() => {
    if (message && JSON.parse(message).length) {
      setListImg(JSON.parse(message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: side === 1 ? 'flex-end' : 'flex-start',
      }}>
      {listImg.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              setImgOverlay({
                visible: true,
                type: 1,
                uri: item,
              });
            }}
            onLongPress={() => {
              if (Platform.OS === 'ios') {
                Vibration.vibrate([100]);
              } else {
                Vibration.vibrate(100);
              }
              setImgOverlay({
                visible: true,
                type: 2,
                uri: item,
              });
            }}>
            <FastImage
              source={{uri: item}}
              style={{
                width: width * 0.26,
                height: width * 0.26,
                borderTopLeftRadius: index === 0 ? 16 : 0,
                borderTopRightRadius:
                  (listImg.length > 2 && index === 2) ||
                  (listImg.length <= 2 && index === 1)
                    ? 16
                    : 0,
                borderBottomLeftRadius:
                  (listImg.length % 3 ? listImg.length % 3 : 3) + index ===
                    listImg.length ||
                  (side === 1 &&
                    listImg.length - (listImg.length % 3) - 3 === index)
                    ? 16
                    : 0,
                borderBottomRightRadius:
                  index + 1 === listImg.length ||
                  (listImg.length % 3 !== 0 &&
                    listImg.length - (listImg.length % 3) - 1 === index)
                    ? 16
                    : 0,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
