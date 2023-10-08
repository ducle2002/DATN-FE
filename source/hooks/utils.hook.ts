import {TImagePicker} from '@/utils/image-picker-handle';
import {useMemo} from 'react';
import {useMutation} from 'react-query';
import HTMLParser from 'node-html-parser';
import UtilsApi from '@/services/utils.service';

export const useUploadImages = (
  onError: Function = () => {},
  onSuccess: Function = () => {},
) => {
  const {mutate: uploadImagesRequest} = useMutation({
    mutationFn: (params: Array<TImagePicker>) =>
      UtilsApi.uploadImagesRequest(params),
    onError: error => {
      onError(error);
    },
    onSuccess: result => {
      onSuccess(result);
    },
  });

  return {uploadImagesRequest};
};

export const useTextContentOfHTML = (data: string) => {
  const root = useMemo(() => HTMLParser.parse(data), [data]);
  return root?.textContent?.trim();
};
