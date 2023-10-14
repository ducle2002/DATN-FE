import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TWork} from './work.model';
import {TCreateTurnWork, TTurnWork, TWorkLogTime} from './logtime.model';
import UtilsApi from '@/services/utils.service';

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

  getAllByTurn = async (
    params: TPagingParams & {
      WorkId?: number;
      WorkTurnId?: number;
      MaxResultCount?: number;
      SkipCount?: number;
    },
  ): Promise<TWorkLogTime[]> => {
    // if (!!params.WorkTurnId) {
    //   return [];
    // } else {
    const url = HOST_SERVER + this.endpoint + 'GetListWorkLogTime';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return result.data;
    // }
  };

  getById = async (params: {id?: number}): Promise<TWorkLogTime> => {
    const url = HOST_SERVER + this.endpoint + 'GetWorkLogTimeById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return result.data;
  };

  create = async (data: TWorkLogTime) => {
    const url = HOST_SERVER + this.endpoint + 'CreateWorkLogTime';
    let submitImgs: any[] = [];
    if (data.imageUrls?.length && data.imageUrls?.length > 0) {
      let arrayImgIsFile: any[] = [];
      data.imageUrls?.forEach(img => {
        if (typeof img !== 'string') {
          arrayImgIsFile.push(img);
        }
      });
      if (arrayImgIsFile.length > 0) {
        const resListImg = await UtilsApi.uploadImagesRequest(arrayImgIsFile);
        submitImgs = resListImg;
      }
    }
    const {
      data: {result},
    } = await axiosClient.post(url, {
      ...data,
      imageUrls: submitImgs,
    });

    return result;
  };
  update = async (data: TWorkLogTime) => {
    const url = HOST_SERVER + this.endpoint + 'UpdateWorkLogTime';
    return axiosClient.post(url, data);
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
  createTurn = async (data: TCreateTurnWork) => {
    const url = HOST_SERVER + '/api/services/app/WorkTurn/CreateWorkTurn';
    return axiosClient.post(url, data);
  };
  updateManyLogTime = async (data: {
    workTurnId: number;
    listLogTimeIdsDelete?: number[];
    listLogTimeCreate?: TWorkLogTime[];
    listLogTimeUpdate?: TWorkLogTime[];
  }) => {
    const url = HOST_SERVER + this.endpoint + 'UpdateManyWorkLogTime';
    return axiosClient.put(url, data);
  };
}

const LogTimeApi = new LogTimeService();

export default LogTimeApi;
