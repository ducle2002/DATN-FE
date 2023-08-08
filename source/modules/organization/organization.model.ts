export type TOrganizationUnit = {
  displayName: string;
  imageUrl?: string | null;
  isManager: boolean;
  organizationUnitId: number;
  parentId: number;
  tenantCode?: string;
  type: TOrganizationUnitType;
  types: Array<TOrganizationUnitType>;
};

export type TOrganizationUnitState = {
  listOrganizations: Array<TOrganizationUnit>;
  total: number;
};

export enum TOrganizationUnitType {
  'Chat' = 3,
  'Reflect' = 4,
  'Vote' = 5,
  'Notification' = 6,
  'Administrative' = 7,
  'Bill' = 8,
  'Q&A' = 9,
  'Newfeed' = 10,
  'Hotline' = 11,
  'Bộ phận quản lý tài sản' = 12,
  'LocalService' = 13,
}
