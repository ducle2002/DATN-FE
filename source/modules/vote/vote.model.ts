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
  options: string;
  voteOptions: Array<TOption>;
};
export type TOption = {
  id: string;
  option: string;
};
