import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TBuilding} from './building.model';

class Building {
  endpoint = '/api/services/app/Building/';
  getAll = async (params: {
    urbanId?: number;
  }): Promise<{
    buildings: TBuilding[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAllBuildingByUser';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});
    return {
      buildings: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const BuildingService = new Building();
export default BuildingService;
