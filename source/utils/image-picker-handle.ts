import {Image} from 'react-native-image-crop-picker';
export type TImagePicker = {
  name: string;
  width: number;
  height: number;
  type: string;
  size: number;
  uri: string;
  source?: string;
};

export const handlePicker = (images: Array<Image>): Array<TImagePicker> => {
  return images.map<TImagePicker>(image => ({
    name:
      image.filename ?? image.path?.substring(image.path.lastIndexOf('/') + 1),
    width: image.width,
    height: image.height,
    type: image.mime,
    size: image.size,
    uri: image.path,
    source: image.sourceURL,
  }));
};
