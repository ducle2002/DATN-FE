import axiosClient from '@/utils/axios.client';

class Notification {
  endpoint = '/notification/api/services/app/Notification/';
  getAll = async (
    params?: any,
  ): Promise<{
    notifications: TNotification[];
    unreadCount: number;
    totalRecords: number;
  }> => {
    const url = this.endpoint + 'GetUserNotifications';
    const {data: result} = await axiosClient.get(url, {
      params: {...params, appType: 3},
    });
    return {
      notifications: result.data,
      unreadCount: result.unreadCount,
      totalRecords: result.totalCount,
    };
  };

  readNotification = async (params: {id: string}) => {
    const url = this.endpoint + 'SetNotificationAsRead';
    return axiosClient.post(url, params);
  };
}

const NotificationService = new Notification();
export default NotificationService;

export type TNotification = {
  id: string;
  notification: {
    creationTime: string;
    data: {
      action: string;
      description: string;
      detailId: number;
      detailUrlApp: string;
      detailUrlWA: string;
      icon: string;
      imageUrl: string;
      message: string;
      properties: {
        Description: string;
        DetailId: number;
        DetailUrlApp: string;
        DetailUrlWA: string;
        Icon: string;
        ImageUrl: string;
        Message: string;
        TypeAction: number;
      };
      type: string;
      typeAction: number;
    };
    entityId: null | number;
    entityType: null | string;
    entityTypeName: null | string;
    id: string;
    notificationName: string;
    severity: number;
    tenantId: number;
  };
  state: number;
  tenantId: number;
  userId: number;
};
