import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';
import {TMeterType} from '../models/model';

class MeterType {
  endpoint = '/api/services/app/AdminMeterType/';

  getAll = async (
    params: TPagingParams,
  ): Promise<{
    meterTypes: TMeterType[];
    totalRecords: number;
  }> => {
    const url = this.endpoint + 'GetAllMeterType';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      meterTypes: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const MeterTypeService = new MeterType();
export default MeterTypeService;
