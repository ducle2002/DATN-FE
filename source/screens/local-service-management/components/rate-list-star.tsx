import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from '@/components/icon.component';
type Props = {
  pointStar: number;
  maxStar?: number;
  size: number;
};
const RateListStar = ({pointStar, maxStar = 5, size}: Props) => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {[...Array(maxStar).keys()].map((item, index) => {
          return pointStar > index && pointStar < index + 1 ? (
            <Icon
              key={index}
              name="star-half"
              type="Ionicons"
              color="#FFD066"
              size={size}
            />
          ) : pointStar >= index + 1 ? (
            <Icon
              key={index}
              name="star"
              type="Ionicons"
              color="#FFD066"
              size={size}
            />
          ) : (
            <Icon
              key={index}
              name="star-outline"
              type="Ionicons"
              color="#FFD066"
              size={size}
            />
          );
        })}
      </View>
    </View>
  );
};

export default RateListStar;

const styles = StyleSheet.create({});
