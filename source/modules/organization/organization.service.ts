import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {
  TOrganizationUnit,
  TOrganizationUnitState,
  TOrganizationUnitUser,
} from './organization.model';
import {TPagingParams} from 'types/type';

class OrganizationService {
  endpoint = '/api/services/app/OrganizationUnit/';

  getOrganizationUnitIdByUser = async (): Promise<TOrganizationUnitState> => {
    const url = HOST_SERVER + this.endpoint + 'GetOrganizationUnitIdByUser';
    const {
      data: {result},
    } = await axiosClient.get(url);
    return {
      listOrganizations: result.items,
      total: result.totalCount,
    };
  };

  getOrganizationUnits = async (
    params: TPagingParams,
  ): Promise<{
    organizationUnits: TOrganizationUnit[];
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetOrganizationUnits';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      organizationUnits: result.items,
    };
  };

  getOrganizationUnitUsers = async (
    params: TPagingParams & {id?: number},
  ): Promise<{
    accounts: TOrganizationUnitUser[];
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetOrganizationUnitUsers';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {
      accounts: result.items,
      totalRecords: result.totalCount,
    };
  };
}

const OrganizationApi = new OrganizationService();

export default OrganizationApi;
