export type TFeedback = {
  fullName: string;
  userName: string;
  imageUrl: string;
  countAllComment: number;
  note: string | null;
  fileOfNote: string | null;
  apartmentCode: number | null;
  buildingId: number | null;
  email: string | null;
  address: string | null;
  organizationUnitName: string;
  handlerName: string | null;
  name: string;
  data: string;
  fileUrl: string;
  type: number;
  tenantId: number;
  finishTime: Date | null;
  state: number;
  rating: number | null;
  ratingContent: string | null;
  organizationUnitId: number;
  checkVerify: boolean | null;
  phone: string | null;
  nameFeeder: string | null;
  countUnreadComment: number;
  handleUserId: number | null;
  handleOrganizationUnitId: number | null;
  reflectReport: string | null;
  reportName: string | null;
  lastModificationTime?: string;
  creationTime: string;
  creatorUserId: number;
  id: number;
  urbanName?: string;
  buildingName?: string;
};

export type TFeedbackPage = {
  listFeedback: Array<TFeedback>;
  total: number;
};
export type TMessageFeedback = {
  fullName: string;
  imageUrl: string;
  creatorFeedbackId: number;
  feedbackId: number;
  comment: string;
  readState?: number;
  tenantId: number;
  fileUrl?: string;
  typeComment: number;
  organizationUnitId: number;
  creationTime?: string;
  creatorUserId: number;
  id?: number;
};

export type TMessageFeedbackPage = {
  listMessageFeedback: TMessageFeedback[];
  total: number;
};
export type TOrganizationUnitCitizenReflect = {
  organizationUnitId: number;
  name: string;
  imageUrl?: string;
  type: number;
  description?: string;
  code: string;
};
export type TOrganizationUnitUser = {
  name: string;
  surname: string;
  userName: string;
  fullName: string;
  positionName?: string;
  emailAddress?: string;
  profilePictureId?: string;
  addedTime: string;
  id: number;
};
