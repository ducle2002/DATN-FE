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
