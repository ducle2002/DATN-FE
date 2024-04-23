import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {ILoginPayload, IRegisterPayload, IToken} from './auth.model';
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
      tenantId: data.result.tenantId,
      encryptedAccessToken: data.result.encryptedAccessToken,
    };
  };

  registerRequest = async (params: IRegisterPayload & {tenantId: number}) => {
    const url = this.endpoint + '/api/services/app/Account/Register';
    const userName = params.phoneNumber;
    return axiosClient.post(
      url,
      {...params, userName: userName},
      {
        headers: {
          Cookie: `Abp.TenantId=${params.tenantId}`,
        },
      },
    );
  };

  logout = async () => {
    const url = this.endpoint + '/api/TokenAuth/LogOut';
    return axiosClient.get(url);
  };

  tenantAvailable = async (params: any) => {
    const url = this.endpoint + '/api/services/app/Account/IsTenantAvailable';
    const data = await axiosClient.post(url, params);
    return data.data.result;
  };
}

const AuthenticationApi = new Authentication();

export default AuthenticationApi;
