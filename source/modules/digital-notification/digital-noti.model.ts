export type TDigitalNoti = {
  name: string;
  data: string;
  fileUrl: string;
  isAllowComment: boolean;
  id: number;
  organizationUnitId: number;
  creationTime: string;
};

export type TDigitalNotiGetParams = {
  type: number;
  skipCount: number;
  maxResultCount: number;
  keyword?: string;
};

export type TDigitalDeleteParams = {
  id: number;
};
