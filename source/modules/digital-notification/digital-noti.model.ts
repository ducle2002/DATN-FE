export type TDigitalNoti = {
  name: string;
  data: string;
  fileUrl: string;
  isAllowComment: boolean;
  id: number;
  organizationUnitId: number;
  creationTime: string;
  countComment: number;
};

export type TDigitalNotiGetParams = {
  type: number;
  skipCount: number;
  maxResultCount: number;
  keyword?: string;
};

export type TCommentNoti = {
  avatar?: string;
  comment: string;
  id: number;
  creatorUserId: number;
  fullName: string;
  creationTime: string;
};

export type TDigitalDeleteParams = {
  id: number;
};
