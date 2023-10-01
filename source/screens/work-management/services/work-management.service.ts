import {BaseService} from '@/utils/base.service';
import {TPagingParams} from 'types/type';

class WorkManagementService extends BaseService {
  endpoint = '';
  getAll = async (params: TPagingParams & {status: number}) => {
    return {
      works: [...Array(params.maxResultCount).keys()].map(value => ({
        id: value + (params.skipCount ?? 0),
        label: 'Công việc tháng 9',
        status: params.status,
      })),
      totalRecords: 20,
    };
  };
}

const WorkManagementApi = new WorkManagementService();

export default WorkManagementApi;
