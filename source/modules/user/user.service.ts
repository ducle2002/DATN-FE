import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {IUser} from './user.model';

class UserService {
  enpoint = '/api/services/app/UserDefault/';
  getDetailRequest = async (): Promise<IUser> => {
    const url = HOST_SERVER + this.enpoint + 'GetDetail';
    const {data} = await axiosClient.get(url);
    return {
      fullName: data.result.fullName,
      userName: data.result.fullName,
      imageUrl: data.result.imageUrl,
      userId: data.result.id,
    };
  };
}

const UserApi = new UserService();
export default UserApi;
