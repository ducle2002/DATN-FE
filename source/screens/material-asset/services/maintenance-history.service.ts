import axiosClient from '@/utils/axios.client';
import {TPagingParams} from 'types/type';
import {TMaintenanceHistory} from './material-asset.model';

class MaintenanceHistory {
  endpoint = '/api/services/app/NhatKyVanHanh/';
  getAll = async (
    params: {taiSanId?: number; nguoiKiemTraId?: number} & TPagingParams,
  ): Promise<{history: TMaintenanceHistory[]; totalRecords: number}> => {
    const url = this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: params,
    });
    return {
      history: result.data,
      totalRecords: result.totalRecords,
    };
  };
  getById = async (id: number) => {
    const url = this.endpoint + 'GetById';
    return axiosClient.get(url, {params: {id: id}});
  };
  create = async (params: TMaintenanceHistory) => {
    const url = this.endpoint + 'Create';
    return axiosClient.post(url, params);
  };
}

const MaintenanceHistoryService = new MaintenanceHistory();
export default MaintenanceHistoryService;
