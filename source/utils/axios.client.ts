import axios, {AxiosError} from 'axios';
import QueryString, {parse, stringify} from 'qs';
import {HOST_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IToken} from '@/modules/auth/auth.model';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
  baseURL: HOST_SERVER,
});

axiosClient.interceptors.request.use(async config => {
  const tokenFromStorage = await AsyncStorage.getItem('Token');
  const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : undefined;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token.accessToken;
  }
  config.paramsSerializer = params => QueryString.stringify(params);
  return config;
});

axiosClient.interceptors.request.use(request => {
  return request;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    throw response;
  },
  async (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !error.config?.url?.includes('RefreshToken')
      ) {
        const tokenFromStorage = await AsyncStorage.getItem('Token');
        const token: IToken = tokenFromStorage
          ? JSON.parse(tokenFromStorage)
          : undefined;

        const {
          data: {result},
        } = await axiosClient.post('/api/TokenAuth/RefreshToken', null, {
          params: {refreshToken: token?.refreshToken},
        });
        await AsyncStorage.setItem(
          'Token',
          JSON.stringify({
            ...token,
            ...result,
          }),
        );
        if (originalRequest) {
          return axiosClient(originalRequest);
        } else {
          throw error;
        }
      }
      throw error;
    } else {
      throw error;
    }
  },
);

export default axiosClient;
