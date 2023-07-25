import {HOST_SERVER} from '@env';
import axiosClient from './axios.client';
import {TImagePicker} from './image-picker-handle';

class Utils {
  uploadImagesRequest = async (files?: Array<TImagePicker> | undefined) => {
    let submitData = new FormData();
    files?.forEach(file => submitData.append('files', file));
    const url = HOST_SERVER + '/UploadBatchImage';
    const {data} = await axiosClient.post(url, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.result.data;
  };
}

const UtilsApi = new Utils();
export default UtilsApi;
