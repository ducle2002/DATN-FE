import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TVoteGetParams} from './vote.model';

class Vote {
  endpoint = '/api/services/app/CityVote/';
  getRequest = async (params: TVoteGetParams) => {
    const url = HOST_SERVER + this.endpoint + 'GetAllCityVote';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      totalCount: result.totalRecords,
      data: result.data,
    };
  };
  createOrUpdateRequest = async (params: any) => {
    const url = HOST_SERVER + this.endpoint + 'CreateOrUpdateCityVote';
    return axiosClient.post(url, params);
  };
}

const VoteApi = new Vote();
export default VoteApi;
