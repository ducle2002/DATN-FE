export type TWorkLogTime = {
  workId: number;
  workDetailId: number;
  dateStart: string;
  dateFinish: string;
  userId: number;
  status?: number;
  note?: string | null;
  imageUrls?: string[] | any[];
  id?: number;
};

export type TWorkAttachLogTime = {
  note?: string | null;
  imageUrls?: string[] | any[];
};
export type TCreateTurnWork = {
  workId: number;
  turnNumber: number;
  description?: string;
};
