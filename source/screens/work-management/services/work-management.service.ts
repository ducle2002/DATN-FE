import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TWork} from './work.model';

class WorkManagementService extends BaseService {
  endpoint = '/api/services/app/Work/';
  getAll = async (
    params: TPagingParams & {
      status: number;
      formId: number;
      workTypeId: number;
    },
  ): Promise<{
    works: Array<TWork>;
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetListWork';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      works: result.data,
      totalRecords: result.totalRecords,
    };
  };

  getById = async (params: {id: number}): Promise<TWork> => {
    const url = HOST_SERVER + this.endpoint + 'GetWorkById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result.data;
  };

  create = async (params: TWork) => {
    const url = HOST_SERVER + this.endpoint + 'CreateWork';
    return axiosClient.post(url, {params: params});
  };
}

const WorkManagementApi = new WorkManagementService();

export default WorkManagementApi;
