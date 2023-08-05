import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TFeedback,
  TFeedbackPage,
  TMessageFeedback,
  TMessageFeedbackPage,
} from './feedback.model';

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
  assignFeedback = async (data: {
    handleOrganizationUnitId: number;
    handleUserId: number;
    id: number;
  }): Promise<any> => {
    const url = HOST_SERVER + this.endpoint + 'AssignGovernmentReflect';
    const {
      data: {result},
    } = await axiosClient.post(url, {
      data: data,
    });
    return result;
  };

  getMessageFeedback = async (params: {
    CitizenReflectId: number;
    SkipCount?: number;
  }): Promise<TMessageFeedbackPage> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllCommnetByCitizenReflect';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: params,
    });
    return {
      listMessageFeedback: result?.items ?? [],
      total: result?.totalRecords ?? 0,
    };
  };

  sendMessFeedback = async (body: TMessageFeedback): Promise<any> => {
    const url =
      HOST_SERVER + this.endpoint + 'CreateOrUpdateCitizenReflectComment';
    const {
      data: {result},
    } = await axiosClient.post(url, body);
    return result;
  };
}

const FeedbackApi = new FeedbackService();

export default FeedbackApi;
