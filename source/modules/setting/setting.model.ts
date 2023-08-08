export type TChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};
