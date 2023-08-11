export enum EQAFormID {
  'ADMIN_GETALL' = 1,
  'ADMIN_GETALL_NEW' = 11,
  'ADMIN_GETALL_ACCEPT' = 12,
  'ADMIN_GETALL_DISABLE' = 13,
}

export type TQuestion = {
  threadTitle: string;
  tenantId: number;
  state: number;
  id: number;
  creatorName: string;
  creatorUserId: number;
  content: string;
  creationTime: string;
  creatorAvatar: string;
  isAdminAnswered: boolean;
  commentCount: number;
};

export const QAFormID = [
  {
    label: 'all',
    id: EQAFormID.ADMIN_GETALL,
  },
  {
    label: 'new',
    id: EQAFormID.ADMIN_GETALL_NEW,
  },
  {
    label: 'accept',
    id: EQAFormID.ADMIN_GETALL_ACCEPT,
  },
  {
    label: 'denied',
    id: EQAFormID.ADMIN_GETALL_DISABLE,
  },
];
