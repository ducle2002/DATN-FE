import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TWork} from './work.model';
import {TWorkLogTime} from './logtime.model';

class LogTimeService extends BaseService {
  endpoint = '/api/services/app/WorkLogTime/';
  getAll = async (
    params: TPagingParams & {
      MaxResultCount?: number;
      SkipCount?: number;
    },
  ): Promise<{
    logTimes: Array<TWorkLogTime>;
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetListWorkLogTime';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      logTimes: result.data,
      totalRecords: result.totalRecords,
    };
  };

  getById = async (params: {id?: number}): Promise<TWorkLogTime> => {
    const url = HOST_SERVER + this.endpoint + 'GetWorkLogTimeById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result.data;
  };

  create = async (params: TWorkLogTime) => {
    const url = HOST_SERVER + this.endpoint + 'CreateWorkLogTime';
    return axiosClient.post(url, {params: params});
  };
}

const LogTimeApi = new LogTimeService();

export default LogTimeApi;
