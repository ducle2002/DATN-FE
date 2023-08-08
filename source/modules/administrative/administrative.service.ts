import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TAdminidtrativeConfig,
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
}

const AdministrativeApi = new AdministrativeService();

export default AdministrativeApi;
