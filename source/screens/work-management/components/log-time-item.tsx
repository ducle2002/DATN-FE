import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from '@/components/icon.component';
import moment from 'moment';
import globalStyles from '@/config/globalStyles';
import {ELogTimeStatus} from '../services/work.model';
import {TWorkLogTime} from '../services/logtime.model';
import Animated, {
  SlideInDown,
  SlideInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CollapsableContainer from '@/components/collapsable-container';
import FastImage from 'react-native-fast-image';
type Props = {
  data: TWorkLogTime;
};
const LogTimeItem = ({data}: Props) => {
  const [visileImg, setVisibleImg] = useState<boolean>(false);
  const sharedValue = useSharedValue(0);
  useEffect(() => {
    if (visileImg) {
      sharedValue.value = withTiming(1);
    } else {
      sharedValue.value = withTiming(0);
    }
  }, [visileImg, sharedValue]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: interpolate(sharedValue.value, [0, 1], [0, 180]) + 'deg'},
      ],
      marginLeft: 10,
    };
  });

  return (
    <Pressable
      style={styles.containerLogTime}
      onPress={() => {
        setVisibleImg(!visileImg);
      }}>
      <View style={styles.cardContent}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              type="AntDesign"
              name={
                data.status === ELogTimeStatus.DONE_SUPERVISOR
                  ? 'checksquare'
                  : data.status === ELogTimeStatus.NOT_DONE
                  ? 'closesquare'
                  : 'minussquare'
              }
              size={24}
              color={
                data.status === ELogTimeStatus.DONE_SUPERVISOR
                  ? '#2b9348'
                  : data.status === ELogTimeStatus.NOT_DONE
                  ? '#9d0208'
                  : '#adb5bd'
              }
            />
            <Text style={[styles.txtLabel, {paddingLeft: 4}]}>
              {data.status === ELogTimeStatus.DONE_SUPERVISOR
                ? 'Đã hoàn thành tốt'
                : data.status === ELogTimeStatus.NOT_DONE
                ? 'Không đạt'
                : 'Chưa đánh giá'}
            </Text>
          </View>
          <Text style={styles.txtLabel}>
            Thời gian xử lý:{' '}
            <Text style={styles.txtValue}>
              {moment(data.dateStart).format('DD/MM/YYYY HH:mma')}
            </Text>
          </Text>
          <Text style={styles.txtLabel}>
            Người xử lý: <Text style={styles.txtValue}>{data.fullName}</Text>
          </Text>
        </View>
        <Animated.View style={animatedStyle}>
          <Icon type="Ionicons" name="chevron-down-outline" size={24} />
        </Animated.View>
      </View>
      <CollapsableContainer expanded={visileImg} style={{width: '100%'}}>
        <View>
          {data.imageUrls && data.imageUrls.length > 0 ? (
            <View style={styles.containerImg}>
              <FastImage
                source={{uri: data.imageUrls[0]}}
                style={styles.image}
              />
            </View>
          ) : (
            <View style={styles.emptyImg}>
              <Icon
                type="MaterialCommunityIcons"
                name="image-off"
                size={48}
                color={'#ced4da'}
              />
              <Text style={{...globalStyles.text16SemiBold, color: '#adb5bd'}}>
                Không có ảnh minh chứng
              </Text>
            </View>
          )}
        </View>
      </CollapsableContainer>
    </Pressable>
  );
};

export default LogTimeItem;

const styles = StyleSheet.create({
  containerLogTime: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  txtLabel: {
    ...globalStyles.text14SemiBold,
  },
  txtValue: {
    ...globalStyles.text14Regular,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  emptyImg: {
    backgroundColor: '#e9ecef',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  containerImg: {
    paddingTop: 8,
    // alignItems: 'center',
  },
});
