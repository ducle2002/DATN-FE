export type TWork = {
  content: string;
  creationTime?: string;
  creatorUserId?: number;
  dateExpected: string;
  dateFinish?: null | string;
  dateStart: string;
  id?: number;
  imageUrls: Array<String>;
  note: string;
  status: EWorkStatus;
  title?: string;
  tenantId?: number;
  userId?: number;
  workTypeId?: number;
  listWorkDetail?: TWorkDetail[];
  workHistories?: TWorkHistories[];
  workLogTimes?: any;
  recipientUsers?: TPersonnel[];
  recipientIds?: number[];
  supervisorUsers?: TPersonnel[];
  supervisorIds: number[];
  workCreatorId: number;
};

export type TWorkDetail = {
  creationTime: string;
  creatorUserId: number;
  deleterUserId: number;
  deletionTime: null | string;
  description: string;
  id: number;
  lastModificationTime: null | string;
  lastModifierUserId: null | number;
  name: string;
  tenantId: number;
  workTypeId: number;
};

export type TWorkHistories = {
  assignerId: number;
  imageUrls: string[];
  note: string;
  readTime: string;
  recipientId: number;
  tenantId: number;
  workId: number;
};

export type TWorkType = {
  creationTime: string;
  description: string;
  id: number;
  name: string;
};

export type TPersonnel = {
  id: number;
  fullName: string;
};

export enum EWorkStatus {
  TO_DO = 1,
  DOING = 2,
  OVERDUE = 3,
  COMPLETE = 4,
  CANCELED = 5,
}

export enum ELogTimeStatus {
  DOING = 1,
  DONE_IMPLEMENTER = 2,
  DONE_SUPERVISOR = 3,
  NOT_DONE = 4,
}

export enum EWorkFormID {
  ASSIGNED = 1,
  RECEIVED = 2,
  FOLLOW = 3,
}

export type TWorkComment = {
  content: string;
  creationTime: string;
  creatorUserId: number;
  fullName: string;
  id: number;
  workId: number;
  imageUrls: string[];
  tenantId: number;
};
