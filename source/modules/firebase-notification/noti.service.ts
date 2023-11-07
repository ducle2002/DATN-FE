import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';

class Notification {
  endpoint = '/api/services/app/PushNotification/';
  register = async (params: {token: string; tenantId: number}) => {
    const url = HOST_SERVER + this.endpoint + 'RegisterToTenant';
    return axiosClient.post(url, params);
  };
  logout = async (params: {token: string}) => {
    const url = HOST_SERVER + this.endpoint + 'LogoutFcm';
    return axiosClient.post(url, params);
  };
}

const NotificationService = new Notification();
export default NotificationService;
