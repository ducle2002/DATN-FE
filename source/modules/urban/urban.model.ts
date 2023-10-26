export type TUrban = {
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
};
