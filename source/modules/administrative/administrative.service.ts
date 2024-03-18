import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TAdminidtrativeConfig,
  TAdministrativeOrder,
  TAdministrativeOrderPage,
} from './administrative.model';

class AdministrativeService {
  endpoint = '/api/services/app/CommonAdministrative/';
  endpointCommon = '/api/services/app/Administrative/';

  GetAdministratvieGridView = async (params: {
    ADTypeId: number;
    FormId: number;
    skipCount: number;
    KeySearch?: string;
  }): Promise<TAdministrativeOrderPage> => {
    const url = HOST_SERVER + this.endpoint + 'GetAdministratvieGridView';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: params,
    });
    return {
      listData: result.data,
      total: result.totalRecords,
    };
  };
  GetInitViewTypeAdministrative = async (): Promise<
    TAdminidtrativeConfig[]
  > => {
    const url = HOST_SERVER + this.endpoint + 'GetInitViewTypeAdministrative';
    const {
      data: {result},
    } = await axiosClient.get(url);
    return result.data;
  };
  UpdateStateAdministrative = async (data: {
    id: number;
    state: number;
  }): Promise<any> => {
    const url =
      HOST_SERVER + this.endpointCommon + 'HandleStateUserAdministrative';
    const {
      data: {result},
    } = await axiosClient.post(url, data);

    return result;
  };
  GetAdministrativeTypeById = async (params: {
    id: number;
  }): Promise<TAdminidtrativeConfig> => {
    const url = HOST_SERVER + this.endpoint + 'GetTypeAdministrativeById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params});
    return result;
  };
  GetAdministrativeById = async (params: {
    id: number;
  }): Promise<TAdministrativeOrder> => {
    const url = HOST_SERVER + this.endpoint + 'GetAdministrativeById';
    const {
      data: {
        result: {data},
      },
    } = await axiosClient.get(url, {params});

    return data;
  };
  getAdministrativeConfig = async (params: {typeId: number}) => {
    const url =
      HOST_SERVER + this.endpoint + 'GetAdministrativePropertyGridView';
    const {
      data: {
        result: {data},
      },
    } = await axiosClient.get(url, {params});
    return data;
  };
}

const AdministrativeApi = new AdministrativeService();

export default AdministrativeApi;
