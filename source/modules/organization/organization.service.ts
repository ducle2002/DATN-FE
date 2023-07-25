import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TOrganizationUnitState} from './organization.model';

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
}

const OrganizationApi = new OrganizationService();

export default OrganizationApi;
