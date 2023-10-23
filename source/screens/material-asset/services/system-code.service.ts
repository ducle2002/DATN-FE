import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';

export type TSystemCode = {
  code: string;
  title: string;
  description: string;
  tenantId: number;
  creationTime: string;
  creatorUserId: number;
  id: number;
};

class SystemCode {
  endpoint = '/api/services/app/MaHeThong/';
  getAll = async (
    params: TPagingParams,
  ): Promise<{
    systemCodes: TSystemCode[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {systemCodes: result.data, totalRecords: result.totalRecords};
  };
}

const SystemCodeService = new SystemCode();
export default SystemCodeService;
