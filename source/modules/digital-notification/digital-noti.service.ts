import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TDeleteParams, TDigitalNotiParams} from './digital-noti.model';

class Notification {
  endpoint = '/api/services/app/CityAdminNotification/';

  createOrUpdateRequest = async (params: any, config: any) => {
    const url = HOST_SERVER + this.endpoint + 'CreateOrUpdateNotification';
    return axiosClient.post(url, params, config);
  };

  getRequest = async (params: TDigitalNotiParams) => {
    const url = HOST_SERVER + this.endpoint + 'GetAllNotificationUserTenant';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      totalCount: result.totalRecords,
      data: result.data,
    };
  };

  deleteRequest = async (params: TDeleteParams) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteNotification';
    return axiosClient.delete(url, {params: params});
  };
}

const DigitalNotiApi = new Notification();

export default DigitalNotiApi;
