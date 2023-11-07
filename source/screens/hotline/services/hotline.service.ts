import {HOST_SERVER} from '@env';
import {THotline} from './hotline.model';
import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';

class Hotline {
  endpoint = '/api/services/app/Hotline/';

  getAll = async (
    params: TPagingParams & {
      keyword?: string;
    },
  ): Promise<{
    hotlines: THotline[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllHotline';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      hotlines: result.data,
      totalRecords: result.totalRecords,
    };
  };

  createOrUpdate = async (params: THotline) => {
    const url = HOST_SERVER + this.endpoint + 'CreateOrUpdateHotline';
    return axiosClient.post(url, params);
  };

  delete = async (params: {id: number}) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteHotline';
    return axiosClient.delete(url, {params: params});
  };
}

const HotlineService = new Hotline();
export default HotlineService;
