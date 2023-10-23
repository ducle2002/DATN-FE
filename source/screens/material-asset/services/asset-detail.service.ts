import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TAssetDetail} from './material-asset.model';
import {TOptionItem} from '@/components/dropdown-menu.component';

class AssetDetail {
  endpoint = '/api/services/app/TaiSanChiTiet/';

  create = async (params: TAssetDetail) => {
    const url = HOST_SERVER + this.endpoint + 'Create';
    return axiosClient.post(url, params);
  };

  update = async (params: TAssetDetail) => {
    const url = HOST_SERVER + this.endpoint + 'Create';
    return axiosClient.put(url, params);
  };

  delete = async (id: number) => {
    const url = HOST_SERVER + this.endpoint + 'Delete';
    return axiosClient.delete(url, {params: {id: id}});
  };

  getAll = async (
    params: TPagingParams,
  ): Promise<{
    assets: TAssetDetail[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      assets: result.data,
      totalRecords: result.totalRecords,
    };
  };

  getById = async (id: number): Promise<TAssetDetail> => {
    const url = HOST_SERVER + this.endpoint + 'getById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {id: id}});
    return result.data;
  };

  getEnums = async (params: {
    type: 'TrangThaiTaiSanChiTietEnum' | 'HinhThucTaiSanChiTietEnum';
  }): Promise<{
    enums: TOptionItem[];
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetEnums';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      enums: result.data.map((i: any) => ({
        id: i.value,
        label: i.label,
      })),
    };
  };
}

const AssetDetailService = new AssetDetail();
export default AssetDetailService;
