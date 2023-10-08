export type TDepartment = {
  unitName: null | string;
  userCount: number;
  unitIds: number[];
  tenantId: null | number;
  displayName: string;
  unitId: null | number;
  imageUrl: null | string;
  parentId: null | number;
  description: null | string;
  isDeleted: boolean;
  deleterUserId: null | number;
  deletionTime: null | string;
  lastModificationTime: null | string;
  lastModifierUserId: null | number;
  creationTime: string;
  creatorUserId: null | number;
  id: number;
};

export type TPersonnelAccount = {
  displayName: string;
  userName: string;
  addedTime: string;
  id: number;
};
