import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TInventory, TMaterialAsset} from './material-asset.model';

class MaterialAssetAPI {
  private endpoint = '/api/services/app/MaterialManagement/';

  getAll = async (
    params: TPagingParams,
  ): Promise<{
    materials: Array<TMaterialAsset>;
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {...params}});

    return {
      materials: result.data,
      totalRecords: result.totalRecords,
    };
  };

  getType = async (params: {
    type: number;
  }): Promise<{
    typeFilter: Array<TMaterialAsset>;
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      typeFilter: result.data,
      totalRecords: result.totalRecords,
    };
  };

  create = async (params: TMaterialAsset) => {
    const url = HOST_SERVER + this.endpoint + 'Create';
    return axiosClient.post(url, params);
  };

  update = async (params: TMaterialAsset) => {
    const url = HOST_SERVER + this.endpoint + 'Update';
    return axiosClient.put(url, params);
  };

  delete = async (id: number) => {
    const url = HOST_SERVER + this.endpoint + 'Delete';
    return axiosClient.delete(url, {params: {id: id}});
  };

  getAllInventory = async (
    params?: TPagingParams,
  ): Promise<{inventories: Array<TInventory>}> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllInventory';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {inventories: result.data};
  };
  getAllMaterialInventory = async (
    params: TPagingParams & {locationId: number},
  ): Promise<{materials: Array<TMaterialAsset>; totalRecords: number}> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllMaterialInventory';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      materials: result.data,
      totalRecords: result.totalRecords,
    };
  };

  createInventory = async (params: {
    amount: number;
    price: number;
    totalPrice: number;
    status: string | undefined;
    inventoryId: number;
    materialId: number;
  }) => {
    const url = HOST_SERVER + this.endpoint + 'CreateInventory';
    return axiosClient.post(url, params);
  };
}

const MaterialAssetApi = new MaterialAssetAPI();

export default MaterialAssetApi;
