export enum EResidentFormId {
  NEW = 7,
  VERIFIED = 2,
  MUST_EDIT = 4,
  CANCELLED = 6,
  ALL = 1,
}

export enum EResidentState {
  NEW = 0,
  VERIFIED = 1,
  MATCHED = 3,
  MISS_MATCHED = 4,
  MUST_EDIT = 5,
  CANCELLED = 6,
}

export type TResident = {
  accountId: number;
  address: string;
  apartmentCode: string;
  apartmentName: string;
  buildingCode: string;
  buildingId: number;
  buildingName: string;
  career: string;
  citizenCode: string;
  citizenTempId: number | null;
  creationTime: string;
  creatorUserId: string;
  dateOfBirth: string;
  deleterUserId: number | null;
  deletionTime: string | null;
  email: string;
  fullName: string;
  gender: string;
  id: number;
  identityNumber: string | null;
  imageUrl: string | null;
  isDeleted: boolean;
  isStayed: boolean;
  isVoter: boolean;
  lastModificationTime: string | null;
  lastModifierUserId: number | null;
  memberNum: number;
  nationality: string;
  organizationUnitId: number;
  otherPhones: null | string;
  phoneNumber: string | null;
  relationShip: number;
  state: EResidentState;
  tenantId: number;
  type: number | null;
  urbanCode: null | string;
  urbanId: number;
};
