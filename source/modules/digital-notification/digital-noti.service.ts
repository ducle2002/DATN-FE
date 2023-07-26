import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';

class Notification {
  endpoint = '/api/services/app/CityAdminNotification/';

  createOrUpdateRequest = async (params: any, config: any) => {
    const url = HOST_SERVER + this.endpoint + 'CreateOrUpdateNotification';
    return axiosClient.post(url, params, config);
  };
}

const NotificationApi = new Notification();

export default NotificationApi;
