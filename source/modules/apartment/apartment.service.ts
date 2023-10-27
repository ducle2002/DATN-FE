import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TApartment} from './apartment.model';

class Apartment {
  endpoint = '/api/services/app/AdminApartment/';
  getAllApartment = async (
    params: TPagingParams & {
      buildingId?: number;
      urbanId?: number;
    },
  ): Promise<{
    apartments: TApartment[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllApartment';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      apartments: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const ApartmentService = new Apartment();
export default ApartmentService;
