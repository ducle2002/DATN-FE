export interface ILoginPayload {
  userNameOrEmailAddress: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
