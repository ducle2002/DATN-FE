import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TPagingParams} from 'types/type';
import {TImportExportDocs} from './material-asset.model';

class MaterialImportExportService {
  endpoint = '/api/services/app/MaterialImportExportManagement/';

  getAll = async (
    params: TPagingParams & {isImport: boolean; isApproved?: boolean},
  ): Promise<{
    importExportDocs: Array<TImportExportDocs>;
    totalRecords: number;
  }> => {
    const url = HOST_SERVER + this.endpoint + 'GetAll';
    const {
      data: {result},
    } = await axiosClient.get(url, {params: params});

    return {importExportDocs: result.data, totalRecords: result.totalRecords};
  };
}

const MaterialImportExportApi = new MaterialImportExportService();

export default MaterialImportExportApi;
