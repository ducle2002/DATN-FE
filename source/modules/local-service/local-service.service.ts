import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {EBookingFormId} from './local-service.model';

class LocalService {
  private endpointLocalService = '/api/services/app/LocalService/';
  private endpointBooking = '/api/services/app/AdminTenantBusinessBooking/';

  getAllLocalServiceByOrganizationRequest = async () => {
    const url =
      HOST_SERVER +
      this.endpointLocalService +
      'GetAllLocalServiceByOrganization';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {maxResultCount: 1000}});

    return {
      services: result.data,
    };
  };

  getAllServiceRequest = async (params: TPagingParams & {type?: number}) => {
    const url =
      HOST_SERVER + '/api/services/app/TenantBusinessGridView/GetObjectData';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: {...params, formId: 1}});
    return {services: result.data, totalCount: result.totalRecords};
  };

  getAllItemBookingRequest = async (
    params: TPagingParams & {storeId: number},
  ) => {
    const url = HOST_SERVER + this.endpointBooking + 'GetAllItemBooking';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      booking: result.data,
    };
  };

  getAllBookingRequest = async (
    params: TPagingParams & {storeId: number; formId: EBookingFormId},
  ) => {
    const url = HOST_SERVER + this.endpointBooking + 'GetAllBooking';
    const {
      data: {result},
    } = await axiosClient.get(url, {
      params: {...params},
    });

    return {
      booking: result.data,
      totalCount: result.totalRecords,
    };
  };
}

const LocalServiceApi = new LocalService();
export default LocalServiceApi;
