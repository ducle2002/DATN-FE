import {
  TInventory,
  TMaterialAsset,
} from '@/screens/material-asset/services/material-asset.model';
import MaterialAssetApi from '@/screens/material-asset/services/material-asset.service';
import MaterialImportExportApi from '@/screens/material-asset/services/material-import-export.service';
import {dataProviderMaker} from '@/utils/recycler-list-view';
import {find, flatten, map, propEq} from 'ramda';
import {useMemo} from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

export const useListMaterialAssets = () => {
  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['list-material'],
    queryFn: ({pageParam}) =>
      MaterialAssetApi.getAll({
        ...pageParam,
        maxResultCount: 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const skipCount = allPages.length * 20;
      return (allPages.length - 1) * 20 + lastPage.materials.length !==
        lastPage.totalRecords
        ? {
            skipCount: skipCount,
            maxResultCount: 20,
          }
        : undefined;
    },
    staleTime: 300000,
  });

  const dataProvider = useMemo(() => {
    return dataProviderMaker(
      data ? flatten(map(page => page.materials, data.pages)) : [],
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
