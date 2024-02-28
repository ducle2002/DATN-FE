import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TVoteGetParams} from './vote.model';

class Vote {
  private endpoint = '/api/services/app/CityVote/';

  getRequest = async (params: TVoteGetParams) => {
    const url = HOST_SERVER + this.endpoint + 'GetAllCityVote';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: {...params, keyword: params.keyword?.toLocaleLowerCase()},
    });

    return {
      totalCount: result.totalRecords,
      data: result.data,
    };
  };

  getByIdRequest = async (id: number) => {
    const url = HOST_SERVER + this.endpoint + 'GetVoteById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {id: id}});
    return result.data;
  };

  createOrUpdateRequest = async (params: any) => {
    const url = HOST_SERVER + this.endpoint + 'CreateOrUpdateCityVote';
    return axiosClient.post(url, params);
  };

  deleteRequest = async (params: {id: number}) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteCityVote';
    return axiosClient.delete(url, {params});
  };

  deleteMultipleRequest = async (params: Array<number>) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteMultipleCityVote';
    return axiosClient.delete(url, {data: params});
  };
}

const VoteApi = new Vote();
export default VoteApi;
