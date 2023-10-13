export type TAdminidtrativeConfig = {
  properties?: TItemProperties[];
  organizationUnitName?: string;
  tenantId?: number;
  name: string;
  detail?: string;
  imageUrl?: string;
  fileUrl?: string;
  organizationUnitId: number;
  surcharge?: string;
  price?: number;
  priceDetail?: string;
  id: number;
};
export type TAdministrativeOrder = {
  adTypeId: number;
  apartmentCode?: string;
  buildingId: number;
  creationTime: string;
  creatorUserId: number;
  id: number;
  name: string;
  organizationUnitId?: number;
  properties: string;
  state: number;
  tenantId: number;
  userBillId?: number;
  creatorUserAvatar: string;
  creatorUserName: string;
};
export type TItemProperties = {
  id: number;
  value?: any;
  key: string;
  typeId: number;
  type: number;
  displayName: string;
  configId: string;
  parentId?: any;
  tenantId?: number;
  isTableColumn?: boolean;
  tableColumn?: any;
  optionValues?: any;
};
export type TAdministrativeOrderPage = {
  listData: TAdministrativeOrder[];
  total: number;
};
