export type THotline = {
  tenantId: number;
  name: string;
  properties: string;
  organizationUnitId: number;
  urbanId: number;
  buildingId: number;
  creationTime: string;
  creatorUserId: null | number;
  id: number;
};
export type THotlineProperty = {
  name: string;
  phone: string;
  note?: string;
};
