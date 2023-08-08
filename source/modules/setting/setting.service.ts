import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TChangePasswordForm, TChangePasswordPayload} from './setting.model';

class SettingService {
  endpoint = '/api/services/app/User/';
  async changePassword(params: TChangePasswordForm): Promise<any> {
    const data: TChangePasswordPayload = {
      currentPassword: params.currentPassword,
      newPassword: params.newPassword,
    };

    try {
      const url = HOST_SERVER + this.endpoint + 'ChangePassword';
      const {
        data: {result},
      } = await axiosClient.post(url, data);

      return result.data;
    } catch (error) {
      console.log('error', error);
    }
  }
}

const SettingApi = new SettingService();

export default SettingApi;
