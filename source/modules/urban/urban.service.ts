import {HOST_SERVER} from '@env';
import {TUrban} from './urban.model';
import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';

class Urban {
  endpoint = '/api/services/app/Urban/';
  getAll = async (
    params: TPagingParams,
  ): Promise<{
    urbans: TUrban[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllUrbanByUser';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      urbans: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const UrbanService = new Urban();
export default UrbanService;
