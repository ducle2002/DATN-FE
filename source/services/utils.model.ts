export type TGetAllQuery = {
  keyword?: string;
  skipCount?: number;
  maxResultCount?: number;
} & {
  [key: string]: any;
};
export interface IPaginatedItems<T> {
  items: T[];
  data: T[];
  totalCount: number;
  totalRecords: number;
}
export interface IUrban {
  id: number;
  projectCode: string;
  displayName: string;
  organizationUnitId: number;
  imageUrl?: string;
  isManager: boolean;
  tenantId: number | null;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  area?: number;
  numberBuilding?: number;
  numberCitizen?: number;
}

export interface IBuilding {
  id: number;
  displayName: string;
  code: string;
  parentId?: number;
  tenantId: number;
  projectCode: string;
  type: number;
  imageUrl?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  numberFloor?: number;
  numberCitizen?: number;
  numberApartment?: number;
  area?: number;
  buildingType?: number;
  city?: string;
  district?: string;
  urbanId?: number;
  urbanName?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}
