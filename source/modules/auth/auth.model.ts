export interface ILoginPayload {
  userNameOrEmailAddress: string;
  password: string;
  tenancyName?: string;
}

export interface IToken {
  accessToken: string;
  encryptedAccessToken: string;
  refreshToken: string;
  tenantId: number;
}
