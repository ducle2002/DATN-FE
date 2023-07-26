export type TDigitalNoti = {
  name: string;
  data: string;
  fileUrl: string;
  isAllowComment: boolean;
};

export type TDigitalNotiParams = {
  type: number;
  skipCount: number;
  maxResultCount: number;
};
