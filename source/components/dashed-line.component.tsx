import {ColorValue, Dimensions, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {G, Rect, Svg} from 'react-native-svg';
const {width: w} = Dimensions.get('window');
type Props = {
  spacing?: number;
  width?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

const DashedLine = ({
  spacing = 20,
  width = 10,
  color = '#ababab',
  style,
}: Props) => {
  const dashes = new Array(Math.floor(w / spacing)).fill(null);
  return (
    <Svg height="1" width="100%" style={style}>
      <G>
        {dashes.map((_, index) => (
          <Rect
            key={index}
            x="0"
            y="0"
            width={`${width}`}
            height="1"
            fill={color}
            translateX={spacing * index}
          />
        ))}
      </G>
    </Svg>
  );
};

export default DashedLine;
