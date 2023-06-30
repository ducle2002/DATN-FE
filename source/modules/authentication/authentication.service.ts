import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {ILoginPayload, IToken} from './authentication.model';
class Authentication {
  endpoint = HOST_SERVER;

  loginRequest = async ({
    userNameOrEmailAddress,
    password,
    tenancyName,
  }: ILoginPayload): Promise<IToken> => {
    const url = this.endpoint + '/api/TokenAuth/Authenticate';
    const {data} = await axiosClient.post(url, {
      userNameOrEmailAddress,
      password,
      tenancyName,
    });

    return {
      accessToken: data.result.accessToken,
      refreshToken: data.result.refreshToken,
    };
  };

  registerRequest = async (params: {
    userName: string;
    password: string;
    emailAddress?: string;
    fullName?: string;
  }) => {
    const url = this.endpoint + '/api/services/app/Account/Register';
    return axiosClient.post(url, params);
  };

  logout = async () => {
    const url = this.endpoint + '/api/TokenAuth/LogOut';
    return axiosClient.get(url);
  };
}

const AuthenticationApi = new Authentication();

export default AuthenticationApi;
