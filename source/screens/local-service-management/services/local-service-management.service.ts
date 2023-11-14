import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TCreateServiceOrder,
  TLocalServiceDetail,
  TLocalServiceManagement,
  TLocalServiceManagementCategory,
  TLocalServiceManagementOrder,
  TPagingParams,
} from './local-service-management.model';
import {BaseService} from '@/utils/base.service';
const callAxios = async (url: any, params: any) => {
  return axiosClient.get(url, {params: params});
};
class LocalServiceManagement extends BaseService {
  getAllCategory = async (
    params: TPagingParams,
  ): Promise<{data: TLocalServiceManagement[]; totalRecords: number}> => {
    const url = HOST_SERVER + '/api/services/app/DigitalServiceCategory/GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      data: result.data,
      totalRecords: result.totalRecords,
    };
  };
  getAllListService = async (
    params: TPagingParams & {
      UrbanId?: number;
      Category?: number;
    },
  ): Promise<{
    data: TLocalServiceManagement[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + '/api/services/app/DigitalServices/GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      data: result.data,
      totalRecords: result.totalRecords,
    };
  };
  getAllListServiceDetail = async (
    params: TPagingParams & {
      ServicesId?: number;
    },
  ): Promise<{
    data: TLocalServiceDetail[];
    totalRecords: number;
  }> => {
    const url =
      HOST_SERVER + '/api/services/app/DigitalServiceDetails/GetAllDetails';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      data: result.data,
      totalRecords: result.totalRecords,
    };
  };
  getAllListServiceOrder = async (
    params: TPagingParams & {
      ServiceId?: number;
      Status?: number;
      StatusTab: number;
    },
  ): Promise<{
    data: TLocalServiceManagementOrder[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + '/api/services/app/DigitalServiceOrder/GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      data: result.data,
      totalRecords: result.totalRecords,
    };
  };
  getServiceOrderById = async (params: {
    id: number;
  }): Promise<TLocalServiceManagementOrder> => {
    const url = HOST_SERVER + '/api/services/app/DigitalServiceOrder/GetById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return result.data;
  };
  createServiceOrder = async (data: TCreateServiceOrder) => {
    const url = HOST_SERVER + '/api/services/app/DigitalServiceOrder/Create';
    const res = await axiosClient.post(url, data);
    return res;
  };

  updateState = async (data: {id: number; typeAction: number}) => {
    const url =
      HOST_SERVER + '/api/services/app/DigitalServiceOrder/UpdateState';
    const res = await axiosClient.put(url, data);
    return res;
  };
  updateRate = async (data: {
    id: number;
    ratingScore: number;
    comments: string;
  }) => {
    const url =
      HOST_SERVER + '/api/services/app/DigitalServiceOrder/UpdateRate';
    const res = await axiosClient.put(url, data);
    return res;
  };
  updateFeedback = async (data: {
    id: number;
    responseContent: string;
    totalAmount: number;
  }) => {
    const url =
      HOST_SERVER + '/api/services/app/DigitalServiceOrder/UpdateFeedback';
    const res = await axiosClient.put(url, data);
    return res;
  };
  deleteOrder = async (params: {id: number}) => {
    const url = HOST_SERVER + '/api/services/app/DigitalServiceOrder/Delete';
    const res = await axiosClient.delete(url, {params});
    return res;
  };
}

const LocalServiceManagementApi = new LocalServiceManagement();
export default LocalServiceManagementApi;
