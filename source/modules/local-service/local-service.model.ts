export type TLocalService = {
  id: number;
  name: string;
  state: number;
  type: number;
  countRate: number;
  countNewOrder: number;
  properties: string;
};

export type TServiceProperties = {
  businessInfo?: object;
  ownerInfo: {
    email: string;
    fullName: string;
    identityNumber?: string;
    phoneNumber?: string;
  };
  storeInfo: {
    address?: string;
    description?: string;
    email?: string;
    imageUrl: Array<string>;
    name?: string;
    phoneNumber?: string;
  };
};

export enum EBookingState {
  requesting = 1,
  accepted = 2,
  denied = 3,
  cancel = 4,
  expired = 5,
  complete = 6,
}

export enum EBookingFormId {
  GET_ALL = 1,
  NEW = 2,
  ACCEPTED = 3,
  REFUSE = 4,
  CANCEL = 5,
  EXPIRED = 6,
  COMPLETED = 7,
}

export type TBooking = {
  amount: number;
  bookingCode?: string;
  bookingDay: string;
  bookingTime: string;
  cancelReason?: string;
  creationTime: string;
  creatorUserId: number;
  customerAddress?: string;
  customerComment?: string;
  customerInfo?: {
    fullName?: string;
    creatorUserId?: number;
  };
  customerName: string;
  customerPhoneNumber: string;
  id: number;
  itemBookingId: number;
  itemBookingUrl?: string;
  itemBookingName?: string;
  state: EBookingState;
  storeId: number;
  tenantId: number;
  timeRefuseOrCancel?: string;
  typeBooking?: number | string;
};

export type TBookingStatus =
  | 'all'
  | 'expired'
  | 'requesting'
  | 'accepted'
  | 'cancel'
  | 'complete'
  | 'denied';

export type TBookingFilter = {
  label: TBookingStatus;
  state: EBookingFormId;
};

export const bookingFilter: Array<TBookingFilter> = [
  {
    label: 'all',
    state: EBookingFormId.GET_ALL,
  },
  {
    label: 'accepted',
    state: EBookingFormId.ACCEPTED,
  },
  {
    label: 'requesting',
    state: EBookingFormId.NEW,
  },
  {
    label: 'complete',
    state: EBookingFormId.COMPLETED,
  },
  {
    label: 'denied',
    state: EBookingFormId.REFUSE,
  },
  {
    label: 'cancel',
    state: EBookingFormId.CANCEL,
  },
  {
    label: 'expired',
    state: EBookingFormId.EXPIRED,
  },
];

export type TServiceType = {
  typeBooking: number;
  type: number;
  groupType: number;
  name: string;
  id: number;
  icon: string;
  organizationUnitId: number;
  allowPayment: boolean;
  tenantId: number;
};

export type TServiceFilter = {
  label: string;
  state: number;
};
