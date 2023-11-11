export type TLocalServiceManagementCategory = {
  code: string;
  creationTime?: string;
  creatorUserId?: number;
  description?: string;
  id: number;
  tenantId?: Number;
  title: string;
};
export type TLocalServiceManagement = {
  urbanText?: string;
  categoryText?: string;
  serviceDetails?: string;
  title: string;
  description?: string;
  code: string;
  urbanId: number;
  category: number;
  image: string;
  imageDescription?: string[];
  address: string;
  coordinates?: string;
  contacts?: string;
  tenantId?: number;
  creationTime?: string;
  creatorUserId?: number;
  id: number;
};
export type TLocalServiceManagementOrder = {
  serviceText: string;
  creatorName: string;
  arrServiceDetails: TServiceDetailOrder[];
  address: string;
  note: string;
  status: number;
  urbanId: number;
  totalAmount: number;
  responseContent?: string;
  ratingScore?: string;
  comments?: string;
  serviceId: number;
  serviceDetails: string;
  tenantId: number;
  creationTime: string;
  creatorUserId?: number;
  id: number;
  creatorCitizen?: {
    address?: string;
    apartmentCode?: string;
    email?: string;
    fullName: string;
    imageUrl?: string;
    phoneNumber?: string;
  };
};
export type TLocalServiceDetail = {
  servicesText?: string;
  title: string;
  description?: string;
  code: string;
  servicesId?: number;
  price: number;
  image: string;
  tenantId?: number;
  creationTime?: string;
  creatorUserId?: number;
  id: number;
};
export type TPagingParams = {
  skipCount?: number;
  maxResultCount?: number;
};
export type TServiceDetailOrder = {
  id: Number;
  code: string;
  title: string;
  servicesId?: number;
  price: number;
  description?: string;
  image: string;
  total: number;
};
export type TCreateServiceOrder = {
  address: string;
  note?: string;
  arrServiceDetails?: TServiceDetailOrder[];
  totalAmount: number;
  serviceId: number;
};
export const enum STATUS_ORDER_LOCAL_SERVICE {
  PENDING = 0,
  ACCEPT = 1,
  PROCESSING = 2,
  EXCHANGE = 3,
  UNPAID = 4,
  CANCEL = 5,
  COMPLETE = 6,
}
