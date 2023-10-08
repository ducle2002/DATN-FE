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

export type TOrganizationUnitUser = {
  name: string;
  surname: string;
  userName: string;
  fullName: string;
  positionName: null | string;
  emailAddress: string;
  profilePictureId: null | string;
  addedTime: string;
  id: number;
};

export type TOrganizationUnit = {
  children: TOrganizationUnit[];
  parentId: number;
  organizationUnitId: number;
  code: string;
  displayName: string;
  memberCount: number;
  roleCount: number;
  departmentCount: number;
  unitChargeCount: number;
  description: null | string;
  projectCode: null | string;
  imageUrl: null | string;
  type: TOrganizationUnitType;
  tenantId: number;
  isManager: boolean;
  groupId: null | number;
  types: null | TOrganizationUnitType[];
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  creationTime: string;
  creatorUserId: number;
  id: number;
};
