import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import {IconProps} from 'react-native-vector-icons/Icon';

export type TypeIcon =
  | 'Ionicons'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'FontAwesome6'
  | 'FontAwesome6Pro'
  | 'Fontisto'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

interface Props extends IconProps {
  type: TypeIcon;
  name: string;
}

const Icon = ({type, ...props}: Props) => {
  switch (type) {
    case 'Ionicons':
      return <Ionicons color={'black'} {...props} />;
    case 'AntDesign':
      return <AntDesign color={'black'} {...props} />;
    case 'Entypo':
      return <Entypo color={'black'} {...props} />;
    case 'EvilIcons':
      return <EvilIcons color={'black'} {...props} />;
    case 'Feather':
      return <Feather color={'black'} {...props} />;
    case 'FontAwesome':
      return <FontAwesome color={'black'} {...props} />;
    case 'FontAwesome5':
      return <FontAwesome5 color={'black'} {...props} />;
    case 'FontAwesome5Pro':
      return <FontAwesome5Pro color={'black'} {...props} />;
    case 'FontAwesome6':
      return <FontAwesome6 color={'black'} {...props} />;
    case 'FontAwesome6Pro':
      return <FontAwesome6Pro color={'black'} {...props} />;
    case 'Fontisto':
      return <Fontisto color={'black'} {...props} />;
    case 'Foundation':
      return <Foundation color={'black'} {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons color={'black'} {...props} />;
    case 'MaterialIcons':
      return <MaterialIcons color={'black'} {...props} />;
    case 'Octicons':
      return <Octicons color={'black'} {...props} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons color={'black'} {...props} />;
    case 'Zocial':
      return <Zocial color={'black'} {...props} />;
    default:
      return undefined;
  }
};

export default Icon;
