import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';

export type TAssetGroup = {
  parentText: string;
  maHeThongText: string;
  code: string;
  title: string;
  description: string;
  tenantId: number;
  parentId: null | number;
  maHeThongId: number;
  creationTime: string;
  creatorUserId: number;
  id: number;
};

class AssetGroup {
  endpoint = '/api/services/app/NhomTaiSan/';
  getAll = async (
    params: TPagingParams & {MaHeThongId?: number},
  ): Promise<{
    assetGroups: TAssetGroup[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      assetGroups: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const AssetGroupService = new AssetGroup();

export default AssetGroupService;
