import axiosClient from '@/utils/axios.client';
import {compressImageHandle} from '@/utils/compress-handle';
import {TImagePicker} from '@/utils/image-picker-handle';
import {HOST_SERVER} from '@env';
import {IBuilding, IPaginatedItems, IUrban, TGetAllQuery} from './utils.model';

export class UtilsService {
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

  public async getAllUrban(
    query?: TGetAllQuery,
  ): Promise<IPaginatedItems<IUrban>> {
    const url = HOST_SERVER + '/api/services/app/Urban/GetAllUrbanByUser';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: query});

    return result;
  }

  public async getAllBuilding(
    query?: TGetAllQuery | undefined,
  ): Promise<IPaginatedItems<IBuilding>> {
    const url = HOST_SERVER + '/api/services/app/Building/GetAllBuildingByUser';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: query});

    return result;
  }
}

const UtilsApi = new UtilsService();
export default UtilsApi;
