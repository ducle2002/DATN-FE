import {HOST_SERVER} from '@env';
import {THotline} from './hotline.model';
import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';

class Hotline {
  endpoint = '/api/services/app/Hotline/';

  getAll = async (
    params: TPagingParams,
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
}
