import {HOST_SERVER} from '@env';
import axiosClient from './axios.client';
import {TImagePicker} from './image-picker-handle';
import {compressImageHandle} from './compress-handle';

class Utils {
  uploadImagesRequest = async (files: Array<TImagePicker>) => {
    let submitData = new FormData();
    const f = await Promise.all(
      files.map(async i => {
        if (i.size < 1048576) {
          return i;
        } else {
          return compressImageHandle(i).then(result => ({
            ...result,
            type: 'image/jpeg',
          }));
        }
      }),
    );

    f?.forEach(file => submitData.append('files', file));
    const url = HOST_SERVER + '/UploadBatchImage';
    const {data} = await axiosClient.post(url, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.result.data;
  };
  uploadFilesRequest = async (file?: any) => {
    const formData = new FormData();
    formData.append('file', file);
    const url = HOST_SERVER + '/UploadOneFile';
    const response = await axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.result.data;
  };
}

const UtilsApi = new Utils();
export default UtilsApi;
