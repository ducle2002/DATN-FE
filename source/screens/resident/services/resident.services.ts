import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {TPagingParams} from 'types/type';
import {EResidentFormId, TResident} from './resident.model';

class ResidentService extends BaseService {
  endpoint = '/api/services/app/Citizen/';

  getResident = async (
    params: TPagingParams & {formId: EResidentFormId},
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
}

export const ResidentApi = new ResidentService();
