export type TDigitalNoti = {
  name: string;
  data: string;
  fileUrl: string;
  isAllowComment: boolean;
  id: number;
  organizationUnitId: number;
};

export type TDigitalNotiParams = {
  type: number;
  skipCount: number;
  maxResultCount: number;
};
