import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TWorkType} from './work.model';

class WorkTypeService {
  endpoint = '/api/services/app/WorkType/';

  getAll = async (
    params: TPagingParams,
  ): Promise<{
    workType: TWorkType[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetListWorkType';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {workType: result.data, totalRecords: result.totalRecords};
  };

  getAllNotPaging = async (): Promise<{
    workType: TWorkType[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetListWorkTypeNotPaging';
    const {
      data: {result},
    } = await axiosClient.get(url);
    return {workType: result.data, totalRecords: result.totalRecords};
  };
}

const WorkTypeApi = new WorkTypeService();
export default WorkTypeApi;
