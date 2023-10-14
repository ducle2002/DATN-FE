export type TWorkLogTime = {
  workId: number;
  workDetailId: number;
  dateStart: string;
  dateFinish?: string;
  status?: number;
  note?: string | null;
  imageUrls?: string[] | any[];
  id?: number;
  workTurnId: number;
  tenantId?: 47;
  workName?: string;
  fullName?: string;
  creationTime?: string;
  creatorUserId?: number;
};

export type TWorkAttachLogTime = {
  note?: string | null;
  imageUrls?: string[] | any[];
};
export type TCreateTurnWork = {
  workId: number;
  description?: string;
};
export type TTurnWork = {
  creationTime: string;
  creatorUserId?: number;
  description: string;
  id?: number;
  tenantId?: number;
  turnNumber: number;
  workId: number;
};
