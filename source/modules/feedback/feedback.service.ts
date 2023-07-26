import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TFeedback, TFeedbackPage} from './feedback.model';

class FeedbackService {
  endpoint = '/api/services/app/AdminGovernmentReflect/';

  getFeedback = async (params: {
    FormId: number;
    skipCount: number;
    KeyWord?: string;
  }): Promise<TFeedbackPage> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllGovernmentReflect';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: params,
    });
    return {
      listFeedback: result.data,
      total: result.totalRecords,
    };
  };
}

const FeedbackApi = new FeedbackService();

export default FeedbackApi;
