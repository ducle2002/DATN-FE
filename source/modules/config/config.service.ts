import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';

class ConfigAPI {
  endpoint = HOST_SERVER;

  getConfigRequest = async () => {
    const url = HOST_SERVER + '/AbpUserConfiguration/GetAll';
    return axiosClient.get(url);
  };
}

const ConfigApi = new ConfigAPI();

export default ConfigApi;
