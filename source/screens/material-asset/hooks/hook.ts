import {
  TAssetDetail,
  TInventory,
} from '@/screens/material-asset/services/material-asset.model';
import MaterialAssetApi from '@/screens/material-asset/services/material-asset.service';
import MaterialImportExportApi from '@/screens/material-asset/services/material-import-export.service';
import {find, propEq} from 'ramda';
import {createContext, useMemo} from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from 'react-query';
import AssetDetailService from '../services/asset-detail.service';
import SystemCodeService from '../services/system-code.service';
import AssetGroupService from '../services/asset-group.service';
import MaintenanceHistoryService from '../services/maintenance-history.service';

export type TAssetFilter = {
  keyword?: string;
  systemCode?: number;
  status?: number;
  form?: number;
  group?: number;
};

export const AssetFilterContext = createContext<{
  filters?: TAssetFilter;
  setFilters: (flt?: TAssetFilter) => void;
}>({
  filters: {
    keyword: '',
    systemCode: undefined,
    status: undefined,
    form: undefined,
    group: undefined,
  },
  setFilters: () => {},
});

export const useListMaterialAssets = ({
  keyword,
  systemCode,
  status,
  form,
  group,
}: TAssetFilter) => {
  const query = useInfiniteQuery({
    queryKey: ['list-material', keyword, systemCode, status, form, group],
    queryFn: ({pageParam}) =>
      AssetDetailService.getAll({
        ...pageParam,
        keyword: keyword,
        maHeThongId: systemCode,
        trangThai: status,
        hinhThuc: form,
        nhomTaiSanId: group,
        maxResultCount: 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 20;
      return (allPages.length - 1) * 20 + lastPage.assets.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 20,
          }
        : undefined;
    },
    staleTime: 0,
  });

  return query;
};

export const useCreateInventory = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const {mutate: createInventory} = useMutation({
    mutationFn: (params: {
      amount: number;
      price: number;
      totalPrice: number;
      status: string | undefined;
      inventoryId: number;
      materialId: number;
    }) => MaterialAssetApi.createInventory(params),
    onSuccess: (_, params) => {
      queryClient
        .refetchQueries(['material-inventory', params.inventoryId])
        .then(() => {
          onSuccessCallback();
        });
    },
  });

  return {createInventory};
};

/**Khong dung nua
  export const useCreateMaterial = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const {mutate: createMaterial} = useMutation({
    mutationFn: (params: TMaterialAsset) => MaterialAssetApi.create(params),
    onSuccess: () => {
      queryClient.refetchQueries(['list-material']).then(() => {
        onSuccessCallback();
      });
    },
    onError: error => {
      console.log(error);
    },
  });
  return {createMaterial};
};
 */

/** Khong dung nua
 *
 *
export const useUpdateMaterial = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const {mutate: updateMaterial} = useMutation({
    mutationFn: (params: TMaterialAsset) => MaterialAssetApi.update(params),
    onSuccess: () => {
      queryClient.refetchQueries(['list-material']).then(() => {
        onSuccessCallback();
      });
    },
    onError: error => {
      console.log(error);
    },
  });
  return {updateMaterial};
};
 */
/**
 * Khong dung nua
export const useDeleteMaterial = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();
  const {mutate: deleteMaterial} = useMutation({
    mutationFn: (id: number) => MaterialAssetApi.delete(id),
    onSuccess: () => {
      queryClient.refetchQueries(['list-material']).then(() => {
        onSuccessCallback();
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  return {deleteMaterial};
};
 */

export const useListImportExport = (type: 'IMPORT' | 'EXPORT') => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['data-import-export', type],
    queryFn: ({pageParam}) =>
      MaterialImportExportApi.getAll({
        isImport: type === 'IMPORT',
        maxResultCount: 20,
        ...pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 20;
      return (allPages.length - 1) * 20 + lastPage.importExportDocs.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 20,
          }
        : undefined;
    },
  });

  return {data, fetchNextPage};
};

export const useAllInventory = () => {
  const {data} = useQuery({
    queryKey: ['all-inventory'],
    queryFn: () => MaterialAssetApi.getAllInventory({maxResultCount: 1000}),
    staleTime: 300000,
  });

  return {allInventory: data?.inventories};
};

export const useInventoryName = (id: number | undefined) => {
  const {allInventory} = useAllInventory();
  const inventory = useMemo(
    () =>
      id ? find<TInventory>(propEq(id, 'id'))(allInventory ?? [])?.name : '',
    [allInventory, id],
  );
  return inventory;
};

export const useAllSystemCode = () => {
  const {data} = useQuery({
    queryKey: ['system-code'],
    queryFn: () => SystemCodeService.getAll({maxResultCount: 1000}),
    staleTime: 180000,
  });
  return data ?? {systemCodes: [], totalRecords: 0};
};

export const useAllAssetGroup = ({systemCode}: {systemCode?: number}) => {
  const {data} = useQuery({
    queryKey: ['asset-group', systemCode],
    queryFn: () =>
      AssetGroupService.getAll({
        MaHeThongId: systemCode,
        maxResultCount: 1000,
      }),
    staleTime: 180000,
  });

  return data ?? {assetGroups: [], totalRecords: 0};
};

export const useAllAssetEnums = () => {
  const result = useQueries([
    {
      queryKey: ['asset-status'],
      queryFn: () =>
        AssetDetailService.getEnums({type: 'TrangThaiTaiSanChiTietEnum'}),
      staleTime: 180000,
    },
    {
      queryKey: ['asset-form'],
      queryFn: () =>
        AssetDetailService.getEnums({type: 'HinhThucTaiSanChiTietEnum'}),
      staleTime: 180000,
    },
  ]);
  return {
    assetStatus: result[0].data?.enums ?? [],
    assetForm: result[1].data?.enums ?? [],
  };
};

export const useCreateAsset = ({
  onSuccessCallback = () => {},
}: {
  onSuccessCallback: () => void;
}) => {
  const queryClient = useQueryClient();
  const {mutate: createAsset} = useMutation({
    mutationFn: (params: TAssetDetail) => AssetDetailService.create(params),
    onSuccess: () => {
      queryClient.refetchQueries(['list-material']).then(() => {
        onSuccessCallback();
      });
    },
    onError: error => {
      console.log(error);
    },
  });
  return {createAsset};
};

export const useUpdateAsset = ({
  onSuccessCallback = () => {},
}: {
  onSuccessCallback: () => void;
}) => {
  const queryClient = useQueryClient();
  const {mutate: updateAsset} = useMutation({
    mutationFn: (params: TAssetDetail) => AssetDetailService.update(params),
    onSuccess: (_, params) => {
      queryClient.refetchQueries(['list-material']).then(() => {
        queryClient.refetchQueries(['asset-detail', params.id]).then(() => {
          onSuccessCallback();
        });
      });
    },
    onError: error => {
      console.log(error);
    },
  });
  return {updateAsset};
};

export const useDeleteAsset = ({
  onSuccessCallback = () => {},
}: {
  onSuccessCallback: () => void;
}) => {
  const queryClient = useQueryClient();
  const {mutate: deleteAsset} = useMutation({
    mutationFn: (id: number) => AssetDetailService.delete(id),
    onSuccess: () => {
      queryClient.refetchQueries(['list-material']).then(() => {
        onSuccessCallback();
      });
    },
    onError: error => {
      console.log(error);
    },
  });

  return {deleteAsset};
};

export const useAssetById = (id?: number) => {
  const {data} = useQuery({
    enabled: !!id && id > 0,
    queryKey: ['asset-detail', id],
    queryFn: () => {
      if (id) {
        return AssetDetailService.getById(id);
      }
    },
    staleTime: 60000,
  });
  return data;
};

export const useMaintenanceHistory = ({assetId}: {assetId: number}) => {
  const query = useInfiniteQuery({
    queryKey: ['asset-history', assetId],
    queryFn: ({pageParam}) =>
      MaintenanceHistoryService.getAll({
        ...pageParam,
        taiSanId: assetId,
        orderBy: 1,
        sortBy: 2,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 20;
      return (allPages.length - 1) * 20 + lastPage.history.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 20,
          }
        : undefined;
    },
    staleTime: 0,
  });

  return query;
};
