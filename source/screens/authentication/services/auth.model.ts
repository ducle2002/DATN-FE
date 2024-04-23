export interface ILoginPayload {
  userNameOrEmailAddress: string;
  password: string;
  tenancyName: string;
}

export interface IRegisterPayload {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  fullName: string;
  tenancyName: string;
}

export interface IToken {
  accessToken: string;
  encryptedAccessToken: string;
  refreshToken: string;
  tenantId: number;
}
