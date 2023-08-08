import React from 'react';
import FastImage from 'react-native-fast-image';

import {useMemo} from 'react';

export type TThumbSize =
  | '200x200'
  | '64x64'
  | '100x100'
  | '128x128'
  | '256x256'
  | '500x500'
  | '512x512'
  | '480x320'
  | '320x480'
  | '1024x768'
  | '768x1024'
  | '1280x720'
  | '720x1280'
  | '1920x1080'
  | '1080x1920';
export const useThumbnail = (src: string, size: TThumbSize = '200x200') => {
  const thumbnail = useMemo(() => {
    if (src) {
      return src.includes('imaxtek.s3')
        ? `https://cdn.imaxhitech.com:10030/thumb/${size}` +
            src.split('amazonaws.com')[1]
        : src;
    }
  }, [size, src]);

  return thumbnail;
};

type Props = React.ComponentProps<typeof FastImage> & {size: TThumbSize};

const ThumbnailImage = ({source, size = '200x200', ...props}: Props) => {
  const thumb = useThumbnail(
    typeof source !== 'number' && source !== undefined && source.uri
      ? source.uri
      : '',
    size,
  );

  return (
    <FastImage
      source={
        typeof source === 'number'
          ? source
          : source !== undefined
          ? {...source, uri: thumb}
          : undefined
      }
      {...props}
    />
  );
};

export default ThumbnailImage;
