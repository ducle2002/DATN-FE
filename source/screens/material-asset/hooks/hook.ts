import {
  TAssetDetail,
  TInventory,
  assetDetailDefault,
} from '@/screens/material-asset/services/material-asset.model';
import MaterialAssetApi from '@/screens/material-asset/services/material-asset.service';
import MaterialImportExportApi from '@/screens/material-asset/services/material-import-export.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {find, flatten, map, propEq} from 'ramda';
import {useMemo} from 'react';
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

export const useListMaterialAssets = () => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['list-material'],
    queryFn: ({pageParam}) =>
      AssetDetailService.getAll({
        ...pageParam,
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

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.assets, data.pages)) : [],
    );
  }, [data]);

  return {
    data: data,
    fetchNextPage: fetchNextPage,
    dataProvider: dataProvider,
  };
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

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.importExportDocs, data.pages)) : [],
    );
  }, [data]);

  return {data, fetchNextPage, dataProvider};
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
  });

  return data ?? {assetGroups: [], totalRecords: 0};
};

export const useAllAssetEnums = () => {
  const result = useQueries([
    {
      queryKey: ['asset-status'],
      queryFn: () =>
        AssetDetailService.getEnums({type: 'TrangThaiTaiSanChiTietEnum'}),
    },
    {
      queryKey: ['asset-form'],
      queryFn: () =>
        AssetDetailService.getEnums({type: 'HinhThucTaiSanChiTietEnum'}),
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
    onSuccess: () => {
      queryClient.refetchQueries(['list-material']).then(() => {
        onSuccessCallback();
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
  });
  return id !== -1 ? data : assetDetailDefault;
};
