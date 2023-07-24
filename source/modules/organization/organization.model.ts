export type TOrganizationUnit = {
  displayName: string;
  imageUrl?: string | null;
  isManager: boolean;
  organizationUnitId: number;
  parentId: number;
  tenantCode?: string;
  type: number;
  types: Array<number>;
};

export type TOrganizationUnitState = {
  listOrganizations: Array<TOrganizationUnit>;
  total: number;
};
