import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';
import {TMeter} from '../models/model';

class Meter {
  endpoint = '/api/services/app/AdminMeter/';

  getAll = async (
    params: TPagingParams,
  ): Promise<{
    meters: TMeter[];
    totalRecords: number;
  }> => {
    const url = this.endpoint + 'GetAllMeter';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      meters: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const MeterService = new Meter();
export default MeterService;
