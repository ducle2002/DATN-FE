import axiosClient from '@/utils/axios.client';
import {BaseService} from '@/utils/base.service';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TDepartment, TPersonnelAccount} from './department.model';

class DepartmentService extends BaseService {
  getAllDepartment = async (
    params: TPagingParams,
  ): Promise<{departments: TDepartment[]; totalRecords: number}> => {
    const url =
      HOST_SERVER + '/api/services/app/OrganizationStructure/GetAllDepartments';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      departments: result.data,
      totalRecords: result.totalRecords,
    };
  };

  getAllPersonnelAccount = async (
    params: TPagingParams & {id: number},
  ): Promise<{accounts: TPersonnelAccount[]; totalRecords: number}> => {
    const url =
      HOST_SERVER + '/api/services/app/OrganizationStructure/GetAllAccount';
    const {data: result} = await axiosClient.get(url, {params: params});

    return {
      accounts: result.data,
      totalRecords: result.totalRecords,
    };
  };
}

const DepartmentServiceApi = new DepartmentService();
export default DepartmentServiceApi;
