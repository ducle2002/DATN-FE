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

export enum EVoteState {
  NEW = 1,
  NEWVOTED = 2,
  FINISH = 3,
  ALL = 4,
  DISABLE = 5,
  UNEXPIRED = 6,
  EXPIRED = 7,
}

export type TVoteStatus = 'all' | 'expired' | 'inProgress';

export type TVoteFilter = {
  state: EVoteState;
  label: TVoteStatus;
};

export const votesFilter: Array<TVoteFilter> = [
  {
    label: 'all',
    state: EVoteState.ALL,
  },
  {
    label: 'inProgress',
    state: EVoteState.UNEXPIRED,
  },
  {
    label: 'expired',
    state: EVoteState.EXPIRED,
  },
];
