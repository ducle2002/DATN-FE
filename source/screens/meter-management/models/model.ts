export type TMeterMonthly = {
  tenantId: number;
  apartmentCode: string;
  name: string;
  qrCode: string;
  meterTypeId: number;
  urbanId: number;
  buildingId: number;
  urbanName: string;
  buildingName: string;
  qrAction: string;
  id: number;
  meterId: number;
  period: string;
  value: number;
  creationTime: string;
  creatorUserId: number;
  imageUrl: string;
};

export type TMeterType = {
  tenantId: number;
  name: string;
  description: string;
  creationTime: string;
  creatorUserId: number;
  id: number;
};

export type TMeter = {
  apartmentCode: string;
  buildingId: number;
  buildingName: string;
  id: number;
  meterTypeId: number;
  name: string;
  tenantId: number;
  urbanId: number;
  urbanName: string;
};

export enum ESortBy {
  ASC = 1,
  DESC = 2,
}
