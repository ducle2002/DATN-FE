import {TImagePicker} from '@/utils/image-picker-handle';
import UtilsApi from '@/utils/utils.service';
import {useMutation} from 'react-query';

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
