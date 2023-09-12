import {HOST_SERVER} from '@env';
import {TAssetFilter} from './material-asset.model';
import axiosClient from '@/utils/axios.client';

class MaterialCategory {
  endpoint = '/api/services/app/CategoryMaterialManagement/';

  getAll = async (params: {
    type: number;
  }): Promise<{
    dataFilter: Array<TAssetFilter>;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      dataFilter: result.data,
    };
  };
}

const MaterialCategoryApi = new MaterialCategory();

export default MaterialCategoryApi;
