export type TVoteGetParams = {
  type?: number;
  skipCount: number;
  maxResultCount: number;
};

export type TVote = {
  name: string;
  description?: string;
  fileUrl: string;
  isAllowComment: boolean;
  id: number;
  organizationUnitId: number;
  creationTime: string;
  startTime: string;
  finishTime: string;
};
export type TOption = {
  id: string;
  option: string;
};
