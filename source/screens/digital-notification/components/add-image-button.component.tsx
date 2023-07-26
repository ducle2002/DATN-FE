import {ImageBackground, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from '@/components/icon.component';
import ImageCropPicker from 'react-native-image-crop-picker';
import {handlePicker} from '@/utils/image-picker-handle';

type Props = React.ComponentProps<typeof ImageBackground> & {
  pickerHandle: Function;
};

const AddImageButton = ({pickerHandle, ...props}: Props) => {
  return (
    <Pressable
      onPress={() =>
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          maxFiles: 1,
          compressImageQuality: 0.6,
        }).then(images => pickerHandle(handlePicker([images])[0]))
      }>
      <ImageBackground style={styles.container} {...props}>
        <Icon type="Ionicons" name="image" size={40} color={'white'} />
      </ImageBackground>
    </Pressable>
  );
};

export default AddImageButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: '#a0a0a0',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
