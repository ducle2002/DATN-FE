export type TMaterialAsset = {
  amount: number;
  buildingId: number | null;
  creationTime: string;
  description: string;
  expiredDate: string | null;
  fileUrl: string | null;
  groupId: number | null;
  groupName: string;
  id: number | null;
  materialCode: string;
  materialName: string;
  price: number;
  producerId: number | null;
  producerName: string;
  organizationUnitId: number | null;
  status: string;
  tenantId: number | null;
  totalPrice: number;
  typeId: number | null;
  typeName: string;
  unitId: number | null;
  unitName: string;
  usedDate: string | null;
  wearRate: number;
  serialNumber: number | string;
  imageUrl: string | undefined;
};

export const materialDefault = {
  amount: 0,
  description: '',
  fileUrl: '',
  groupId: null,
  materialCode: '',
  materialName: '',
  price: 0,
  producerId: null,
  status: '',
  totalPrice: 0,
  typeId: null,
  typeName: '',
  unitId: null,
  wearRate: 0,
  serialNumber: '',
};

export type TAssetFilter = {
  buildingId: number | null;
  code: string;
  description: string | null;
  id: number;
  imageUrl: string | null;
  isDelete: boolean;
  name: string;
  parentId: number | null;
  tenantId: number;
  type: number;
  urbanId: number | null;
};

export type TInventory = {
  code: string;
  countAmount: number;
  countMaterial: number;
  id: number;
  materials: Array<TMaterialAsset>;
  name: string;
};

export type TImportExportMaterial = {
  amount: number;
  code: string;
  materialName: string;
  materialId: number;
  materialCode: string;
  unitName: string;
  price: number;
  id: number;
};

export enum ECategoryType {
  GROUP = 1,
  INVENTORY = 2,
  PRODUCER = 3,
  TYPE = 4,
  UNIT = 5,
}

export type TImportExportDocs = {
  id: string;
  importExportDate: string;
  isApproved: boolean;
  isImport: boolean;
  tenantId: number;
  totalAmount: number;
  materialId: number;
  fromInventoryId: number;
  toInventoryId: number;
  key: string;
  description: string;
  code: string;
  countMaterial: number;
  creationTime: string;
  allPrice: number;
  materialViews: Array<TImportExportMaterial>;
};
