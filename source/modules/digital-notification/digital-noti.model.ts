export type TDigitalNoti = {
  name: string;
  data: string;
  fileUrl: string;
  isAllowComment: boolean;
  id: number;
  organizationUnitId: number;
  creationTime: string;
};

export type TDigitalNotiParams = {
  type: number;
  skipCount: number;
  maxResultCount: number;
};

export type TDeleteParams = {
  id: number;
};
