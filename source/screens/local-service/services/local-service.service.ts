import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {EBookingFormId, TBookingItem} from './local-service.model';

export type TUpdateStateParams = {
  bookingId: number;
  state: number;
  refuseReason?: string;
};

export type TGetTimeBookedParams = {
  itemBookingId: number;
  bookingDay: string;
};

export type TGetItemBookingParams = {
  id?: number;
  storeId?: number;
} & TPagingParams;

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
    } = await axiosClient.get(url, {
      params: {...params, formId: 51, formCase: 1},
    });
    return {services: result.data, totalCount: result.totalRecords};
  };

  getAllItemBookingRequest = async (
    params: TPagingParams & {storeId: number},
  ): Promise<Array<TBookingItem>> => {
    const url = HOST_SERVER + this.endpointBooking + 'GetAllItemBooking';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return result.data;
  };

  getAllBookingRequest = async (
    params: TPagingParams & {
      storeId: number;
      formId: EBookingFormId;
      itemBookingId?: number;
    },
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

  updateStateBookingRequest = async (params: TUpdateStateParams) => {
    const url = HOST_SERVER + this.endpointBooking + 'UpdateStateBooking';
    return axiosClient.put(url, params);
  };

  getAllTimeBookedByItemRequest = async (params: TGetTimeBookedParams) => {
    const url = HOST_SERVER + this.endpointBooking + 'GetAllTimeBookedByItem';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return result.data;
  };

  getItemBookingByIdRequest = async (
    params: TGetItemBookingParams,
  ): Promise<TBookingItem | null> => {
    const url = HOST_SERVER + this.endpointBooking + 'GetItemBookingById';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    if (result.data) {
      return {...result.data, openTimes: JSON.parse(result.data.openTimes)};
    }
    return null;
  };
}

const LocalServiceApi = new LocalService();
export default LocalServiceApi;
