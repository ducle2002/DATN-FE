import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TWork} from './work.model';
import {TCreateTurnWork, TWorkLogTime} from './logtime.model';

class LogTimeService extends BaseService {
  endpoint = '/api/services/app/WorkLogTime/';
  getAll = async (
    params: TPagingParams & {
      WorkId?: number;
      WorkTurnId?: number;
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
  getAllTurnWorkNotPaging = async (
    params: TPagingParams & {
      WorkId?: number;
    },
  ): Promise<Array<any>> => {
    const url =
      HOST_SERVER + '/api/services/app/WorkTurn/GetListWorkTurnNotPaging';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return result.data;
  };
  createTurn = async (params: TCreateTurnWork) => {
    const url = HOST_SERVER + '/api/services/app/WorkTurn/CreateWorkTurn';
    return axiosClient.post(url, {params});
  };
}

const LogTimeApi = new LogTimeService();

export default LogTimeApi;
