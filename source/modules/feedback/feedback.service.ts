import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TFeedback,
  TFeedbackPage,
  TMessageFeedback,
  TMessageFeedbackPage,
  TOrganizationUnitCitizenReflect,
  TOrganizationUnitUser,
} from './feedback.model';

class FeedbackService {
  endpoint = '/api/services/app/AdminCitizenReflect/';
  endpointUser = '/api/services/app/UserCitizenReflect/';

  getFeedback = async (params: {
    FormId: number;
    skipCount: number;
    KeyWord?: string;
  }): Promise<TFeedbackPage> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllCitizenReflect';
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
  GetAllOrganizationUnitCitizenReflect = async (params: {
    orgId?: number;
  }): Promise<TOrganizationUnitCitizenReflect[]> => {
    const url =
      HOST_SERVER + this.endpointUser + 'GetAllOrganizationUnitCitizenReflect';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: params,
    });
    return result.data;
  };
  GetOrganizationUnitUsers = async (params: {
    id: number | null;
  }): Promise<TOrganizationUnitUser[]> => {
    const url =
      HOST_SERVER +
      '/api/services/app/OrganizationUnit/GetOrganizationUnitUsers';
    if (params.id) {
      const {
        data: {result},
      } = await axiosClient.get(url, {
        params: params,
      });
      return result.items;
    } else {
      return [];
    }
  };

  assignFeedback = async (data: {
    handleOrganizationUnitId: number;
    handleUserId: number;
    id: number;
  }): Promise<any> => {
    const url = HOST_SERVER + this.endpoint + 'AssignGovernmentReflect';
    const {
      data: {result},
    } = await axiosClient.post(url, data);
    return result;
  };

  deleteFeedback = async (data: {id: number}): Promise<any> => {
    const url = HOST_SERVER + this.endpoint + 'DeleteCitizenReflect';
    const {
      data: {result},
    } = await axiosClient.delete(url, {
      params: data,
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
  createFeedback = async (data: {
    data?: string;
    fileUrl?: string;
    urbanId: number;
    buildingId?: number;
    addressFeeder?: string;
    fullName?: string;
    name?: string;
  }) => {
    const url = HOST_SERVER + this.endpoint + 'CreateReflect';
    const {
      data: {result},
    } = await axiosClient.post(url, data);
    return result;
  };
  updateFeedback = async (data: {
    state: number;
    note?: string;
    fileOfNote?: string;
    id: number;
  }) => {
    const url = HOST_SERVER + this.endpoint + 'UpdateStateCitizenReflect';
    const {
      data: {result},
    } = await axiosClient.put(url, data);
    return result;
  };
}

const FeedbackApi = new FeedbackService();

export default FeedbackApi;
