import axiosClient from '@/utils/axios.client';
import {ESortBy, TMeterMonthly} from '../models/model';
import {TPagingParams} from 'types/type';

class MeterMonthly {
  endpoint = '/api/services/app/AdminMeterMonthly/';

  getAll = async (
    params: TPagingParams & {meterId?: number; meterTypeId?: number},
  ): Promise<{
    records: TMeterMonthly[];
    totalRecords: number;
  }> => {
    const url = this.endpoint + 'GetAllMeterMonthly';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {sortBy: ESortBy.DESC, ...params}});
    return {
      records: result.data,
      totalRecords: result.totalRecords,
    };
  };

  create = async (params: any) => {
    const url = this.endpoint + 'CreateMeterMonthly';
    return axiosClient.post(url, params);
  };
}

const MeterMonthlyService = new MeterMonthly();
export default MeterMonthlyService;
