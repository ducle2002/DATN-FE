import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {TPagingParams} from 'types/type';
import {TResident} from './resident.model';
import {TFilter} from '../hooks/ResidentFilterContext';

class ResidentService extends BaseService {
  endpoint = '/api/services/app/Citizen/';

  getResident = async (
    params: TPagingParams & TFilter,
  ): Promise<{
    resident: Array<TResident>;
    totalRecords: number;
  }> => {
    const url = this.HOST + this.endpoint + 'GetAllCitizen';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      resident: result.data,
      totalRecords: result.totalRecords,
    };
  };

  updateState = async (params: TResident) => {
    const url = this.HOST + this.endpoint + 'UpdateStateCitizen';
    return axiosClient.put(url, params);
  };
  getById = async (params: {id: number}): Promise<TResident> => {
    const url = this.endpoint + 'GetCitizenById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result.data;
  };
}

export const ResidentApi = new ResidentService();
