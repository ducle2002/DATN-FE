import {TPagingParams} from 'types/type';

export type TVoteGetParams = TPagingParams & {
  type?: number;
  keyword?: string;
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
  countVote?: number;
  percent?: number;
  isOptionOther?: boolean;
};

export enum EVoteState {
  NEW = 1,
  NEWVOTED = 2,
  FINISH = 3,
  ALL = 4,
  DISABLE = 5,
  UNEXPIRED = 6,
  EXPIRED = 7,
  COMMING = 8,
  IN_PROGRESS = 9,
}

export type TVoteStatus = 'all' | 'expired' | 'inProgress' | 'comming';

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
    state: EVoteState.IN_PROGRESS,
  },
  {
    label: 'comming',
    state: EVoteState.COMMING,
  },
  {
    label: 'expired',
    state: EVoteState.EXPIRED,
  },
];
