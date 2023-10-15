import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TWorkComment} from './work.model';

class WorkComment {
  endpoint = HOST_SERVER + '/api/services/app/WorkComment/';
  create = async (params: {
    workId: number;
    content?: string;
    imageUrls?: string[];
  }) => {
    const url = this.endpoint + 'CreateWorkComment';
    return axiosClient.post(url, params);
  };
  getAll = async (
    params: TPagingParams & {workId: number},
  ): Promise<{
    comments: TWorkComment[];
    totalRecords: number;
  }> => {
    const url = this.endpoint + 'GetListWorkComment';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {...params, sortBy: 1}});
    return {
      comments: result.data,
      totalRecords: result.totalRecords,
    };
  };
  getAllWithoutPaging = async (params: {
    workId: number;
  }): Promise<{
    comments: TWorkComment[];
    totalRecords: number;
  }> => {
    const url = this.endpoint + 'GetListWorkCommentNotPaging';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      comments: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const WorkCommentApi = new WorkComment();
export default WorkCommentApi;
