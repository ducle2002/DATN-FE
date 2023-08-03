import axiosClient from '@/utils/axios.client';
import {HOST_SERVER} from '@env';
import {TMessageChatPage, TUserChat} from './chat.model';
class chat {
  endpoint = HOST_SERVER + '/api/services/app/OrganizationUnitChat/';

  getUserChat = async (params: {
    organizationUnitId: number;
  }): Promise<TUserChat[]> => {
    const url = this.endpoint + 'GetOrganizationUnitChatAdmin';
    const {data} = await axiosClient.get(url, {
      params: params,
    });

    return data.result?.friends ?? [];
  };
  getMessChat = async (params: {
    OrganizationUnitId: number;
    UserId: number;
    TenantId: number;
    MinMessageId?: number;
  }): Promise<TMessageChatPage> => {
    const url = this.endpoint + 'GetUserChatMessages';
    const urlMarkRead = this.endpoint + 'MarkAllUnreadMessagesOfUserAsRead';
    const responseMarkRead = await axiosClient.post(urlMarkRead, {
      tenantId: params.TenantId,
      userId: params.UserId,
      senderId: params.OrganizationUnitId,
      isOrganizationUnit: true,
    });
    const {data} = await axiosClient.get(url, {
      params: {
        ...params,
        IsOrganizationUnit: true,
      },
    });

    return {
      listMessage: data.result?.items.reverse() ?? [],
      total: data.result?.totalRecords ?? 0,
    };
  };
}

const ChatApi = new chat();

export default ChatApi;
