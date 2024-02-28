import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TCommentNoti,
  TDigitalDeleteParams,
  TDigitalNotiGetParams,
} from './digital-noti.model';

class Notification {
  endpoint = '/api/services/app/CityAdminNotification/';

  createOrUpdateRequest = async (params: any, config: any) => {
    const url = HOST_SERVER + this.endpoint + 'CreateOrUpdateNotification';
    return axiosClient.post(url, params, config);
  };

  getRequest = async (params: TDigitalNotiGetParams) => {
    const url = HOST_SERVER + this.endpoint + 'GetAllNotificationUserTenant';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: {...params, keyword: params.keyword?.toLocaleLowerCase()},
    });
    return {
      totalCount: result.totalRecords,
      data: result.data,
    };
  };

  deleteRequest = async (params: TDigitalDeleteParams) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteNotification';
    return axiosClient.delete(url, {params: params});
  };

  deleteMultipleRequest = async (params: Array<Number>) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteMultipleNotification';
    return axiosClient.delete(url, {data: params});
  };

  getCommentRequest = async (
    id: number,
  ): Promise<{comments: Array<TCommentNoti>; totalCount: number}> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllComment';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: {notifiactionId: id},
    });

    return {
      totalCount: result.totalRecords
        ? result.totalRecords
        : result.data.length,
      comments: result.data,
    };
  };

  deleteMultipleCommentsRequest = async (params: Array<number>) => {
    const url = HOST_SERVER + this.endpoint + 'DeleteMultipleComments';
    return axiosClient.delete(url, {data: params});
  };
}

const DigitalNotiApi = new Notification();

export default DigitalNotiApi;
