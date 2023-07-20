import axios from 'axios';
import QueryString, {parse, stringify} from 'qs';
import {HOST_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const token = JSON.parse(await AsyncStorage.getItem('Token'));
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
  async error => {
    const originalRequest = error.config;
    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      // const {result} = await ImaxServer.refreshTokenRequest();
      // const tokenFromStorage = JSON.parse(
      //   await AsyncStorageLib.getItem('token'),
      // );
      // await AsyncStorageLib.setItem(
      //   'token',
      //   JSON.stringify({
      //     ...tokenFromStorage,
      //     ...result,
      //   }),
      // );
      return axiosClient(originalRequest);
    }
    throw error;
  },
);

export default axiosClient;
