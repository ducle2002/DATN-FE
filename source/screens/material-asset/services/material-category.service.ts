import {HOST_SERVER} from '@env';
import {TAssetFilter} from './material-asset.model';
import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';

class MaterialCategory {
  endpoint = '/api/services/app/CategoryMaterialManagement/';

  getAll = async (
    params: {
      type: number;
    } & TPagingParams,
  ): Promise<{
    dataFilter: Array<TAssetFilter>;
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      dataFilter: result.data,
      totalRecords: result.totalRecords,
    };
  };

  create = async (params: {
    code: string;
    name: string;
    description?: string;
  }) => {
    const url = HOST_SERVER + this.endpoint + 'Create';
    return axiosClient.post(url, params);
  };
}

const MaterialCategoryApi = new MaterialCategory();

export default MaterialCategoryApi;
