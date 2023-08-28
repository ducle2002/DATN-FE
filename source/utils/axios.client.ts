import axios, {AxiosError} from 'axios';
import QueryString, {parse, stringify} from 'qs';
import {HOST_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IToken} from '@/modules/auth/auth.model';
import store from '@/store';
import {refreshConfig} from '@/modules/config/config.slice';
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

let isRefreshing = false;
let failedQueue: Array<any> = [];

const processQueue = (error: any) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    throw response;
  },
  async (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      var originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !error.config?.url?.includes('RefreshToken')
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({resolve, reject});
          })
            .then(() => {
              if (originalRequest) {
                return axiosClient(originalRequest);
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;

        const tokenFromStorage = await AsyncStorage.getItem('Token');
        const token: IToken = tokenFromStorage
          ? JSON.parse(tokenFromStorage)
          : undefined;

        return new Promise((resolve, reject) => {
          axiosClient
            .post('/api/TokenAuth/RefreshToken', null, {
              params: {refreshToken: token?.refreshToken},
            })
            .then(({data: {result}}) => {
              AsyncStorage.setItem(
                'Token',
                JSON.stringify({
                  ...token,
                  ...result,
                }),
              ).then(() => {
                processQueue(null);
                if (originalRequest) {
                  resolve(axiosClient(originalRequest));
                }
                store.dispatch(refreshConfig());
              });
            })
            .catch(err => {
              processQueue(err);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
      throw error;
    } else {
      throw error;
    }
  },
);

export default axiosClient;
