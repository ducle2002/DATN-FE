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
    } = await axiosClient.get(url, {
      params: {sortBy: ESortBy.DESC, ...params},
    });
    return {
      records: result.data,
      totalRecords: result.totalRecords,
    };
  };

  getById = async (params: {id: number}): Promise<TMeterMonthly> => {
    const url = this.endpoint + 'GetMeterMonthlyById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result.data;
  };

  update = async (params: any) => {
    const url = this.endpoint + 'UpdateMeterMonthly';
    return axiosClient.put(url, params);
  };

  create = async (params: any) => {
    const url = this.endpoint + 'CreateMeterMonthly';
    return axiosClient.post(url, params);
  };

  delete = async (params: {id: number}) => {
    const url = this.endpoint + 'DeleteMeterMonthly';
    return axiosClient.delete(url, {params: params});
  };
}

const MeterMonthlyService = new MeterMonthly();
export default MeterMonthlyService;
